import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { PROGRAM_ACCESS_CLAIM } from "./entitlement";

// ---------------------------------------------------------------------------
// The service-role client. Node runtime only.
//
// This key bypasses row level security entirely, so it must never reach the
// browser. Import this module ONLY from route handlers that declare
// `export const runtime = "nodejs"`. Never from a component, never from the
// middleware, never from lib/supabase/config.ts.
// ---------------------------------------------------------------------------

type NetlifyRuntime = typeof globalThis & {
  Netlify?: { env?: { get(name: string): string | undefined } };
};

function read(name: string) {
  return (
    process.env[name] || (globalThis as NetlifyRuntime).Netlify?.env?.get(name)
  );
}

export type AdminClient = SupabaseClient;

export function createAdminClient(): AdminClient | null {
  const url = read("SUPABASE_URL") || read("NEXT_PUBLIC_SUPABASE_URL");
  const serviceRoleKey = read("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !serviceRoleKey) return null;

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

// ---------------------------------------------------------------------------
// Entitlement. The claim itself lives in ./entitlement so the middleware can
// read it without importing this module and its service role key.
// ---------------------------------------------------------------------------

export { PROGRAM_ACCESS_CLAIM, hasProgramAccess } from "./entitlement";

/** Write the claim. Called once, straight after a code is successfully claimed. */
export async function grantProgramAccess(
  admin: AdminClient,
  userId: string,
  code: string,
) {
  const { error } = await admin.auth.admin.updateUserById(userId, {
    app_metadata: { [PROGRAM_ACCESS_CLAIM]: true, access_code: code },
  });
  return !error;
}

/** Remove the claim, so the next login is refused. Used when a code is revoked. */
export async function revokeProgramAccess(admin: AdminClient, userId: string) {
  await admin.auth.admin.updateUserById(userId, {
    app_metadata: { [PROGRAM_ACCESS_CLAIM]: false },
  });
}

export type EntitlementCheck =
  | { state: "granted"; code: string }
  | { state: "revoked" }
  | { state: "none" }
  | { state: "unknown" };

/**
 * Does this account still own an active, redeemed code?
 *
 * Run at login, not on every page view. It does three jobs:
 *
 *   1. Honours revocation. Nikita unticking `active` in the table blocks the
 *      next login rather than waiting for a token to expire.
 *   2. Self-heals. If the claim failed to stamp during redemption — the code
 *      spent but the account left without access — this notices the redeemed
 *      row and repairs it on first login, rather than locking a paying buyer
 *      out of something they own.
 *   3. Refuses accounts that never redeemed anything at all.
 */
export async function checkEntitlement(
  admin: AdminClient,
  userId: string,
): Promise<EntitlementCheck> {
  const { data, error } = await admin
    .from("access_codes")
    .select("code, active")
    .eq("redeemed_by", userId)
    .maybeSingle();

  if (error) return { state: "unknown" };
  if (!data) return { state: "none" };
  if (!data.active) return { state: "revoked" };

  return { state: "granted", code: data.code as string };
}
