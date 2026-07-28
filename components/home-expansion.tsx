"use client";

import { LocaleLink as Link } from "@/content/i18n";
import {
  ArrowRight,
  Barbell,
  BoundingBox,
  HouseLine,
  Lightning,
  PersonSimpleRun,
  WaveSine,
} from "@phosphor-icons/react";
import { useLang } from "@/content/i18n";

const powerMethods = [
  {
    icon: PersonSimpleRun,
    title: { ru: "Плиометрика", en: "Plyometrics" },
    body: {
      ru: "Прыжки, берпи и взрывные отжимания. Низкий объём, полное намерение, чистое приземление.",
      en: "Jumps, burpees, and explosive push-ups. Low volume, full intent, clean landings.",
    },
  },
  {
    icon: WaveSine,
    title: { ru: "Борцовская резина", en: "Wrestling resistance" },
    body: {
      ru: "Короткие серии имитируют борьбу за позицию, входы и быстрый возврат в стойку.",
      en: "Short rounds rehearse hand-fighting, entries, and fast recovery to stance.",
    },
  },
  {
    icon: Lightning,
    title: { ru: "Взрывной подъём", en: "Explosive lifting" },
    body: {
      ru: "Махи, высокие тяги и подходящие варианты взятия. Скорость важнее лишнего веса.",
      en: "Swings, high pulls, and appropriate clean variations. Speed matters more than excess load.",
    },
  },
];

export function HomeExpansion() {
  const { t } = useLang();

  return (
    <>
      <section className="section border-b border-[var(--line)]" aria-labelledby="equipment-heading">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <span className="eyebrow">{t({ ru: "Оборудование", en: "Equipment" })}</span>
              <p className="mt-5 max-w-sm leading-relaxed text-[var(--ink-mute)]">
                {t({
                  ru: "Программа подстраивается под место, а не исключает тебя из-за отсутствия борцовского зала.",
                  en: "The program adapts to the place. It does not exclude you for lacking a wrestling facility.",
                })}
              </p>
            </div>
            <h2 id="equipment-heading" className="font-display text-[clamp(3rem,8vw,7rem)] leading-none">
              {t({ ru: "ТРЕНИРУЙСЯ С ТЕМ, ЧТО ЕСТЬ.", en: "TRAIN WITH WHAT YOU HAVE." })}
            </h2>
          </div>

          <div className="mt-14 grid gap-px border border-[var(--line)] bg-[var(--line)] lg:grid-cols-2">
            <EquipmentPath
              icon={Barbell}
              index="A"
              title={t({ ru: "Полный зал", en: "Full gym" })}
              items={[
                t({ ru: "Штанга и блины", en: "Barbell and plates" }),
                t({ ru: "Гантели и скамья", en: "Dumbbells and bench" }),
                t({ ru: "Борцовская резина", en: "Wrestling resistance bands" }),
              ]}
            />
            <EquipmentPath
              icon={HouseLine}
              index="B"
              title={t({ ru: "Дом или улица", en: "Home or outdoors" })}
              items={[
                t({ ru: "Собственный вес", en: "Bodyweight" }),
                t({ ru: "Резина", en: "Resistance bands" }),
                t({ ru: "Одна пара гантелей", en: "One pair of dumbbells" }),
              ]}
            />
          </div>
        </div>
      </section>

      <section className="section bg-[var(--bg-raise)]" aria-labelledby="power-heading">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <span className="eyebrow">{t({ ru: "Взрывная мощность", en: "Explosive power" })}</span>
              <div className="rule-accent mt-5" />
            </div>
            <div>
              <h2 id="power-heading" className="font-display text-[clamp(3rem,8vw,7rem)] leading-none">
                {t({ ru: "БЫСТРО СОЗДАТЬ БОЛЬШУЮ СИЛУ.", en: "PRODUCE HIGH FORCE, FAST." })}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
                {t({
                  ru: "Мощность не выглядит как хаос. Она строится на позиции, намерении и способности остановить движение так же чисто, как начать.",
                  en: "Power is not chaos. It is built on position, intent, and the ability to stop a movement as cleanly as you start it.",
                })}
              </p>
            </div>
          </div>

          <div className="mt-14 border-t border-[var(--line-strong)]">
            {powerMethods.map(({ icon: Icon, title, body }, index) => (
              <article key={title.en} className="grid gap-5 border-b border-[var(--line)] py-7 md:grid-cols-[3rem_.65fr_1.35fr] md:items-start">
                <Icon size={24} className="text-[var(--oxblood-bright)]" aria-hidden />
                <h3 className="font-display text-3xl">{String(index + 1).padStart(2, "0")} · {t(title)}</h3>
                <p className="max-w-xl leading-relaxed text-[var(--ink-soft)]">{t(body)}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex gap-4 border border-[var(--line-strong)] bg-[var(--bg-panel)] p-5 text-sm leading-relaxed text-[var(--ink-soft)]">
            <BoundingBox size={22} className="mt-0.5 shrink-0 text-[var(--steel)]" aria-hidden />
            <p>{t({ ru: "Выбор упражнения и нагрузки должен соответствовать технике, опыту, среде и состоянию здоровья.", en: "Exercise choice and load must match your technique, experience, environment, and health status." })}</p>
          </div>
        </div>
      </section>

      <section className="section border-y border-[var(--line)]">
        <div className="shell grid gap-12 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="eyebrow">{t({ ru: "После курса", en: "Beyond the course" })}</span>
            <h2 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-none">
              {t({ ru: "СИСТЕМА СНАЧАЛА. КОРРЕКТИРОВКА ПОТОМ.", en: "STRUCTURE FIRST. ADJUSTMENT NEXT." })}
            </h2>
          </div>
          <div className="self-end">
            <p className="text-lg leading-relaxed text-[var(--ink-soft)]">
              {t({
                ru: "Курс остаётся полноценной программой. Индивидуальный коучинг сможет добавить проверку техники, изменения нагрузки и ответственность, когда тебе это действительно нужно.",
                en: "The course remains a complete program. Individual coaching can add technique review, load adjustments, and accountability when you genuinely need it.",
              })}
            </p>
            <Link href="/dashboard/coaching" className="quiet-button mt-8">
              {t({ ru: "Посмотреть путь коучинга", en: "See the coaching path" })}<ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function EquipmentPath({ icon: Icon, index, title, items }: { icon: typeof Barbell; index: string; title: string; items: string[] }) {
  return (
    <article className="bg-[var(--bg-panel)] p-6 md:p-10">
      <div className="flex items-center justify-between">
        <Icon size={30} className="text-[var(--steel)]" aria-hidden />
        <span className="font-mono text-xs text-[var(--ink-mute)]">PATH {index}</span>
      </div>
      <h3 className="mt-10 font-display text-4xl">{title}</h3>
      <ul className="mt-7 divide-y divide-[var(--line)] border-t border-[var(--line)]">
        {items.map((item) => <li key={item} className="py-3 text-sm text-[var(--ink-soft)]">{item}</li>)}
      </ul>
    </article>
  );
}
