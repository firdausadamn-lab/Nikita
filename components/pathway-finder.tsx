"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useLang } from "@/content/i18n";
import { track } from "@/lib/analytics";

type Choice = "beginner" | "intermediate" | "advanced";
type Place = "gym" | "home" | "outdoors";

export function PathwayFinder() {
  const { t } = useLang();
  const [level, setLevel] = useState<Choice>("beginner");
  const [place, setPlace] = useState<Place>("home");
  const [revealed, setRevealed] = useState(false);

  const levelLabels: Record<Choice, { ru: string; en: string }> = {
    beginner: { ru: "Начинающий", en: "Beginner" },
    intermediate: { ru: "Средний", en: "Intermediate" },
    advanced: { ru: "Продвинутый", en: "Advanced" },
  };
  const placeLabels: Record<Place, { ru: string; en: string }> = {
    gym: { ru: "Зал", en: "Gym" },
    home: { ru: "Дом", en: "Home" },
    outdoors: { ru: "Улица", en: "Outdoors" },
  };

  return (
    <div className="pathway-panel">
      <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <span className="eyebrow">{t({ ru: "Найди свою точку старта", en: "Find your starting point" })}</span>
          <h3 className="mt-4 font-display text-4xl md:text-6xl">{t({ ru: "Начни там, где ты есть.", en: "Begin where you are." })}</h3>
          <p className="mt-5 max-w-md text-[var(--ink-soft)]">{t({ ru: "Выбери опыт и место тренировки. Это пример пути, не медицинская или персональная рекомендация.", en: "Choose your experience and training environment. This is a sample pathway, not medical or individualized advice." })}</p>
        </div>
        <div className="space-y-7">
          <ChoiceGroup label={t({ ru: "Опыт", en: "Experience" })} values={Object.keys(levelLabels) as Choice[]} value={level} onChange={setLevel} labels={levelLabels} />
          <ChoiceGroup label={t({ ru: "Где тренируешься", en: "Training environment" })} values={Object.keys(placeLabels) as Place[]} value={place} onChange={setPlace} labels={placeLabels} />
          <button className="action-button w-full justify-between sm:w-auto" onClick={() => { setRevealed(true); track("pathway_tool_completed", { level, place }); }}>
            {t({ ru: "Показать мой путь", en: "Show my pathway" })}<ArrowRight size={18} />
          </button>
        </div>
      </div>
      {revealed && (
        <div className="mt-10 grid gap-5 border-t border-[var(--line-strong)] pt-8 md:grid-cols-3" aria-live="polite">
          <Result label={t({ ru: "Стартовый блок", en: "Starting block" })} value={level === "beginner" ? t({ ru: "Недели 1–2: База", en: "Weeks 1–2: Foundation" }) : t({ ru: "Неделя 3: Силовая база", en: "Week 3: Strength base" })} />
          <Result label={t({ ru: "Конфигурация", en: "Configuration" })} value={place === "gym" ? t({ ru: "Штанга + гантели", en: "Barbell + dumbbells" }) : t({ ru: "Резина + собственный вес", en: "Bands + bodyweight" })} />
          <Result label={t({ ru: "Ритм", en: "Cadence" })} value={level === "advanced" ? t({ ru: "4 сессии / неделя", en: "4 sessions / week" }) : t({ ru: "3 сессии / неделя", en: "3 sessions / week" })} />
        </div>
      )}
    </div>
  );
}

function ChoiceGroup<T extends string>({ label, values, value, onChange, labels }: { label: string; values: T[]; value: T; onChange: (value: T) => void; labels: Record<T, { ru: string; en: string }> }) {
  const { t } = useLang();
  return <fieldset><legend className="mb-3 font-mono text-[.68rem] uppercase tracking-[.16em] text-[var(--ink-mute)]">{label}</legend><div className="flex flex-wrap gap-2">{values.map((item) => <button type="button" key={item} onClick={() => onChange(item)} className={`choice-chip ${value === item ? "choice-chip-active" : ""}`} aria-pressed={value === item}>{t(labels[item])}</button>)}</div></fieldset>;
}

function Result({ label, value }: { label: string; value: string }) {
  return <div><span className="eyebrow">{label}</span><p className="mt-2 font-display text-xl">{value}</p></div>;
}
