import { NextResponse, type NextRequest } from "next/server";
import {
  checkEntitlement,
  createAdminClient,
  grantProgramAccess,
  hasProgramAccess,
  revokeProgramAccess,
} from "@/lib/supabase/admin";
import { createSessionClient } from "@/lib/supabase/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

// ---------------------------------------------------------------------------
// Sign in. No code, ever again — that was spent when the account was made.
//
// Login is also the one moment where the table is consulted rather than the
// session claim, which buys two things the middleware cannot do on its own:
//
//   Revocation actually bites. Nikita unticking `active` on a code stops that
//   athlete's next sign-in instead of waiting for a token to lapse.
//
//   A half-activated account repairs itself. If the claim failed to stamp
//   during redemption, the code is spent and the row points at this account —
//   so grant it here rather than leaving a buyer locked out of what they paid
//   for, which is the kind of failure that turns into a refund.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: { email?: unknown; password?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!email || !password) return fail("invalid_credentials", 401);

  const session = createSessionClient(request);
  const admin = createAdminClient();
  if (!session || !admin) return fail("not_configured", 503);

  const { data, error } = await session.supabase.auth.signInWithPassword({
    email,
    password,
  });

  // A wrong password and an unknown email answer identically, so the form
  // cannot be used to find out who bought the program.
  if (error || !data?.user) return fail("invalid_credentials", 401);

  const user = data.user;
  const entitlement = await checkEntitlement(admin, user.id);

  if (entitlement.state === "granted") {
    if (!hasProgramAccess(user)) {
      await grantProgramAccess(admin, user.id, entitlement.code);
      // The session just issued predates the claim, so refresh it — otherwise
      // the middleware reads the old token and bounces them straight back.
      await session.supabase.auth.refreshSession();
    }
    return session.commit(NextResponse.json({ success: true }));
  }

  if (entitlement.state === "unknown") {
    // The table could not be read. If the account already carries the claim, a
    // database hiccup is not a reason to lock a paying athlete out.
    if (hasProgramAccess(user)) {
      return session.commit(NextResponse.json({ success: true }));
    }
    await session.supabase.auth.signOut();
    return fail("lookup_failed", 502);
  }

  // Revoked, or an account that never redeemed anything. Either way it does not
  // keep a session: sign it straight back out so no half-open state is left.
  if (entitlement.state === "revoked") {
    await revokeProgramAccess(admin, user.id);
  }
  await session.supabase.auth.signOut();

  return session.commit(
    fail(entitlement.state === "revoked" ? "access_revoked" : "no_access", 403),
  );
}
