import { NextResponse, type NextRequest } from "next/server";
import { createSessionClient } from "@/lib/supabase/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Kept in step with the redeem route, so one form cannot accept what the other rejects. */
export const MIN_PASSWORD_LENGTH = 8;

// ---------------------------------------------------------------------------
// Set a new password.
//
// Reachable only with a session, which for this flow means the one minted by
// /auth/callback from the emailed recovery link. That is what proves the person
// setting the password owns the mailbox. Without the session check, this route
// would let anybody rewrite anybody's password just by naming them.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: { password?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const password = typeof body.password === "string" ? body.password : "";

  const session = createSessionClient(request);
  if (!session) {
    return NextResponse.json(
      { success: false, error: "not_configured" },
      { status: 503 },
    );
  }

  const {
    data: { user },
  } = await session.supabase.auth.getUser();

  if (!user) {
    return session.commit(
      NextResponse.json({ success: false, error: "no_session" }, { status: 401 }),
    );
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return session.commit(
      NextResponse.json(
        { success: false, error: "weak_password" },
        { status: 400 },
      ),
    );
  }

  const { error } = await session.supabase.auth.updateUser({ password });

  if (error) {
    return session.commit(
      NextResponse.json(
        { success: false, error: "update_failed" },
        { status: 502 },
      ),
    );
  }

  return session.commit(NextResponse.json({ success: true }));
}
