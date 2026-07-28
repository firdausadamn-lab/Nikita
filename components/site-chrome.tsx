"use client";

import { LocaleLink as Link } from "@/content/i18n";
import { useEffect, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { LanguageToggle } from "./language-toggle";
import { useLang } from "@/content/i18n";
import { platform } from "@/content/platform";

const links = [
  ["/method", { ru: "Метод", en: "Method" }],
  ["/program", { ru: "Программа", en: "Program" }],
  ["/coach", { ru: "Никита", en: "Nikita" }],
  ["/faq", { ru: "Вопросы", en: "FAQ" }],
] as const;

export function PublicHeader() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--line)] bg-[color:rgba(11,10,9,.9)] backdrop-blur-md">
      <div className="shell flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3" aria-label={t(platform.brand.name)}>
          <span className="grid h-8 w-8 place-items-center border border-[var(--line-strong)] font-display text-sm text-[var(--ink)]">
            {t(platform.brand.shortName)}
          </span>
          <span className="hidden font-display text-lg tracking-wide sm:block">{t(platform.brand.name)}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="font-mono text-[.68rem] uppercase tracking-[.18em] text-[var(--ink-soft)] transition-colors hover:text-[var(--ink)]">
              {t(label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Link href="/" className="action-button hidden sm:inline-flex">
            {t({ ru: "Войти в программу", en: "Enter the program" })}
          </Link>
          <button className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="fixed inset-0 top-[4.5rem] flex flex-col bg-[var(--bg)] px-[4vw] py-8 lg:hidden" aria-label="Mobile navigation">
          {links.map(([href, label], index) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-[var(--line)] py-5 font-display text-4xl">
              <span className="font-mono text-xs text-[var(--ink-mute)]">0{index + 1}</span>{t(label)}
            </Link>
          ))}
          <Link href="/" onClick={() => setOpen(false)} className="mt-8 action-button justify-center">{t({ ru: "Войти в программу", en: "Enter the program" })}</Link>
        </nav>
      )}
    </header>
  );
}

export function PublicFooter() {
  const { t } = useLang();
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-raise)]">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">{t(platform.brand.name)}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--ink-mute)]">{t(platform.brand.tagline)} {t({ ru: "Тренируйся на своём уровне. Возвращайся, когда нужен порядок.", en: "Train at your level. Return whenever you need structure." })}</p>
        </div>
        <div className="footer-links"><span className="eyebrow">{t({ ru: "Платформа", en: "Platform" })}</span><Link href="/program">{t({ ru: "Программа", en: "Program" })}</Link><Link href="/method">{t({ ru: "Метод", en: "Method" })}</Link><Link href="/">{t({ ru: "Программа тренировок", en: "Training program" })}</Link></div>
        <div className="footer-links"><span className="eyebrow">{t({ ru: "Доверие", en: "Trust" })}</span><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refund-policy">Refunds</Link><Link href="/health-disclaimer">Health disclaimer</Link></div>
      </div>
      <div className="shell border-t border-[var(--line)] py-5 font-mono text-[.64rem] uppercase tracking-[.14em] text-[var(--ink-mute)]">© 2026 CRAFT × Nikita. {t({ ru: "Детали запуска требуют подтверждения.", en: "Launch details subject to client confirmation." })}</div>
    </footer>
  );
}
