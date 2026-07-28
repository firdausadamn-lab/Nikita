"use client";

import { CaretDown, Warning } from "@phosphor-icons/react";
import { useLang } from "@/content/i18n";
import type { ReferenceSection } from "@/content/reference";

type Bilingual = { ru: string; en: string };

export type SafetyNotice = {
  eyebrow: Bilingual;
  title: Bilingual;
  points: Bilingual[];
};

/**
 * Reference sections (nutrition, recovery, injury, supplements, sauna…).
 *
 * Collapsibles are native <details>/<summary>: they work with the keyboard,
 * survive a JS failure, and let the browser's find-in-page open them. A
 * returning athlete opens one answer instead of re-reading the page.
 */
export function ReferenceView({
  section,
  safety,
}: {
  section: ReferenceSection;
  /**
   * Renders a hard safety notice above everything else. Used where acting
   * wrongly on the content causes physical harm: injury, supplements, sauna.
   */
  safety?: SafetyNotice;
}) {
  const { t } = useLang();

  return (
    <>
      <header className="mb-10">
        <span className="eyebrow">{t(section.eyebrow)}</span>
        <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.95]">
          {t(section.title)}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
          {t(section.intro)}
        </p>
      </header>

      {safety ? <SafetyCallout notice={safety} /> : null}

      <p className="reference-caveat">{t(section.caveat)}</p>

      {section.groups.map((group) => (
        <section key={group.id} className="mt-12">
          <div className="flex items-baseline gap-4 border-b border-[var(--line-strong)] pb-4">
            <span className="font-mono text-[.62rem] uppercase tracking-[.16em] text-[var(--oxblood-bright)]">
              {t(group.eyebrow)}
            </span>
            <h2 className="font-display text-2xl md:text-3xl">
              {t(group.title)}
            </h2>
          </div>

          <div>
            {group.entries.map((entry) => (
              <details key={entry.id} className="reference-item" name={group.id}>
                <summary className="reference-summary">
                  <span>{t(entry.question)}</span>
                  <CaretDown
                    size={18}
                    className="reference-caret shrink-0"
                    aria-hidden="true"
                  />
                </summary>

                <div className="reference-body">
                  {entry.body.map((paragraph, index) => (
                    <p key={index}>{t(paragraph)}</p>
                  ))}

                  {entry.list ? (
                    <ul className="reference-list">
                      {entry.list.map((item, index) => (
                        <li key={index}>{t(item)}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

/**
 * The safety callout. Deliberately the loudest element on its page: acting
 * wrongly on injury, dosing, or heat/cold content causes direct physical
 * harm, so it is never collapsible and never below the fold.
 */
function SafetyCallout({ notice }: { notice: SafetyNotice }) {
  const { t } = useLang();

  return (
    <aside className="safety-callout" role="note">
      <div className="safety-head">
        <Warning size={26} weight="fill" aria-hidden="true" />
        <div>
          <span className="safety-eyebrow">{t(notice.eyebrow)}</span>
          <h2 className="safety-title">{t(notice.title)}</h2>
        </div>
      </div>

      <ul className="safety-points">
        {notice.points.map((point, index) => (
          <li key={index}>{t(point)}</li>
        ))}
      </ul>
    </aside>
  );
}
