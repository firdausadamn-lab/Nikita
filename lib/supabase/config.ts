// ---------------------------------------------------------------------------
// Public Supabase configuration — URL and anon key ONLY.
//
// This module is imported by the middleware, which is bundled separately at
// build time. Nothing that must stay secret may be read here: the service role
// key lives in lib/supabase/admin.ts, which only Node-runtime route handlers
// import.
//
// Env vars are read as literal `process.env.X` rather than `process.env[name]`
// on purpose. Next.js substitutes literal reads at build time, which is what
// makes them available inside the middleware bundle; a dynamic lookup would
// come back undefined there and the gate would stop working.
// ---------------------------------------------------------------------------

type NetlifyRuntime = typeof globalThis & {
  Netlify?: { env?: { get(name: string): string | undefined } };
};

/** Netlify also injects env at runtime; fall back to it when present. */
function netlify(name: string) {
  return (globalThis as NetlifyRuntime).Netlify?.env?.get(name);
}

export type PublicSupabaseConfig = { url: string; anonKey: string };

/**
 * The anon key is safe to expose: on its own it grants nothing, because
 * `access_codes` has row level security on with zero policies. Its whole job
 * is to let Supabase Auth issue and refresh sessions.
 */
export function publicSupabaseConfig(): PublicSupabaseConfig | null {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || netlify("NEXT_PUBLIC_SUPABASE_URL");
  const anonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    netlify("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (!url || !anonKey) return null;
  return { url, anonKey };
}

/**
 * Absolute site origin, used to build the password-reset link Supabase emails
 * out. Falls back to the request origin so a preview deploy still sends links
 * that point at itself rather than at production.
 */
export function siteOrigin(request?: { url: string }) {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL || netlify("NEXT_PUBLIC_SITE_URL");
  if (configured) return configured.replace(/\/+$/, "");
  if (request) return new URL(request.url).origin;
  return "http://localhost:3100";
}
