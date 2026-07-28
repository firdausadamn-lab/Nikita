"use client";

import { LocaleLink as Link } from "@/content/i18n";
import { AccountPanel } from "./account-panel";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Barbell,
  BookOpen,
  BowlFood,
  Brain,
  Check,
  Clock,
  Fire,
  FirstAidKit,
  Gauge,
  House,
  Info,
  List,
  MoonStars,
  NotePencil,
  Pill,
  Play,
  Question,
  ShieldCheck,
  SquaresFour,
  TrendUp,
  X,
  type Icon,
} from "@phosphor-icons/react";
import { useLang } from "@/content/i18n";
import {
  exerciseLibrary,
  findExercise,
  findWorkout,
  programWeeks,
  type ProgramWorkout,
} from "@/content/training-program";
import { LanguageToggle } from "./language-toggle";
import { PlatformStyle } from "./platform-style";
import { ReferenceView } from "./reference-view";
import { MotivationDiary } from "./motivation-diary";
import {
  injury,
  injurySafety,
  nutrition,
  nutritionSafety,
  recovery,
} from "@/content/reference";
import {
  faq,
  mindset,
  myofascial,
  sauna,
  saunaSafety,
  supplements,
  supplementSafety,
  tracking,
} from "@/content/reference-extra";

export type TrainingView =
  | "home"
  | "program"
  | "week"
  | "workout"
  | "exercises"
  | "nutrition"
  | "supplements"
  | "recovery"
  | "sauna"
  | "mobility"
  | "injury"
  | "mindset"
  | "diary"
  | "progress"
  | "faq"
  | "resources"
  | "settings"
  | "support";

/**
 * The sidebar, grouped. Flat, this list would be thirteen items of equal
 * weight; grouped, an athlete looking for "what do I eat after training"
 * scans one heading instead of thirteen labels.
 */
type NavItem = readonly [
  href: string,
  view: TrainingView,
  icon: Icon,
  label: { ru: string; en: string },
];

type NavGroup = {
  id: string;
  label: { ru: string; en: string };
  items: readonly NavItem[];
};

const navGroups: readonly NavGroup[] = [
  {
    id: "train",
    label: { ru: "Тренировки", en: "Training" },
    items: [
      ["/", "home", House, { ru: "Сегодня", en: "Today" }],
      ["/training/program", "program", SquaresFour, { ru: "Программа", en: "Program" }],
      ["/training/exercises", "exercises", Barbell, { ru: "Упражнения", en: "Exercises" }],
    ],
  },
  {
    id: "fuel",
    label: { ru: "Питание", en: "Fuel" },
    items: [
      ["/training/nutrition", "nutrition", BowlFood, { ru: "Питание", en: "Nutrition" }],
      ["/training/supplements", "supplements", Pill, { ru: "Добавки", en: "Supplements" }],
    ],
  },
  {
    id: "recover",
    label: { ru: "Восстановление", en: "Recovery" },
    items: [
      ["/training/recovery", "recovery", MoonStars, { ru: "Восстановление", en: "Recovery" }],
      ["/training/sauna", "sauna", Fire, { ru: "Баня", en: "Sauna" }],
      ["/training/mobility", "mobility", Gauge, { ru: "Ролл и мяч", en: "Roller & ball" }],
      ["/training/injury", "injury", FirstAidKit, { ru: "Травмы", en: "Injury" }],
    ],
  },
  {
    id: "mind",
    label: { ru: "Голова", en: "Mind" },
    items: [
      ["/training/mindset", "mindset", Brain, { ru: "Дисциплина", en: "Discipline" }],
      ["/training/diary", "diary", NotePencil, { ru: "Дневник", en: "Diary" }],
    ],
  },
  {
    id: "track",
    label: { ru: "Прогресс", en: "Progress" },
    items: [
      ["/training/progress", "progress", TrendUp, { ru: "Замеры", en: "Measurements" }],
      ["/training/faq", "faq", Question, { ru: "Вопросы", en: "Questions" }],
    ],
  },
];

/** Flat list, for the mobile bar and the active-state lookup. */
const navItems = navGroups.flatMap((group) => group.items);

type StoredProgress = Record<string, { completedIds: string[]; completedAt?: string; note?: string }>;
const PROGRESS_KEY = "wrestlers-home.progress.v1";

export function TrainingProduct({ view }: { view: TrainingView }) {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <><PlatformStyle /><div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--ink)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-[var(--line)] bg-[var(--bg-raise)] p-5 lg:flex lg:flex-col">
        <Link href="/" className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center border border-[var(--line-strong)] font-display">WH</span><span><span className="block font-display text-lg">{t({ ru: "ДОМ БОРЦА", en: "WRESTLER'S HOME" })}</span><span className="block font-mono text-[.55rem] uppercase tracking-[.15em] text-[var(--oxblood-bright)]">8-WEEK PROGRAM</span></span></Link>
        <nav className="mt-9" aria-label="Training program navigation">
          {navGroups.map((group) => (
            <div key={group.id} className="nav-group">
              <span className="nav-group-label">{t(group.label)}</span>
              {group.items.map(([href, id, Icon, label]) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={view === id ? "page" : undefined}
                  className={`member-nav-link ${view === id || (view === "week" && id === "program") || (view === "workout" && id === "program") ? "member-nav-link-active" : ""}`}
                >
                  <Icon size={19} />
                  {t(label)}
                </Link>
              ))}
            </div>
          ))}
        </nav>
        <div className="mt-auto border-t border-[var(--line)] pt-5"><p className="font-mono text-[.58rem] uppercase tracking-[.13em] text-[var(--ink-mute)]">{t({ ru: "Текущая фаза", en: "Current phase" })}</p><p className="mt-2 font-display text-xl">01 · {t({ ru: "Фундамент", en: "Foundation" })}</p><div className="progress-track mt-4"><div className="progress-fill w-[31%]" /></div><Link href="/welcome" className="mt-6 block text-xs text-[var(--ink-mute)] underline">{t({ ru: "О программе", en: "About the program" })}</Link></div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-[4.5rem] items-center justify-between border-b border-[var(--line)] bg-[color:rgba(11,10,9,.94)] px-4 backdrop-blur-md md:px-8">
          <button className="grid h-11 w-11 place-items-center lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open program navigation"><List size={25} /></button>
          <div className="hidden items-center gap-3 lg:flex"><span className="h-2 w-2 rounded-full bg-[var(--oxblood-bright)]" /><span className="font-mono text-[.62rem] uppercase tracking-[.14em] text-[var(--ink-mute)]">{t({ ru: "Неделя 03 · Силовая база", en: "Week 03 · Strength foundation" })}</span></div>
          <Link href="/" className="font-display text-lg lg:hidden">WH · PROGRAM</Link>
          <div className="flex items-center gap-3"><LanguageToggle /><span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line-strong)] font-display text-sm">A</span></div>
        </header>

        <main id="main-content" className="mx-auto w-[min(1120px,calc(100%-2rem))] pb-28 pt-8 md:w-[min(1120px,92%)] md:pt-12">
          {view === "home" && <TrainingHome />}
          {view === "program" && <ProgramView />}
          {view === "week" && <WeekView />}
          {view === "workout" && <WorkoutView />}
          {view === "exercises" && <ExercisesView />}
          {view === "nutrition" && (
            <ReferenceView section={nutrition} safety={nutritionSafety} />
          )}
          {view === "supplements" && (
            <ReferenceView section={supplements} safety={supplementSafety} />
          )}
          {view === "recovery" && <ReferenceView section={recovery} />}
          {view === "sauna" && (
            <ReferenceView section={sauna} safety={saunaSafety} />
          )}
          {view === "mobility" && <ReferenceView section={myofascial} />}
          {view === "injury" && (
            <ReferenceView section={injury} safety={injurySafety} />
          )}
          {view === "mindset" && <ReferenceView section={mindset} />}
          {view === "diary" && <MotivationDiary />}
          {view === "faq" && <ReferenceView section={faq} />}
          {view === "progress" && (
            <>
              <ProgressView />
              <div className="mt-20 border-t border-[var(--line-strong)] pt-14">
                <ReferenceView section={tracking} />
              </div>
            </>
          )}
          {view === "resources" && <ResourcesView />}
          {view === "settings" && <SettingsView />}
          {view === "support" && <SupportView />}
        </main>
      </div>

      <nav className="mobile-member-nav lg:hidden" aria-label="Mobile training navigation">{navItems.slice(0, 5).map(([href, id, Icon, label]) => <Link href={href} key={href} className={view === id ? "!text-[var(--ink)]" : ""}><Icon size={20} /><span>{t(label)}</span></Link>)}</nav>

      {menuOpen && <div className="fixed inset-0 z-50 bg-[var(--bg)] p-5 lg:hidden"><div className="flex items-center justify-between"><span className="font-display text-2xl">{t({ ru: "ДОМ БОРЦА", en: "WRESTLER'S HOME" })}</span><button className="grid h-11 w-11 place-items-center" onClick={() => setMenuOpen(false)} aria-label="Close program navigation"><X size={25} /></button></div><nav className="mt-10">{navItems.map(([href, , Icon, label]) => <Link onClick={() => setMenuOpen(false)} href={href} key={href} className="flex items-center gap-4 border-b border-[var(--line)] py-5 font-display text-3xl"><Icon size={24} />{t(label)}</Link>)}</nav><div className="mt-8 grid grid-cols-2 gap-3"><Link href="/training/resources" className="quiet-button justify-center">{t({ ru: "Материалы", en: "Resources" })}</Link><Link href="/training/support" className="quiet-button justify-center">{t({ ru: "Помощь", en: "Support" })}</Link></div></div>}
    </div></>
  );
}

function PageHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return <header className="mb-10 md:mb-14"><span className="eyebrow">{eyebrow}</span><h1 className="mt-4 max-w-5xl font-display text-[clamp(3rem,8vw,6.5rem)] leading-[.9]">{title}</h1>{body && <p className="mt-6 max-w-2xl text-base leading-relaxed text-[var(--ink-soft)] md:text-lg">{body}</p>}</header>;
}

function TrainingHome() {
  const { t } = useLang();
  const workout = programWeeks[2].workouts[0];
  const [readiness, setReadiness] = useState([3, 3, 3]);
  const adjusted = readiness.filter((score) => score <= 2).length >= 2;

  return <>
    <PageHeading eyebrow={t({ ru: "Сегодня · Среда", en: "Today · Wednesday" })} title={t({ ru: "СЕГОДНЯ РАБОТАЕМ ЧИСТО.", en: "TODAY, THE WORK STAYS CLEAN." })} body={t({ ru: "Твоя задача не сделать максимум. Твоя задача выполнить нужную работу в позиции, которую сможешь повторить на следующей неделе.", en: "Your job is not to do the most. It is to complete the required work in a position you can repeat next week." })} />

    <div className="grid gap-7 lg:grid-cols-[1.3fr_.7fr]">
      <article className="border border-[var(--line-strong)] bg-[var(--bg-panel)] p-6 md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-3"><span className="eyebrow">{t({ ru: "Следующая сессия", en: "Next session" })}</span><span className="inline-flex items-center gap-2 font-mono text-[.64rem] uppercase text-[var(--steel)]"><Clock size={16} />{workout.duration} MIN</span></div>
        <h2 className="mt-8 font-display text-4xl md:text-6xl">{t(workout.title)}</h2><p className="mt-4 max-w-xl leading-relaxed text-[var(--ink-soft)]">{t(workout.goal)}</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3"><MiniMetric label={t({ ru: "Блоки", en: "Blocks" })} value="03" /><MiniMetric label={t({ ru: "Упражнения", en: "Exercises" })} value={String(workout.blocks.reduce((total, block) => total + block.exercises.length, 0)).padStart(2, "0")} /><MiniMetric label={t({ ru: "Оборудование", en: "Equipment" })} value={String(workout.equipment.length).padStart(2, "0")} /></div>
        <Link href={`/training/workout/${workout.id}`} className="action-button mt-9"><Play size={18} weight="fill" />{t({ ru: "Начать сессию", en: "Start session" })}</Link>
      </article>

      <aside className="border border-[var(--line)] p-6">
        <span className="eyebrow">{t({ ru: "Проверка готовности", en: "Readiness check" })}</span><p className="mt-3 text-sm leading-relaxed text-[var(--ink-mute)]">{t({ ru: "Оцени сон, желание тренироваться и тяжесть тела.", en: "Rate sleep, willingness to train, and body heaviness." })}</p>
        <div className="mt-6 space-y-5">{[t({ ru: "Сон", en: "Sleep" }), t({ ru: "Желание", en: "Willingness" }), t({ ru: "Тело", en: "Body" })].map((label, index) => <Readiness key={label} label={label} value={readiness[index]} onChange={(value) => setReadiness((scores) => scores.map((score, scoreIndex) => scoreIndex === index ? value : score))} />)}</div>
        <div className={`mt-7 border p-4 text-sm leading-relaxed ${adjusted ? "border-[var(--oxblood-deep)] bg-[var(--oxblood-deep)]/20 text-[var(--ink-soft)]" : "border-[var(--line)] text-[var(--ink-mute)]"}`}><Gauge size={20} className="mb-2" />{adjusted ? t({ ru: "Сократи один подход в каждом упражнении. Сохрани технику и выйди свежим.", en: "Remove one set from each exercise. Keep the technique and leave fresh." }) : t({ ru: "Готовность стабильна. Выполняй план как написано.", en: "Readiness is steady. Follow the session as written." })}</div>
      </aside>
    </div>

    <section className="mt-12 grid gap-7 border-t border-[var(--line)] pt-8 md:grid-cols-3"><HomeLink href="/training/program" index="01" title={t({ ru: "Моя неделя", en: "My week" })} body={t({ ru: "2 из 3 сессий завершены", en: "2 of 3 sessions complete" })} /><HomeLink href="/training/recovery" index="02" title={t({ ru: "Восстановление", en: "Recovery" })} body={t({ ru: "Что делать между сессиями", en: "What to do between sessions" })} /><HomeLink href="/training/nutrition" index="03" title={t({ ru: "Питание", en: "Nutrition" })} body={t({ ru: "Топливо для силового дня", en: "Fuel for a strength day" })} /></section>
  </>;
}

function MiniMetric({ label, value }: { label: string; value: string }) { return <div className="border-t border-[var(--line)] pt-3"><span className="font-display text-3xl">{value}</span><span className="ml-2 font-mono text-[.58rem] uppercase tracking-[.1em] text-[var(--ink-mute)]">{label}</span></div>; }
function Readiness({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) { return <div><div className="mb-2 flex justify-between text-sm"><span>{label}</span><span className="font-mono text-[var(--steel)]">{value}/5</span></div><div className="grid grid-cols-5 gap-1">{[1,2,3,4,5].map((score) => <button key={score} onClick={() => onChange(score)} className={`h-9 border font-mono text-xs ${score === value ? "border-[var(--oxblood-bright)] bg-[var(--oxblood-deep)] text-[var(--ink)]" : "border-[var(--line)] text-[var(--ink-mute)]"}`} aria-label={`${label} ${score} out of 5`}>{score}</button>)}</div></div>; }
function HomeLink({ href, index, title, body }: { href: string; index: string; title: string; body: string }) { return <Link href={href} className="group"><span className="font-mono text-xs text-[var(--oxblood-bright)]">{index}</span><h2 className="mt-3 font-display text-3xl group-hover:text-[var(--oxblood-bright)]">{title}</h2><p className="mt-2 text-sm text-[var(--ink-mute)]">{body}</p></Link>; }

function ProgramView() {
  const { t } = useLang();
  return <><PageHeading eyebrow={t({ ru: "Восемь недель · 24 сессии", en: "Eight weeks · 24 sessions" })} title={t({ ru: "РАБОТА ИМЕЕТ ПОРЯДОК.", en: "THE WORK HAS AN ORDER." })} body={t({ ru: "Фаза 1 строит позиции. Фаза 2 соединяет силу и скорость. Фаза 3 учит сохранять качество под усталостью.", en: "Phase 1 builds positions. Phase 2 connects force and speed. Phase 3 preserves quality under fatigue." })} />
    <div className="mb-10 grid gap-px border border-[var(--line)] bg-[var(--line)] md:grid-cols-3"><Phase number="01" title={t({ ru: "Фундамент", en: "Foundation" })} weeks="1–3" /><Phase number="02" title={t({ ru: "Мощность", en: "Power" })} weeks="4–6" /><Phase number="03" title={t({ ru: "Закрепление", en: "Consolidate" })} weeks="7–8" /></div>
    <div className="border-t border-[var(--line-strong)]">{programWeeks.map((week) => <Link href={`/training/program/week/${week.number}`} key={week.number} className="group grid gap-3 border-b border-[var(--line)] py-6 sm:grid-cols-[4rem_1fr_auto] sm:items-center"><span className="font-display text-4xl text-[var(--line-strong)] group-hover:text-[var(--oxblood-bright)]">{String(week.number).padStart(2,"0")}</span><div><span className="font-mono text-[.58rem] uppercase tracking-[.12em] text-[var(--ink-mute)]">PHASE {week.phase} · {t(week.focus)}</span><h2 className="mt-2 font-display text-3xl">{t(week.title)}</h2><p className="mt-2 max-w-xl text-sm text-[var(--ink-mute)]">{t(week.intent)}</p></div><span className="font-mono text-[.62rem] uppercase text-[var(--steel)]">3 {t({ ru: "сессии", en: "sessions" })}</span></Link>)}</div>
  </>;
}
function Phase({ number, title, weeks }: { number: string; title: string; weeks: string }) { return <div className="bg-[var(--bg-panel)] p-5"><span className="font-mono text-xs text-[var(--oxblood-bright)]">{number}</span><p className="mt-3 font-display text-2xl">{title}</p><p className="mt-1 text-xs text-[var(--ink-mute)]">WEEKS {weeks}</p></div>; }

function WeekView() {
  const { t } = useLang(); const pathname = usePathname(); const number = Number(pathname.split("/").filter(Boolean).at(-1)) || 1; const week = programWeeks.find((item) => item.number === number) || programWeeks[0];
  return <><Link href="/training/program" className="mb-7 inline-flex items-center gap-2 text-sm text-[var(--ink-mute)]"><ArrowLeft size={16} />{t({ ru: "Все недели", en: "All weeks" })}</Link><PageHeading eyebrow={`PHASE ${week.phase} · WEEK ${String(week.number).padStart(2,"0")}`} title={t(week.title).toUpperCase()} body={t(week.intent)} />
    <div className="grid gap-5 md:grid-cols-3">{week.workouts.map((session) => <SessionCard key={session.id} session={session} />)}</div>
    <div className="mt-12 grid gap-8 border-y border-[var(--line)] py-8 md:grid-cols-2"><InfoBlock title={t({ ru: "Как прогрессировать", en: "How to progress" })} body={t(week.progression)} /><InfoBlock title={t({ ru: "Восстановление недели", en: "Recovery this week" })} body={t(week.recovery)} /></div>
  </>;
}
function SessionCard({ session }: { session: ProgramWorkout }) { const { t } = useLang(); return <article className="flex min-h-80 flex-col border border-[var(--line)] bg-[var(--bg-panel)] p-5"><div className="flex items-center justify-between"><span className="eyebrow">DAY {String(session.day).padStart(2,"0")}</span><span className="font-mono text-[.6rem] text-[var(--steel)]">{session.duration} MIN</span></div><h2 className="mt-7 font-display text-3xl">{t(session.title)}</h2><p className="mt-4 text-sm leading-relaxed text-[var(--ink-mute)]">{t(session.goal)}</p><div className="mt-auto pt-7"><Link href={`/training/workout/${session.id}`} className="action-button w-full justify-center">{t({ ru: "Открыть сессию", en: "Open session" })}<ArrowRight size={17} /></Link></div></article>; }
function InfoBlock({ title, body }: { title: string; body: string }) { return <div><h2 className="font-display text-2xl">{title}</h2><p className="mt-3 leading-relaxed text-[var(--ink-soft)]">{body}</p></div>; }

function WorkoutView() {
  const { t } = useLang(); const pathname = usePathname(); const id = pathname.split("/").filter(Boolean).at(-1) || "w3-strength-a"; const session = findWorkout(id) || programWeeks[2].workouts[0]; const prescriptions = session.blocks.flatMap((block) => block.exercises); const [progress, setProgress] = useStoredProgress(); const record = progress[session.id] || { completedIds: [] }; const [activeRest, setActiveRest] = useState<number | null>(null);
  useEffect(() => { if (activeRest === null || activeRest <= 0) return; const timer = window.setInterval(() => setActiveRest((value) => value === null ? null : value - 1), 1000); return () => window.clearInterval(timer); }, [activeRest]);
  const percent = Math.round((record.completedIds.length / prescriptions.length) * 100);
  const toggle = (exerciseId: string) => setProgress((current) => { const currentRecord = current[session.id] || { completedIds: [] }; const has = currentRecord.completedIds.includes(exerciseId); return { ...current, [session.id]: { ...currentRecord, completedIds: has ? currentRecord.completedIds.filter((item) => item !== exerciseId) : [...currentRecord.completedIds, exerciseId] } }; });
  const finish = () => setProgress((current) => ({ ...current, [session.id]: { ...(current[session.id] || { completedIds: [] }), completedIds: prescriptions.map((item) => item.exerciseId), completedAt: new Date().toISOString() } }));

  return <><Link href={`/training/program/week/${session.id.match(/^w(\d+)/)?.[1] || 3}`} className="mb-7 inline-flex items-center gap-2 text-sm text-[var(--ink-mute)]"><ArrowLeft size={16} />{t({ ru: "Вернуться к неделе", en: "Back to week" })}</Link>
    <div className="grid gap-8 lg:grid-cols-[1fr_16rem]"><PageHeading eyebrow={`DAY ${String(session.day).padStart(2,"0")} · ${session.duration} MIN`} title={t(session.title).toUpperCase()} body={t(session.goal)} /><div className="border border-[var(--line)] p-5"><span className="eyebrow">{t({ ru: "Выполнено", en: "Complete" })}</span><p className="mt-3 font-display text-5xl">{percent}%</p><div className="progress-track mt-4"><div className="progress-fill" style={{ width: `${percent}%` }} /></div><p className="mt-4 text-xs text-[var(--ink-mute)]">{record.completedIds.length} / {prescriptions.length} {t({ ru: "упражнений", en: "exercises" })}</p></div></div>

    <section className="mb-8 border-y border-[var(--line)] py-6"><div className="grid gap-7 md:grid-cols-[1fr_auto]"><div><span className="eyebrow">{t({ ru: "Разминка", en: "Warm-up" })}</span><ol className="mt-4 grid gap-2 text-sm text-[var(--ink-soft)] sm:grid-cols-2">{t(session.warmup).map((item, index) => <li key={item}>{String(index + 1).padStart(2,"0")} · {item}</li>)}</ol></div>{activeRest !== null && <div className="min-w-40 border border-[var(--oxblood-deep)] bg-[var(--oxblood-deep)]/15 p-4 text-center"><span className="eyebrow">{t({ ru: "Отдых", en: "Rest" })}</span><p className="mt-2 font-mono text-3xl tabular-nums">{String(Math.floor(activeRest/60)).padStart(2,"0")}:{String(activeRest%60).padStart(2,"0")}</p><button className="mt-2 text-xs underline" onClick={() => setActiveRest(null)}>{t({ ru: "Закрыть", en: "Dismiss" })}</button></div>}</div></section>

    {session.blocks.map((block, blockIndex) => <section key={block.title.en} className="mb-12"><div className="flex items-baseline gap-4 border-b border-[var(--line-strong)] pb-4"><span className="font-display text-4xl text-[var(--line-strong)]">{String(blockIndex + 1).padStart(2,"0")}</span><div><span className="eyebrow">{block.type}</span><h2 className="mt-1 font-display text-3xl">{t(block.title)}</h2></div></div>{block.exercises.map((item) => { const exercise = findExercise(item.exerciseId)!; const done = record.completedIds.includes(item.exerciseId); return <article key={item.exerciseId} className="grid gap-5 border-b border-[var(--line)] py-6 md:grid-cols-[1fr_auto]"><div><div className="flex flex-wrap items-start gap-3"><h3 className="font-display text-3xl">{t(exercise.name)}</h3><span className="border border-[var(--line)] px-2 py-1 font-mono text-[.55rem] uppercase text-[var(--ink-mute)]">{exercise.category}</span></div><p className="mt-3 font-mono text-xs uppercase tracking-[.1em] text-[var(--steel)]">{item.sets} × {t(item.reps)} · {item.restSeconds}s {item.tempo ? `· ${item.tempo}` : ""}</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><div><span className="eyebrow">{t({ ru: "Ключевые подсказки", en: "Key cues" })}</span><ul className="mt-3 space-y-1 text-sm text-[var(--ink-soft)]">{t(exercise.cues).map((cue) => <li key={cue}>· {cue}</li>)}</ul></div><div><span className="eyebrow">{t({ ru: "Если оборудования нет", en: "Equipment alternative" })}</span><p className="mt-3 text-sm text-[var(--ink-soft)]">{t(exercise.alternative)}</p></div></div><details className="mt-5 border-t border-[var(--line)] pt-4"><summary className="cursor-pointer text-sm text-[var(--ink-soft)]">{t({ ru: "Техника, ошибки и варианты", en: "Technique, mistakes, and variations" })}</summary><div className="mt-5 grid gap-6 text-sm md:grid-cols-3"><div><span className="eyebrow">{t({ ru: "Как выполнять", en: "How to perform" })}</span><ol className="mt-3 space-y-2 text-[var(--ink-soft)]">{t(exercise.instructions).map((step, index) => <li key={step}>{index + 1}. {step}</li>)}</ol></div><div><span className="eyebrow">{t({ ru: "Частые ошибки", en: "Common mistakes" })}</span><ul className="mt-3 space-y-2 text-[var(--ink-soft)]">{t(exercise.mistakes).map((mistake) => <li key={mistake}>· {mistake}</li>)}</ul></div><div><span className="eyebrow">{t({ ru: "Измени уровень", en: "Change the level" })}</span><p className="mt-3 text-[var(--ink-soft)]">{t({ ru: "Проще", en: "Easier" })}: {t(exercise.easier)}</p><p className="mt-2 text-[var(--ink-soft)]">{t({ ru: "Сложнее", en: "Harder" })}: {t(exercise.harder)}</p></div></div><div className="mt-5 flex gap-3 border border-[var(--line)] p-4 text-xs leading-relaxed text-[var(--ink-mute)]"><ShieldCheck size={18} className="shrink-0 text-[var(--steel)]" />{t(exercise.safety)}</div></details></div><div className="flex gap-2 md:flex-col"><button onClick={() => toggle(item.exerciseId)} className={`grid h-12 w-12 place-items-center border ${done ? "border-[var(--oxblood-bright)] bg-[var(--oxblood-deep)]" : "border-[var(--line-strong)]"}`} aria-label={`${done ? "Undo" : "Complete"} ${t(exercise.name)}`}><Check size={21} /></button><button onClick={() => setActiveRest(item.restSeconds)} className="grid h-12 w-12 place-items-center border border-[var(--line-strong)]" aria-label={`Start ${item.restSeconds} second rest`}><Clock size={20} /></button></div></article>; })}</section>)}

    <section className="border-y border-[var(--line)] py-6"><span className="eyebrow">{t({ ru: "Завершение", en: "Cooldown" })}</span><ul className="mt-4 grid gap-2 text-sm text-[var(--ink-soft)] sm:grid-cols-3">{t(session.cooldown).map((item) => <li key={item}>· {item}</li>)}</ul><div className="mt-6 flex gap-3 border border-[var(--line)] bg-[var(--bg-panel)] p-5"><NotePencil size={21} className="shrink-0 text-[var(--oxblood-bright)]" /><div><span className="eyebrow">{t({ ru: "Заметка Никиты", en: "Nikita's note" })}</span><p className="mt-2 leading-relaxed text-[var(--ink-soft)]">{t(session.coachNote)}</p></div></div></section>
    <button onClick={finish} disabled={record.completedIds.length !== prescriptions.length} className="action-button sticky bottom-20 mt-8 w-full justify-center disabled:cursor-not-allowed disabled:opacity-40 lg:bottom-5">{record.completedAt ? t({ ru: "Сессия завершена", en: "Session complete" }) : record.completedIds.length === prescriptions.length ? t({ ru: "Завершить и сохранить", en: "Finish and save" }) : t({ ru: `Осталось: ${prescriptions.length - record.completedIds.length}`, en: `${prescriptions.length - record.completedIds.length} remaining` })}</button>
  </>;
}

function useStoredProgress(): [StoredProgress, React.Dispatch<React.SetStateAction<StoredProgress>>] {
  const [progress, setProgress] = useState<StoredProgress>({});
  useEffect(() => { try { const saved = window.localStorage.getItem(PROGRESS_KEY); if (saved) setProgress(JSON.parse(saved)); } catch {} }, []);
  useEffect(() => { try { window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress)); } catch {} }, [progress]);
  return [progress, setProgress];
}

function ExercisesView() {
  const { t } = useLang(); const [query, setQuery] = useState(""); const [category, setCategory] = useState("all"); const filtered = exerciseLibrary.filter((item) => (category === "all" || item.category === category) && t(item.name).toLowerCase().includes(query.toLowerCase()));
  return <><PageHeading eyebrow={t({ ru: "Техника и замены", en: "Technique and substitutions" })} title={t({ ru: "БИБЛИОТЕКА ДВИЖЕНИЙ", en: "MOVEMENT LIBRARY" })} body={t({ ru: "Не просто название упражнения. Здесь есть установка, подсказки, ошибки, варианты и граница безопасности.", en: "More than an exercise name. Each entry includes setup, cues, mistakes, variations, and a safety boundary." })} />
    <div className="mb-8 grid gap-3 sm:grid-cols-[1fr_auto]"><input value={query} onChange={(event) => setQuery(event.target.value)} className="h-12 border border-[var(--line-strong)] bg-[var(--bg-panel)] px-4" placeholder={t({ ru: "Найти упражнение", en: "Find an exercise" })} /><div className="flex flex-wrap gap-2">{["all","strength","power","specific","conditioning","recovery"].map((item) => <button key={item} onClick={() => setCategory(item)} className={`choice-chip ${category === item ? "choice-chip-active" : ""}`}>{item}</button>)}</div></div>
    <div className="grid gap-px bg-[var(--line)] md:grid-cols-2">{filtered.map((exercise) => <article key={exercise.id} className="bg-[var(--bg-raise)] p-6"><div className="flex items-start justify-between gap-4"><div><span className="eyebrow">{exercise.category}</span><h2 className="mt-3 font-display text-3xl">{t(exercise.name)}</h2></div><Barbell size={25} className="text-[var(--steel)]" /></div><p className="mt-5 text-sm text-[var(--ink-mute)]">{exercise.equipment.join(" · ")}</p><details className="mt-6 border-t border-[var(--line)] pt-4"><summary className="cursor-pointer text-sm">{t({ ru: "Открыть инструкцию", en: "Open instruction" })}</summary><ol className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">{t(exercise.instructions).map((step, index) => <li key={step}>{index + 1}. {step}</li>)}</ol><div className="mt-5 border border-[var(--line)] p-4 text-xs text-[var(--ink-mute)]">{t(exercise.safety)}</div></details></article>)}</div>
  </>;
}

function ProgressView() {
  const { t } = useLang(); const [progress] = useStoredProgress(); const completed = Object.values(progress).filter((item) => item.completedAt).length; const total = programWeeks.flatMap((week) => week.workouts).length; const percentage = Math.round((completed / total) * 100);
  return <><PageHeading eyebrow={t({ ru: "Последовательность без вины", en: "Consistency without guilt" })} title={t({ ru: "СМОТРИ НА ТЕНДЕНЦИЮ.", en: "WATCH THE TREND." })} body={t({ ru: "Одна плохая сессия не определяет программу. Отмечай выполненную работу, нагрузку и технические наблюдения.", en: "One poor session does not define a program. Track completed work, load, and technical observations." })} />
    <div className="grid gap-7 lg:grid-cols-[.8fr_1.2fr]"><div className="border border-[var(--line)] p-7"><span className="eyebrow">{t({ ru: "Программа", en: "Program" })}</span><p className="mt-5 font-display text-7xl">{percentage}%</p><div className="progress-track mt-5"><div className="progress-fill" style={{ width: `${percentage}%` }} /></div><p className="mt-4 text-sm text-[var(--ink-mute)]">{completed} / {total} {t({ ru: "сессий завершено", en: "sessions completed" })}</p></div><div className="border-t border-[var(--line-strong)]">{programWeeks.map((week) => { const weekCompleted = week.workouts.filter((workout) => progress[workout.id]?.completedAt).length; return <div key={week.number} className="grid grid-cols-[3rem_1fr_auto] items-center border-b border-[var(--line)] py-4"><span className="font-mono text-xs text-[var(--ink-mute)]">W{String(week.number).padStart(2,"0")}</span><span className="font-display text-xl">{t(week.title)}</span><span className="font-mono text-[.6rem] text-[var(--steel)]">{weekCompleted}/3</span></div>; })}</div></div>
    <section className="mt-12"><h2 className="font-display text-3xl">{t({ ru: "Что стоит записывать", en: "What is worth logging" })}</h2><div className="mt-5 grid gap-5 md:grid-cols-3"><LogPrompt title={t({ ru: "Нагрузка", en: "Load" })} body={t({ ru: "Вес, повторения и запас в конце подхода.", en: "Load, reps, and reserve at the end of the set." })} /><LogPrompt title={t({ ru: "Техника", en: "Technique" })} body={t({ ru: "Одна подсказка, которая помогла, и одна ошибка.", en: "One cue that helped and one recurring mistake." })} /><LogPrompt title={t({ ru: "Восстановление", en: "Recovery" })} body={t({ ru: "Сон, общая тяжесть и необычные симптомы.", en: "Sleep, body heaviness, and unusual symptoms." })} /></div></section>
  </>;
}
function LogPrompt({ title, body }: { title: string; body: string }) { return <div className="border-t border-[var(--line)] pt-4"><h3 className="font-display text-2xl">{title}</h3><p className="mt-2 text-sm leading-relaxed text-[var(--ink-mute)]">{body}</p></div>; }

function ResourcesView() { const { t } = useLang(); return <><PageHeading eyebrow={t({ ru: "Справочник", en: "Reference" })} title={t({ ru: "ВОЗЬМИ ПЛАН С СОБОЙ.", en: "TAKE THE PLAN WITH YOU." })} /><div className="border-t border-[var(--line-strong)]">{[t({ ru: "8-недельный план", en: "Eight-week plan" }),t({ ru: "Журнал нагрузок", en: "Training load log" }),t({ ru: "Карта замен оборудования", en: "Equipment substitution map" }),t({ ru: "Памятка по восстановлению", en: "Recovery checklist" })].map((title, index) => <div key={title} className="grid grid-cols-[3rem_1fr_auto] items-center border-b border-[var(--line)] py-5"><span className="font-mono text-xs text-[var(--ink-mute)]">{String(index + 1).padStart(2,"0")}</span><span className="font-display text-2xl">{title}</span><span className="font-mono text-[.6rem] uppercase text-[var(--steel)]">PDF · {index + 2}.2 MB</span></div>)}</div></>; }
function SettingsView() { const { t } = useLang(); return <><PageHeading eyebrow={t({ ru: "Аккаунт", en: "Account" })} title={t({ ru: "НАСТРОЙКИ", en: "SETTINGS" })} /><AccountPanel /><form className="max-w-2xl space-y-6" onSubmit={(event) => event.preventDefault()}><label className="block">{t({ ru: "Имя", en: "Name" })}<input defaultValue="Alex" className="mt-2 h-12 w-full border border-[var(--line-strong)] bg-[var(--bg-panel)] px-4" /></label><label className="block">Email<input defaultValue="alex@example.com" type="email" className="mt-2 h-12 w-full border border-[var(--line-strong)] bg-[var(--bg-panel)] px-4" /></label><label className="flex gap-3"><input type="checkbox" defaultChecked /><span>{t({ ru: "Напоминать о запланированных сессиях", en: "Remind me about planned sessions" })}</span></label><button className="action-button">{t({ ru: "Сохранить", en: "Save settings" })}</button></form></>; }
function SupportView() { const { t } = useLang(); return <><PageHeading eyebrow={t({ ru: "Помощь", en: "Support" })} title={t({ ru: "НЕ ОСТАВАЙСЯ С ВОПРОСОМ.", en: "DO NOT STAY STUCK." })} body={t({ ru: "Помощь с доступом, пониманием упражнения или сообщением о технической проблеме.", en: "Get help with access, understanding an exercise, or reporting a technical problem." })} /><div className="grid gap-5 md:grid-cols-2"><a href="mailto:{{SUPPORT_EMAIL}}" className="border border-[var(--line)] p-6"><BookOpen size={28} /><h2 className="mt-5 font-display text-3xl">{t({ ru: "Написать в поддержку", en: "Contact support" })}</h2><p className="mt-3 text-sm text-[var(--ink-mute)]">{{ru:"CRAFT должен подтвердить адрес",en:"CRAFT must confirm the address"}[t({ru:"ru",en:"en"}) as "ru"|"en"]}</p></a><Link href="/training/exercises" className="border border-[var(--line)] p-6"><Info size={28} /><h2 className="mt-5 font-display text-3xl">{t({ ru: "Проверить технику", en: "Review technique" })}</h2><p className="mt-3 text-sm text-[var(--ink-mute)]">{t({ ru: "Инструкции, ошибки и замены", en: "Instructions, mistakes, and substitutions" })}</p></Link></div></>; }
