"use client";

import { CheckCircle, ClockCountdown } from "@phosphor-icons/react";
import { useLang } from "@/content/i18n";
import { platform } from "@/content/platform";
import { CinematicImage } from "./cinematic-image";

export function CoachEditorial() {
  const { t } = useLang();

  return (
    <>
      <section className="relative min-h-[75dvh] overflow-hidden border-b border-[var(--line)]">
        <div className="absolute inset-0">
          <CinematicImage
            src="/portrait.jpg"
            alt={t({ ru: "Временная редакционная фотография борца в тренировочном зале", en: "Temporary editorial photograph of a wrestler in a training room" })}
            priority
            parallax={45}
            objectPosition="center 48%"
            className="h-full w-full"
          />
        </div>
        <div className="hero-scrim absolute inset-0" />
        <div className="shell relative z-10 grid min-h-[75dvh] items-end gap-10 pb-14 pt-32 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <span className="eyebrow">Nikita · {t({ ru: "История спортсмена", en: "Athlete story" })}</span>
            <h1 className="mt-5 font-display text-[clamp(4rem,11vw,9rem)] leading-[.86]">
              {t({ ru: "ДЕТАЛИ СТАНОВЯТСЯ ИНСТИНКТОМ.", en: "THE DETAILS BECOME INSTINCT." })}
            </h1>
          </div>
          <p className="max-w-xl self-end text-lg leading-relaxed text-[var(--ink-soft)]">{t(platform.athlete.biography)}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <span className="eyebrow">{t({ ru: "Почему появилась программа", en: "Why the program exists" })}</span>
            <div className="rule-accent mt-5" />
          </div>
          <div>
            <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-none">
              {t({ ru: "ПЕРЕНЕСТИ ПОРЯДОК КОВРА ТУДА, ГДЕ ТЫ ТРЕНИРУЕШЬСЯ.", en: "BRING THE ORDER OF THE MAT WHEREVER YOU TRAIN." })}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
              {t({
                ru: "Не у каждого есть борцовский зал, партнёр или тренер рядом каждый день. Но принципы остаются доступными: позиция, повторение, усилие и постепенная нагрузка.",
                en: "Not everyone has a wrestling room, partner, or coach nearby every day. The principles remain available: position, repetition, intent, and progressive load.",
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="section border-y border-[var(--line)] bg-[var(--bg-raise)]">
        <div className="shell grid gap-12 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <span className="eyebrow">{t({ ru: "Доверие", en: "Trust" })}</span>
            <h2 className="mt-5 font-display text-5xl">{t({ ru: "ФАКТЫ ПЕРЕД ПУБЛИКАЦИЕЙ.", en: "FACTS BEFORE PUBLICATION." })}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-[var(--ink-mute)]">
              {t({
                ru: "CRAFT публикует достижения только после документального подтверждения и одобрения спортсмена.",
                en: "CRAFT publishes achievements only after documentary evidence and athlete approval.",
              })}
            </p>
          </div>
          <div className="border-t border-[var(--line-strong)]">
            {platform.athlete.credentials.map((credential) => (
              <div key={credential.label.en} className="grid grid-cols-[1fr_auto] items-center gap-6 border-b border-[var(--line)] py-5">
                <span className="font-display text-2xl">{t(credential.label)}</span>
                <span className={`inline-flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.1em] ${credential.verified ? "text-[var(--steel)]" : "text-[var(--oxblood-bright)]"}`}>
                  {credential.verified ? <CheckCircle size={17} /> : <ClockCountdown size={17} />}
                  {credential.verified ? t({ ru: "Подтверждено", en: "Verified" }) : t({ ru: "На проверке", en: "Review pending" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell max-w-5xl text-center">
          <p className="font-display text-[clamp(2.6rem,6vw,5rem)] leading-tight">“{t(platform.athlete.philosophy)}”</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-[.18em] text-[var(--ink-mute)]">Nikita</p>
          <p className="mx-auto mt-10 max-w-xl text-xs leading-relaxed text-[var(--ink-mute)]">
            {t({ ru: "Фотография на этой странице временная и не изображает Никиту. Заменить на одобренный портрет до запуска.", en: "The photograph on this page is temporary and does not depict Nikita. Replace it with an approved portrait before launch." })}
          </p>
        </div>
      </section>
    </>
  );
}
