import type { User } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// The entitlement claim, on its own.
//
// This is split out from lib/supabase/admin.ts for one reason: the middleware
// needs to read the claim, and admin.ts reads SUPABASE_SERVICE_ROLE_KEY. Next
// substitutes env reads at build time, so importing admin.ts from the
// middleware would bake that key into the middleware bundle. It would still be
// server-side, but a secret should not travel anywhere it has no business
// being — and "the middleware never imports admin" is a far easier rule to
// keep than a case-by-case judgement.
//
// A Supabase session proves somebody signed in. It does not prove they bought
// anything. That is what this claim is for: it lives in `app_metadata`, which
// only the service role can write, so a signed-in user cannot grant it to
// themselves the way they could with `user_metadata`.
// ---------------------------------------------------------------------------

export const PROGRAM_ACCESS_CLAIM = "program_access";

export function hasProgramAccess(user: Pick<User, "app_metadata"> | null) {
  return user?.app_metadata?.[PROGRAM_ACCESS_CLAIM] === true;
}
