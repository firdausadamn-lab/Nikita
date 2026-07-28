"use client";

import { motion } from "framer-motion";
import { useLang, LOCALES, type Locale } from "@/content/i18n";

/**
 * Language toggle — RU / EN segmented control with a sliding oxblood pill.
 * Switches the entire site (all copy is Localized). Reduced-motion safe:
 * framer's layout animation is skipped by the global reduced-motion CSS.
 */
export function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLang();

  return (
    <div
      role="group"
      aria-label="Language / Язык"
      className="relative inline-flex items-center rounded-full border border-[var(--line-strong)] bg-[var(--bg-raise)]/70 p-0.5 backdrop-blur"
    >
      {LOCALES.map((l: Locale) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => setLocale(l)}
            aria-pressed={active}
            className={`relative z-10 rounded-full px-3 py-1 font-mono text-[0.7rem] uppercase tracking-[0.18em] transition-colors duration-200 ${
              active ? "text-[var(--ink)]" : "text-[var(--ink-mute)] hover:text-[var(--ink-soft)]"
            } ${compact ? "" : ""}`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{ background: "var(--oxblood)" }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
