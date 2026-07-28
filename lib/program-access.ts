// ---------------------------------------------------------------------------
// Access control: one code, one account.
//
// A code used to be a key that any number of people could copy. Now it is a
// one-time ticket: redeeming it creates exactly one account and spends the
// code. Access lives with that account's login from then on, so passing the
// code to a training partner buys them nothing — the only thing left to share
// is the buyer's own email and password.
//
// This module holds the routing rules only: which paths need an account, and
// which pages have to stay open so the sign-in flow can reach them. The
// session itself is Supabase's, checked in middleware.ts.
// ---------------------------------------------------------------------------

/** Where a visitor without a session is sent. Must always stay public. */
export const ACCESS_PATH = "/access";

/** Where the password-reset email lands. Must also stay public. */
export const RESET_PATH = "/reset-password";

/**
 * Pages that carry the sign-in flow. Gating any of these would loop: the
 * middleware would bounce a signed-out visitor to a page it then bounces them
 * away from again.
 */
const authPaths = [ACCESS_PATH, RESET_PATH];

/**
 * Program routes. Everything listed here needs an account; everything else
 * (the public marketing pages and the legal pages) stays open.
 */
const protectedSections = [
  "/training",
  "/dashboard",
  "/onboarding",
  "/welcome",
];

const localePrefix = /^\/(?:ru|en)(?=\/|$)/;

/** Strip a leading /ru or /en so the path rules are written once, not twice. */
export function stripLocale(pathname: string) {
  return pathname.replace(localePrefix, "") || "/";
}

/** Does this path already name a language? */
export function hasLocalePrefix(pathname: string) {
  return localePrefix.test(pathname);
}

export function isAccessPath(pathname: string) {
  return stripLocale(pathname) === ACCESS_PATH;
}

/** The sign-in and password-reset pages. Never gated. */
export function isAuthPath(pathname: string) {
  return authPaths.includes(stripLocale(pathname));
}

export function isProtectedProgramPath(pathname: string) {
  const path = stripLocale(pathname);

  // The pages that carry sign-in can never be gated, or the redirect loops.
  if (authPaths.includes(path)) return false;

  // The program home.
  if (path === "/") return true;

  return protectedSections.some(
    (section) => path === section || path.startsWith(`${section}/`),
  );
}

// ---------------------------------------------------------------------------
// Where to send someone after they sign in.
//
// The access page carries the intended destination as ?from=. That value comes
// off the URL bar, so it is attacker-controlled: without a check, a link like
// /access?from=https://evil.example would turn the site's own login into an
// open redirect, landing a buyer on somebody else's page wearing the trust of
// this domain. Only same-site absolute paths are allowed through.
// ---------------------------------------------------------------------------

export function safeReturnPath(
  from: string | null | undefined,
  locale: string,
  /**
   * Auth paths that are a legitimate destination this time. The reset-password
   * page is one: the emailed link is *meant* to land there, whereas a login
   * form must never send anybody back to a login form.
   */
  allowAuthPaths: string[] = [],
) {
  const fallback = `/${locale}`;
  if (!from) return fallback;

  // Must be a plain absolute path. "//evil.example" is protocol-relative and
  // "https://…" is absolute; neither is ours. Backslashes are normalised to
  // slashes by some browsers, so they are rejected too.
  if (!from.startsWith("/") || from.startsWith("//")) return fallback;
  if (from.includes("\\")) return fallback;

  const [rawPath, ...rest] = from.split("?");
  const query = rest.length > 0 ? `?${rest.join("?")}` : "";
  const path = stripLocale(rawPath);

  // Never bounce back into the sign-in flow itself.
  if (authPaths.includes(path) && !allowAuthPaths.includes(path)) {
    return fallback;
  }

  // A path with no language in it has no page behind it — everything lives
  // under app/[locale]/. Returning "/" here is what used to drop a freshly
  // signed-in athlete onto a 404 the moment they finished signing in.
  if (!hasLocalePrefix(rawPath)) {
    return `/${locale}${path === "/" ? "" : path}${query}`;
  }

  return from;
}
