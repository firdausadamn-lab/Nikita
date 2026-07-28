"use client";

import { LocaleLink as Link } from "@/content/i18n";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from "@phosphor-icons/react";
import { useLang } from "@/content/i18n";
import { PlatformStyle } from "./platform-style";

type OnboardingData = {
  experience: "beginner" | "intermediate" | "advanced";
  environment: "gym" | "home" | "outdoors";
  focus: "strength" | "conditioning" | "power" | "general";
  accepted: boolean;
};

export function OnboardingExperience() {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({ experience: "beginner", environment: "home", focus: "general", accepted: false });
  const labels = useMemo(() => [t({ ru: "Уровень", en: "Level" }), t({ ru: "Среда", en: "Environment" }), t({ ru: "Фокус", en: "Focus" }), t({ ru: "Безопасность", en: "Safety" })], [t]);

  const complete = () => {
    window.localStorage.setItem("nikita.onboarding", JSON.stringify({ ...data, completedAt: new Date().toISOString() }));
  };

  return (
    <><PlatformStyle /><main id="main-content" className="grid min-h-[100dvh] bg-[var(--bg)] lg:grid-cols-[.72fr_1.28fr]">
      <aside className="relative hidden overflow-hidden border-r border-[var(--line)] bg-[var(--bg-raise)] p-12 lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 opacity-20 photo-placeholder" />
        <Link href="/" className="relative font-display text-2xl">THE WRESTLER&apos;S HOME</Link>
        <blockquote className="relative max-w-md font-display text-5xl leading-tight">{t({ ru: "НАЧНИ ТАМ, ГДЕ ТЫ ЕСТЬ.", en: "BEGIN WHERE YOU ARE." })}</blockquote>
        <p className="relative font-mono text-[.62rem] uppercase tracking-[.16em] text-[var(--ink-mute)]">CRAFT × NIKITA · MEMBER SETUP</p>
      </aside>

      <section className="flex min-h-[100dvh] flex-col px-5 py-6 sm:px-10 lg:px-[8vw] lg:py-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-lg lg:hidden">WH</Link>
          <span className="font-mono text-[.64rem] uppercase tracking-[.15em] text-[var(--ink-mute)]">{String(step + 1).padStart(2, "0")} / 04</span>
        </div>
        <div className="mt-6 flex gap-2" aria-label="Onboarding progress">{labels.map((label, index) => <div key={label} className="flex-1"><div className={`h-1 ${index <= step ? "bg-[var(--oxblood-bright)]" : "bg-[var(--line)]"}`} /><span className="mt-2 hidden font-mono text-[.56rem] uppercase text-[var(--ink-mute)] sm:block">{label}</span></div>)}</div>

        <div className="my-auto py-12">
          {step === 0 && <ChoiceStep eyebrow={t({ ru: "Твой опыт", en: "Your experience" })} title={t({ ru: "КАК ДОЛГО ТЫ ТРЕНИРУЕШЬСЯ?", en: "HOW LONG HAVE YOU TRAINED?" })} value={data.experience} onChange={(experience) => setData({ ...data, experience: experience as OnboardingData["experience"] })} options={[["beginner", t({ ru: "Начинающий", en: "Beginner" }), t({ ru: "Меньше года или возвращаюсь", en: "Under one year or returning" })], ["intermediate", t({ ru: "Средний", en: "Intermediate" }), t({ ru: "1–3 года стабильной работы", en: "1–3 years of consistent training" })], ["advanced", t({ ru: "Продвинутый", en: "Advanced" }), t({ ru: "3+ года структурной подготовки", en: "3+ years of structured training" })]]} />}
          {step === 1 && <ChoiceStep eyebrow={t({ ru: "Твоя среда", en: "Your environment" })} title={t({ ru: "ГДЕ ТЫ БУДЕШЬ РАБОТАТЬ?", en: "WHERE WILL YOU DO THE WORK?" })} value={data.environment} onChange={(environment) => setData({ ...data, environment: environment as OnboardingData["environment"] })} options={[["gym", t({ ru: "Полный зал", en: "Full gym" }), t({ ru: "Штанга, скамья, гантели, резина", en: "Barbell, bench, dumbbells, bands" })], ["home", t({ ru: "Дом", en: "Home" }), t({ ru: "Резина, гантели, собственный вес", en: "Bands, dumbbells, bodyweight" })], ["outdoors", t({ ru: "Улица", en: "Outdoors" }), t({ ru: "Открытое место и минимальный инвентарь", en: "Open space and minimal equipment" })]]} />}
          {step === 2 && <ChoiceStep eyebrow={t({ ru: "Главная цель", en: "Primary focus" })} title={t({ ru: "ЧТО НУЖНО РАЗВИТЬ СЕЙЧАС?", en: "WHAT NEEDS WORK NOW?" })} value={data.focus} onChange={(focus) => setData({ ...data, focus: focus as OnboardingData["focus"] })} options={[["strength", t({ ru: "Сила", en: "Strength" }), t({ ru: "Больше управляемой силы", en: "More controlled force" })], ["conditioning", t({ ru: "Выносливость", en: "Conditioning" }), t({ ru: "Сохранять работу под усталостью", en: "Hold output under fatigue" })], ["power", t({ ru: "Взрывность", en: "Explosiveness" }), t({ ru: "Быстро производить силу", en: "Produce force quickly" })], ["general", t({ ru: "Общая атлетичность", en: "General athleticism" }), t({ ru: "Сбалансированный путь", en: "A balanced pathway" })]]} />}
          {step === 3 && <div><ShieldCheck size={38} className="text-[var(--steel)]" /><span className="eyebrow mt-7 block">{t({ ru: "Перед первой тренировкой", en: "Before your first session" })}</span><h1 className="mt-4 max-w-3xl font-display text-[clamp(3rem,7vw,6rem)] leading-none">{t({ ru: "ТРЕНИРУЙСЯ В ПРЕДЕЛАХ СВОИХ ВОЗМОЖНОСТЕЙ.", en: "TRAIN WITHIN YOUR ABILITIES." })}</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">{t({ ru: "Платформа даёт общую информацию о фитнесе. Это не медицинская помощь и не реабилитация. При травмах, симптомах или сомнениях поговори с квалифицированным специалистом.", en: "This platform provides general fitness education. It is not medical care or rehabilitation. If you have injuries, symptoms, or concerns, speak with an appropriate qualified professional." })}</p><label className="mt-8 flex max-w-2xl cursor-pointer items-start gap-4 border border-[var(--line-strong)] bg-[var(--bg-panel)] p-5"><input type="checkbox" checked={data.accepted} onChange={(event) => setData({ ...data, accepted: event.target.checked })} className="mt-1 h-5 w-5" /><span>{t({ ru: "Я понимаю назначение программы и буду тренироваться в пределах своих возможностей.", en: "I understand the program's purpose and will train within my abilities." })}</span></label></div>}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--line)] pt-5">
          <button className="quiet-button" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}><ArrowLeft size={17} />{t({ ru: "Назад", en: "Back" })}</button>
          {step < 3 ? <button className="action-button" onClick={() => setStep((value) => Math.min(3, value + 1))}>{t({ ru: "Продолжить", en: "Continue" })}<ArrowRight size={17} /></button> : <Link href="/dashboard" aria-disabled={!data.accepted} tabIndex={data.accepted ? 0 : -1} onClick={(event) => { if (!data.accepted) event.preventDefault(); else complete(); }} className={`action-button ${data.accepted ? "" : "pointer-events-none opacity-40"}`}><Check size={17} />{t({ ru: "Открыть программу", en: "Enter the program" })}</Link>}
        </div>
      </section>
    </main></>
  );
}

function ChoiceStep({ eyebrow, title, value, onChange, options }: { eyebrow: string; title: string; value: string; onChange: (value: string) => void; options: string[][] }) {
  return <div><span className="eyebrow">{eyebrow}</span><h1 className="mt-4 max-w-3xl font-display text-[clamp(3rem,7vw,6rem)] leading-none">{title}</h1><div className="mt-9 grid gap-3 sm:grid-cols-2">{options.map(([id, label, description]) => <button key={id} onClick={() => onChange(id)} className={`group min-h-28 border p-5 text-left transition-colors ${value === id ? "border-[var(--oxblood-bright)] bg-[var(--oxblood-deep)]/30" : "border-[var(--line-strong)] bg-[var(--bg-panel)] hover:border-[var(--steel-deep)]"}`} aria-pressed={value === id}><span className="flex items-center justify-between font-display text-2xl">{label}{value === id && <Check size={20} className="text-[var(--oxblood-bright)]" />}</span><span className="mt-2 block text-sm text-[var(--ink-mute)]">{description}</span></button>)}</div></div>;
}
