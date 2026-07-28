// Locale configuration shared by the middleware and the [locale] layout.
// Kept framework-agnostic (no "use client") so server code can import it.

export const locales = ["ru", "en"] as const;
export type Locale = (typeof locales)[number];

/** Russian is primary — it is the default and the first paint for everyone. */
export const defaultLocale: Locale = "ru";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
