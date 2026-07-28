import { NextResponse, type NextRequest } from "next/server";
import { createSessionClient } from "@/lib/supabase/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Who is signed in. Used by the account panel to show the athlete their own
// email, so "which address did I sign up with" never becomes a support message.
//
// getUser(), not getSession(): getSession only decodes the cookie it is handed,
// which is fine for display but is not verification. getUser checks the token
// with Supabase, so nothing here is ever reported from an unverified cookie.
export async function GET(request: NextRequest) {
  const session = createSessionClient(request);

  if (!session) {
    return NextResponse.json(
      { signedIn: false, email: null },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  const {
    data: { user },
  } = await session.supabase.auth.getUser();

  return session.commit(
    NextResponse.json({
      signedIn: Boolean(user),
      email: user?.email ?? null,
    }),
  );
}
