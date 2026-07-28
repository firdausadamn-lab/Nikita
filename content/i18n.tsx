"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  type ComponentProps,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Bilingual core. Russian is primary; English is secondary.
//
// The active locale is now driven by the URL (/ru, /en) — set once, server-side,
// in app/[locale]/layout.tsx and handed to this provider. Every string is a
// Localized<string>: the type makes a half-translated state impossible, since
// you cannot construct content without both languages.
// ---------------------------------------------------------------------------

export type Locale = "ru" | "en";

export type Localized<T = string> = { ru: T; en: T };

export const LOCALES: Locale[] = ["ru", "en"];
export const DEFAULT_LOCALE: Locale = "ru";

type LangContextValue = {
  locale: Locale;
  /** Switch language by navigating to the same page under the other locale. */
  setLocale: (l: Locale) => void;
  toggle: () => void;
  /** Resolve a Localized value against the active locale. */
  t: <T>(value: Localized<T>) => T;
};

const LangContext = createContext<LangContextValue | null>(null);

/** Swap (or add) the leading /ru|/en segment on a pathname. */
function withLocale(pathname: string, next: Locale): string {
  const parts = pathname.split("/");
  if (parts[1] === "ru" || parts[1] === "en") {
    parts[1] = next;
    return parts.join("/") || `/${next}`;
  }
  return `/${next}${pathname === "/" ? "" : pathname}`;
}

export function LanguageProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const setLocale = (l: Locale) => {
    if (l === locale) return;
    const target = withLocale(pathname || `/${locale}`, l);
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.push(target + hash);
  };

  const toggle = () => setLocale(locale === "ru" ? "en" : "ru");

  const t = <T,>(value: Localized<T>): T => value[locale];

  return (
    <LangContext.Provider value={{ locale, setLocale, toggle, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within <LanguageProvider>");
  return ctx;
}

/** Convenience: resolve a single Localized value. */
export function useT() {
  return useLang().t;
}

/** Convenience: the active locale. */
export function useLocale() {
  return useLang().locale;
}

/**
 * Locale-aware <Link>. Internal paths ("/program", "/course/x") get the active
 * locale prefixed automatically. External (http/mailto/tel), hash-only, and
 * already-prefixed links pass through untouched. Drop-in for next/link:
 *   import { LocaleLink as Link } from "@/content/i18n";
 */
export function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const { locale } = useLang();
  let final = href;

  if (typeof href === "string") {
    if (/^(https?:|mailto:|tel:|#)/.test(href)) {
      final = href;
    } else if (href.startsWith("/")) {
      const seg = href.split("/")[1];
      final =
        seg === "ru" || seg === "en"
          ? href
          : `/${locale}${href === "/" ? "" : href}`;
    }
  }

  return <Link href={final} {...props} />;
}
