import { NextResponse, type NextRequest } from "next/server";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createSessionClient } from "@/lib/supabase/session";
import { ACCESS_PATH, RESET_PATH, safeReturnPath } from "@/lib/program-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Where the password-reset email lands.
//
// Two shapes arrive here, and both are handled, because which one you get
// depends on an email template that lives in the Supabase dashboard rather than
// in this repository:
//
//   ?code=…                       the default template, PKCE
//   ?token_hash=…&type=recovery   a customised template using {{ .TokenHash }}
//
// Supporting only one of them would mean the reset flow silently breaks the day
// somebody edits the template to translate it into Russian — which is exactly
// what the README asks Adam to do.
//
// This route sits outside [locale] on purpose: the language is carried in
// ?next= so the athlete comes back to the side of the site they left from.
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;

  const locale = url.searchParams.get("next")?.startsWith("/en") ? "en" : "ru";
  const next = safeReturnPath(
    url.searchParams.get("next"),
    locale,
    // The reset page is an auth path, and safeReturnPath refuses those by
    // default so a login cannot bounce back into itself. Here it is the
    // intended destination, so allow it explicitly.
    [RESET_PATH],
  );

  const session = createSessionClient(request);

  const expired = () => {
    const target = new URL(`/${locale}${ACCESS_PATH}`, url.origin);
    target.searchParams.set("error", "link_expired");
    return NextResponse.redirect(target, 303);
  };

  if (!session || (!code && !tokenHash)) return expired();

  const { error } = code
    ? await session.supabase.auth.exchangeCodeForSession(code)
    : await session.supabase.auth.verifyOtp({
        token_hash: tokenHash as string,
        type: type ?? "recovery",
      });

  // A link that has already been used, has timed out, or was opened in a
  // different browser from the one that asked for it all land here. The access
  // page explains the last case, which is the one people hit and cannot guess.
  if (error) return session.commit(expired());

  return session.commit(NextResponse.redirect(new URL(next, url.origin), 303));
}
