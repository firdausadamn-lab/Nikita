import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale } from "@/lib/i18n/config";
import { hasProgramAccess } from "@/lib/supabase/entitlement";
import { createSessionClient } from "@/lib/supabase/session";
import { ACCESS_PATH, isProtectedProgramPath } from "@/lib/program-access";

// ---------------------------------------------------------------------------
// One middleware, two jobs:
//   1. Send anyone without an entitled account to the sign-in page.
//   2. Locale routing for public and program pages.
//
// What it checks, and why it is two things rather than one.
//
// A Supabase session proves somebody signed in. It does NOT prove they bought
// the program: if public sign-ups were ever switched on in the dashboard,
// anybody could register straight against the anon key and hold a perfectly
// valid session. So the gate asks for a verified session AND the
// `program_access` claim, which only the service role can write — a signed-in
// user cannot grant it to themselves.
//
// getUser(), not getSession(). getSession only decodes the cookie it was
// handed, and a forged cookie decodes just fine. getUser checks the token with
// Supabase. That costs a round trip, and the round trip is the point: deleting
// an account in the Supabase dashboard locks that person out on their very next
// request, rather than whenever their token happens to lapse.
// ---------------------------------------------------------------------------

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth endpoints and Netlify internals handle themselves. Gating or
  // locale-redirecting them would break sign-in and loop the reset link.
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/auth/") ||
    pathname.startsWith("/.netlify/")
  ) {
    return NextResponse.next();
  }

  const locale =
    locales.find(
      (value) => pathname === `/${value}` || pathname.startsWith(`/${value}/`),
    ) ?? defaultLocale;

  if (isProtectedProgramPath(pathname)) {
    const turnAway = () => {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}${ACCESS_PATH}`;
      // Where to return to once they are in.
      url.search =
        pathname === `/${locale}` ? "" : `?from=${encodeURIComponent(pathname)}`;

      const redirect = NextResponse.redirect(url);
      redirect.headers.set("Cache-Control", "no-store");
      return redirect;
    };

    const session = createSessionClient(request);

    // No session client means Supabase is not configured. Refuse rather than
    // fall open: a gate that opens when its own environment is missing is not
    // a gate.
    if (!session) return turnAway();

    const {
      data: { user },
    } = await session.supabase.auth.getUser();

    if (!user || !hasProgramAccess(user)) {
      return session.commit(turnAway());
    }

    // Carry any refreshed session cookies through, or the athlete gets signed
    // out at an arbitrary moment mid-session.
    return session.commit(NextResponse.next());
  }

  const hasLocale = locales.some(
    (value) => pathname === `/${value}` || pathname.startsWith(`/${value}/`),
  );

  if (!hasLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Run on pages, but not framework internals or static files.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:css|js|mjs|map|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|otf)).*)",
  ],
};
