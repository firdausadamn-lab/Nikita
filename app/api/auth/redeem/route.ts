import { NextResponse, type NextRequest } from "next/server";
import {
  checkEntitlement,
  createAdminClient,
  grantProgramAccess,
} from "@/lib/supabase/admin";
import { createSessionClient } from "@/lib/supabase/session";

// Node runtime, never edge: this handler holds the service role key and it must
// not be bundled anywhere the browser can reach.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MIN_PASSWORD_LENGTH = 8;

function fail(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

// ---------------------------------------------------------------------------
// Redeem a code and create the account behind it.
//
// The ordering here is the whole design. Read it before changing any of it.
//
//   1. Reject a bad code before creating anything. Advisory only, but it means
//      a typo never leaves a stray account behind.
//   2. Create the account WITHOUT the access claim. If everything after this
//      falls over, what is left is an account that cannot open anything.
//   3. Claim the code atomically. One UPDATE ... WHERE redeemed = false. This
//      is the step that guarantees one code becomes one account, even when two
//      people submit the same code in the same instant. See
//      supabase/migrations/0002_accounts.sql.
//   4. Lost the race, or the code turned out to be spent? Delete the account
//      just made. Even if that delete fails, step 2 means the leftover cannot
//      reach the program.
//   5. Won the race? Only now stamp the access claim.
//   6. Sign in, so the buyer lands inside the program rather than at a login
//      form asking for the password they typed ten seconds ago.
//
// The tempting shortcut is to claim the code first and create the account
// after — it reads better. It cannot be done: `redeemed_by` references
// auth.users(id), so there is no user id to claim it with yet. Hence
// create-then-claim-then-clean-up, with access never granted until the atomic
// step has actually succeeded.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: { code?: unknown; email?: unknown; password?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const code =
    typeof body.code === "string" ? body.code.trim().toUpperCase() : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (!code) return fail("no_code", 400);
  if (!EMAIL.test(email)) return fail("invalid_email", 400);
  if (password.length < MIN_PASSWORD_LENGTH) return fail("weak_password", 400);

  const admin = createAdminClient();
  const session = createSessionClient(request);
  if (!admin || !session) return fail("not_configured", 503);

  // --- 1. Fail fast on a code that was never going to work -----------------
  const { data: claimable, error: lookupError } = await admin.rpc(
    "access_code_is_claimable",
    { p_code: code },
  );

  if (lookupError) return fail("lookup_failed", 502);
  // A missing code, a revoked code, and a spent code all answer the same way,
  // so probing the form cannot map out which codes exist.
  if (claimable !== true) return fail("invalid_code", 401);

  // --- 2. Create the account, deliberately without access -------------------
  const { data: created, error: createError } =
    await admin.auth.admin.createUser({
      email,
      password,
      // No confirmation email. Holding a valid code already proved they bought
      // the program, and a confirmation step is one more thing that can land
      // silently in spam and turn into a support message.
      email_confirm: true,
    });

  if (createError || !created?.user) {
    const message = createError?.message?.toLowerCase() ?? "";
    if (
      message.includes("already") ||
      message.includes("registered") ||
      message.includes("exists")
    ) {
      // The code is untouched — claiming happens after this point — so they can
      // still redeem it once they sort out which email they meant to use.
      return fail("email_taken", 409);
    }
    return fail("signup_failed", 502);
  }

  const userId = created.user.id;

  // --- 3. Claim the code. Atomic. The one step that matters. ----------------
  const { data: claimed, error: redeemError } = await admin.rpc(
    "redeem_code_and_link",
    { p_user_id: userId, p_code: code },
  );

  const row = (Array.isArray(claimed) ? claimed[0] : claimed) as
    | { code?: string }
    | null
    | undefined;

  if (redeemError || !row?.code) {
    // --- 4. Did not get it. Take the account back out. ---------------------
    await admin.auth.admin.deleteUser(userId).catch(() => undefined);
    return redeemError ? fail("lookup_failed", 502) : fail("code_taken", 409);
  }

  // --- 5. Won it. Now the account may open the program. ---------------------
  const granted = await grantProgramAccess(admin, userId, row.code);

  if (!granted) {
    // The code is spent and the account exists, so rolling back here would be
    // worse than reporting it: it would burn the buyer's code for nothing.
    // Confirm the row really is theirs; if it is, let them through — their next
    // login repairs the claim by itself (see checkEntitlement).
    const entitlement = await checkEntitlement(admin, userId);
    if (entitlement.state !== "granted") return fail("activation_failed", 500);
  }

  // --- 6. Sign in, so they land in the program, not at a login form ---------
  const { error: signInError } = await session.supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInError) {
    // Rare: the account and the code are both fine, only the session failed.
    // Say so honestly and send them to the login tab rather than pretending.
    return session.commit(NextResponse.json({ success: true, signedIn: false }));
  }

  return session.commit(NextResponse.json({ success: true, signedIn: true }));
}
