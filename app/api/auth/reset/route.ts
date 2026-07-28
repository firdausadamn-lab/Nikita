import { NextResponse, type NextRequest } from "next/server";
import { siteOrigin } from "@/lib/supabase/config";
import { createSessionClient } from "@/lib/supabase/session";
import { RESET_PATH } from "@/lib/program-access";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ---------------------------------------------------------------------------
// Send the password-reset email.
//
// This always answers "sent", whatever happened. Reporting "no such account"
// would turn the form into a membership check: type an address, learn whether
// that person bought the program. A buyer who genuinely mistyped their email
// finds out because no email arrives, which is the same conclusion they would
// have reached from an explicit error.
//
// The link comes back to /auth/callback, which turns it into a session and
// forwards to the reset page in the language they asked from.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: { email?: unknown; locale?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const locale = body.locale === "en" ? "en" : "ru";

  const session = createSessionClient(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "not_configured" },
      { status: 503 },
    );
  }

  if (email) {
    const origin = siteOrigin(request);
    const next = encodeURIComponent(`/${locale}${RESET_PATH}`);

    await session.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${origin}/auth/callback?next=${next}`,
    });
  }

  // Committed rather than returned bare: resetPasswordForEmail stores a PKCE
  // verifier in a cookie, and the link in the email cannot be exchanged
  // without it.
  return session.commit(NextResponse.json({ success: true }));
}
