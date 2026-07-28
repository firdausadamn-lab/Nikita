"use client";

import { LocaleLink as Link } from "@/content/i18n";
import { useState } from "react";
import { ArrowDown, ArrowRight, Check, Play } from "@phosphor-icons/react";
import { useLang } from "@/content/i18n";
import { curriculum, faqs, methodBlocks, platform } from "@/content/platform";
import { track } from "@/lib/analytics";
import { PublicFooter, PublicHeader } from "./site-chrome";
import { PathwayFinder } from "./pathway-finder";
import { CinematicImage } from "./cinematic-image";
import { HomeExpansion } from "./home-expansion";

export function PlatformHome() {
  const { t } = useLang();
  return (
    <main id="main-content">
      <PublicHeader />
      <section className="relative min-h-[100dvh] overflow-hidden pt-[4.5rem]">
        <div className="absolute inset-0"><CinematicImage src="/hero.jpg" alt={t({ ru: "Борец в греко-римской схватке", en: "Greco-Roman wrestler in competition" })} priority parallax={70} objectPosition="center 25%" className="h-full w-full" /></div>
        <div className="hero-scrim absolute inset-0" />
        <div className="shell relative z-10 grid min-h-[calc(100dvh-4.5rem)] items-end gap-8 pb-12 pt-20 lg:grid-cols-[1.25fr_.75fr] lg:pb-16">
          <div>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-[var(--oxblood-bright)]" /><span className="eyebrow text-[var(--ink-soft)]">{t({ ru: "Греко-римская сила и подготовка", en: "Greco-Roman strength & conditioning" })}</span></div>
            <h1 className="font-display text-[clamp(4.3rem,14vw,11rem)] leading-[.82] tracking-[-.03em]">
              {t({ ru: "СИЛА", en: "STRENGTH" })}<br /><span className="text-[var(--oxblood-bright)]">{t({ ru: "ОБРЕЛА", en: "HAS A" })}</span><br />{t({ ru: "ДОМ.", en: "HOME." })}
            </h1>
          </div>
          <div className="max-w-lg lg:pb-2">
            <p className="text-lg leading-relaxed text-[var(--ink-soft)]">{t({ ru: "Развивай функциональную силу, взрывную мощность и дисциплину борца через систему, которая встречает тебя на твоём уровне.", en: "Build functional strength, explosive power, and a wrestler's discipline through a system designed to meet you at your level." })}</p>
            <div className="mt-8 flex flex-wrap gap-3"><Link href="/" className="action-button" onClick={() => track("hero_cta_clicked")}><span>{t({ ru: "Войти в программу", en: "Enter the program" })}</span><ArrowRight size={18} /></Link><Link href="/method" className="quiet-button">{t({ ru: "Изучить метод", en: "Explore the method" })}</Link></div>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line-strong)] pt-5"><HeroFact value="08" label={t({ ru: "недель", en: "weeks" })} /><HeroFact value="03" label={t({ ru: "пути", en: "pathways" })} /><HeroFact value="12" label={t({ ru: "лет опыта*", en: "years on mat*" })} /></div>
          </div>
        </div>
        <a href="#promise" className="absolute bottom-5 right-[4vw] z-10 hidden items-center gap-2 font-mono text-[.64rem] uppercase tracking-[.18em] text-[var(--ink-mute)] md:flex">{t({ ru: "Вниз", en: "Enter" })}<ArrowDown size={15} /></a>
      </section>

      <section id="promise" className="section border-y border-[var(--line)] bg-[var(--bg-raise)]"><div className="shell grid gap-12 lg:grid-cols-[.72fr_1.28fr]"><div><span className="eyebrow">{t({ ru: "Не набор упражнений", en: "Not a collection of exercises" })}</span><p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--ink-mute)]">{t({ ru: "Программа соединяет план, обучение, питание и прогрессию в одну систему.", en: "Training, instruction, nutrition, and progression work as one system." })}</p></div><h2 className="font-display text-[clamp(2.8rem,7vw,6rem)] leading-[.95]">{t({ ru: "ТЕЛО УЧИТСЯ СОЗДАВАТЬ СИЛУ, ПРИНИМАТЬ СИЛУ И ДВИГАТЬСЯ КАК ОДНО ЦЕЛО.", en: "THE BODY LEARNS TO PRODUCE FORCE, RESIST FORCE, AND MOVE AS ONE." })}</h2></div></section>

      <section className="section" aria-labelledby="method-heading"><div className="shell"><div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><span className="eyebrow">{t({ ru: "Метод", en: "The method" })}</span><div className="rule-accent mt-5" /></div><h2 id="method-heading" className="font-display text-[clamp(3rem,8vw,7rem)] leading-none">{t({ ru: "ТРИ БЛОКА. ОДНО ТЕЛО.", en: "THREE BLOCKS. ONE BODY." })}</h2></div><div className="mt-14 border-t border-[var(--line-strong)]">{methodBlocks.map((block) => <article key={block.number} className="method-row"><span className="font-mono text-sm text-[var(--oxblood-bright)]">{block.number}</span><div><span className="eyebrow">{t(block.eyebrow)}</span><h3 className="mt-2 font-display text-4xl md:text-6xl">{t(block.title)}</h3></div><p className="max-w-md leading-relaxed text-[var(--ink-soft)]">{t(block.body)}</p></article>)}</div><div className="mt-10 flex flex-col justify-between gap-6 border border-[var(--line-strong)] bg-[var(--bg-panel)] p-6 sm:flex-row sm:items-center md:p-8"><div><span className="eyebrow">04 · {t({ ru: "Прогрессия", en: "Progression" })}</span><p className="mt-2 font-display text-2xl">{t({ ru: "Заработай следующий уровень.", en: "Earn the next level." })}</p></div><Link href="/method" className="quiet-button">{t({ ru: "Как растёт нагрузка", en: "See how loading grows" })}</Link></div></div></section>

      <section className="section border-y border-[var(--line)] bg-[var(--bg-raise)]"><div className="shell"><PathwayFinder /></div></section>

      <HomeExpansion />

      <section className="section"><div className="shell grid gap-16 lg:grid-cols-[.82fr_1.18fr]"><div className="lg:sticky lg:top-28 lg:self-start"><span className="eyebrow">{t({ ru: "Внутри программы", en: "Inside the program" })}</span><h2 className="mt-5 font-display text-[clamp(3rem,7vw,6rem)] leading-none">{t({ ru: "РАБОТА ИМЕЕТ ПОРЯДОК.", en: "THE WORK HAS AN ORDER." })}</h2><p className="mt-6 max-w-md leading-relaxed text-[var(--ink-soft)]">{t({ ru: "Каждый урок ведёт к следующему. Бесплатные превью показывают систему, не раскрывая платный материал.", en: "Each lesson prepares the next. Free previews show the system without exposing paid instruction." })}</p></div><div className="border-t border-[var(--line-strong)]">{curriculum.map(([num, title, meta, preview]) => <CurriculumRow key={num} num={num} title={t(title)} meta={meta} preview={preview} />)}</div></div></section>

      <section className="relative overflow-hidden border-y border-[var(--line)] py-[clamp(6rem,16vh,11rem)]"><div className="absolute inset-0 opacity-45"><CinematicImage src="/portrait.jpg" alt={t({ ru: "Никита в тренировочном зале", en: "Nikita in the training room" })} parallax={40} className="h-full w-full" /></div><div className="hero-scrim absolute inset-0" /><div className="shell relative z-10 grid gap-12 lg:grid-cols-[1fr_.7fr]"><div><span className="eyebrow">{t({ ru: "Место, куда возвращаются", en: "A place to return to" })}</span><h2 className="mt-5 max-w-4xl font-display text-[clamp(3.2rem,9vw,8rem)] leading-[.9]">{t({ ru: "КОВЁР ЖЁСТКИЙ. И ВСЁ ЖЕ ЭТО ДОМ.", en: "THE MAT IS HARD. IT IS ALSO HOME." })}</h2></div><div className="self-end"><p className="text-lg leading-relaxed text-[var(--ink-soft)]">{t({ ru: "Ты возвращаешься в ту же комнату, повторяешь те же движения и встречаешь то же сопротивление. Со временем комната меняет тебя.", en: "You return to the same room, repeat the same movements, and meet the same resistance. Over time, the room changes you." })}</p><p className="mt-6 border-t border-[var(--line-strong)] pt-5 font-mono text-xs uppercase tracking-[.14em] text-[var(--ink-mute)]">{t(platform.athlete.philosophy)} · Nikita</p></div></div></section>

      <section className="section" id="enter"><div className="shell grid gap-10 lg:grid-cols-[1fr_.9fr]"><div><span className="eyebrow">{t({ ru: "Вход в программу", en: "Enter the program" })}</span><h2 className="mt-5 font-display text-[clamp(3.2rem,8vw,7rem)] leading-none">{t({ ru: "ТЕБЕ НЕ НУЖНО БЫТЬ ГОТОВЫМ.", en: "YOU DO NOT NEED TO FEEL READY." })}</h2><p className="mt-6 max-w-xl text-lg text-[var(--ink-soft)]">{t({ ru: "Тебе нужно место, чтобы начать.", en: "You need a place to begin." })}</p></div><div className="pricing-panel"><span className="eyebrow">{t(platform.product.accessType)}</span><p className="mt-4 font-display text-4xl">{t(platform.product.name)}</p><p className="mt-2 text-[var(--ink-soft)]">{t(platform.product.subtitle)}</p><ul className="my-8 space-y-3">{[t({ ru: "8-недельный план", en: "8-week training plan" }), t({ ru: "Видео и замены упражнений", en: "Video instruction and substitutions" }), t({ ru: "Питание и восстановление", en: "Nutrition and recovery resources" }), t({ ru: "Инструменты прогресса", en: "Progress tools" })].map((item) => <li className="flex gap-3" key={item}><Check size={19} className="mt-0.5 text-[var(--oxblood-bright)]" />{item}</li>)}</ul><Link href="/" className="action-button mt-6 w-full justify-center">{t({ ru: "Войти по паролю", en: "Enter with password" })}</Link><p className="mt-4 text-center text-xs text-[var(--ink-mute)]">{t({ ru: "Доступ по паролю программы.", en: "Access is granted with the program password." })}</p></div></div></section>

      <section className="section border-t border-[var(--line)] bg-[var(--bg-raise)]"><div className="shell grid gap-12 lg:grid-cols-[.6fr_1.4fr]"><div><span className="eyebrow">FAQ</span><h2 className="mt-4 font-display text-5xl">{t({ ru: "ПЕРЕД СТАРТОМ", en: "BEFORE YOU BEGIN" })}</h2></div><div className="border-t border-[var(--line-strong)]">{faqs.map((item) => <FaqItem key={t(item.q)} question={t(item.q)} answer={t(item.a)} />)}<Link href="/faq" className="quiet-button mt-8">{t({ ru: "Все вопросы", en: "Read all questions" })}</Link></div></div></section>
      <PublicFooter />
    </main>
  );
}

function HeroFact({ value, label }: { value: string; label: string }) { return <div><span className="font-display text-3xl md:text-4xl">{value}</span><span className="mt-1 block font-mono text-[.6rem] uppercase tracking-[.12em] text-[var(--ink-mute)]">{label}</span></div>; }
function CurriculumRow({ num, title, meta, preview }: { num: string; title: string; meta: string; preview: boolean }) { const [open, setOpen] = useState(false); return <article className="border-b border-[var(--line)]"><button className="grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-5 text-left" onClick={() => setOpen((value) => !value)} aria-expanded={open}><span className="font-mono text-xs text-[var(--ink-mute)]">{num}</span><span className="font-display text-xl md:text-2xl">{title}</span><span className="flex items-center gap-2 font-mono text-[.62rem] uppercase tracking-[.1em] text-[var(--ink-mute)]">{preview && <Play size={14} />} {meta}</span></button>{open && <p className="pb-5 pl-[3.25rem] text-sm leading-relaxed text-[var(--ink-soft)]">{preview ? "Preview available. Learn the purpose, setup, and completion standard for this module." : "Included with program access. The lesson contains coaching cues, demonstrations, and progress checks."}</p>}</article>; }
function FaqItem({ question, answer }: { question: string; answer: string }) { const [open, setOpen] = useState(false); return <div className="border-b border-[var(--line)]"><button onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-5 py-5 text-left font-display text-xl" aria-expanded={open}><span>{question}</span><span aria-hidden className="font-sans text-[var(--oxblood-bright)]">{open ? "−" : "+"}</span></button>{open && <p className="max-w-2xl pb-6 leading-relaxed text-[var(--ink-soft)]">{answer}</p>}</div>; }
