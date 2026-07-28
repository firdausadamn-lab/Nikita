"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowsClockwise, Quotes } from "@phosphor-icons/react";
import { useLang } from "@/content/i18n";
import {
  entries,
  moodLabels,
  type DiaryEntry,
  type DiaryMood,
} from "@/content/diary";

const SEEN_KEY = "wrestlers-home.diary.v1";
const MOODS: (DiaryMood | "any")[] = ["any", "empty", "heavy", "doubt", "steady"];

/**
 * The retention feature.
 *
 * The trap with motivational writing is that it is read once. So the page
 * never opens on the same entry twice: it remembers which entries this device
 * has already seen and draws from the unseen pile first, resetting only once
 * everything has been read. The draw happens after mount, never during render,
 * so the server and client markup still agree.
 */
export function MotivationDiary() {
  const { t, locale } = useLang();
  const [mood, setMood] = useState<DiaryMood | "any">("any");
  const [current, setCurrent] = useState<DiaryEntry | null>(null);
  const [seen, setSeen] = useState<string[]>([]);
  const [turning, setTurning] = useState(false);

  const draw = useCallback(
    (from: DiaryEntry[], alreadySeen: string[], avoid?: string) => {
      if (from.length === 0) return null;

      let unseen = from.filter(
        (e) => !alreadySeen.includes(e.id) && e.id !== avoid,
      );
      // Everything has been read: start the rotation over, but never repeat
      // the entry currently on screen.
      if (unseen.length === 0) {
        unseen = from.filter((e) => e.id !== avoid);
      }
      if (unseen.length === 0) unseen = from;

      return unseen[Math.floor(Math.random() * unseen.length)];
    },
    [],
  );

  // First paint: restore what this device has read, then draw.
  useEffect(() => {
    let stored: string[] = [];
    try {
      const raw = window.localStorage.getItem(SEEN_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { seen?: string[] };
        if (Array.isArray(parsed.seen)) stored = parsed.seen;
      }
    } catch {
      stored = [];
    }

    setSeen(stored);
    setCurrent(draw(entries, stored));
  }, [draw]);

  // Remember an entry once it is on screen.
  useEffect(() => {
    if (!current) return;
    setSeen((previous) => {
      if (previous.includes(current.id)) return previous;
      const next = [...previous, current.id];
      try {
        window.localStorage.setItem(SEEN_KEY, JSON.stringify({ seen: next }));
      } catch {
        // Private browsing: the rotation still works for this session.
      }
      return next;
    });
  }, [current]);

  function next(nextMood: DiaryMood | "any" = mood) {
    const from =
      nextMood === "any" ? entries : entries.filter((e) => e.mood === nextMood);
    const picked = draw(from, seen, current?.id);
    if (!picked) return;

    setTurning(true);
    setCurrent(picked);
    window.setTimeout(() => setTurning(false), 40);
  }

  const readCount = seen.length;

  return (
    <>
      <header className="mb-9">
        <span className="eyebrow">{t({ ru: "Дневник", en: "The diary" })}</span>
        <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.95]">
          {t({
            ru: "КОГДА НЕ ХОЧЕТСЯ ИДТИ.",
            en: "FOR THE DAYS YOU DO NOT WANT TO GO.",
          })}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--ink-soft)]">
          {t({
            ru: "Короткие записи из моей головы — не цитаты, а то, что я говорю себе сам. Прочитай одну и иди тренироваться. Каждый раз здесь будет другая.",
            en: "Short entries from my own head — not quotes, but the things I say to myself. Read one and go and train. There will be a different one each time.",
          })}
        </p>
      </header>

      <div
        className="diary-moods"
        role="group"
        aria-label={t({ ru: "Как ты себя чувствуешь", en: "How you feel today" })}
      >
        {MOODS.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setMood(value);
              next(value);
            }}
            aria-pressed={mood === value}
            className={`choice-chip ${mood === value ? "choice-chip-active" : ""}`}
          >
            {t(moodLabels[value])}
          </button>
        ))}
      </div>

      {current ? (
        <article className={`diary-card ${turning ? "is-turning" : ""}`}>
          <Quotes
            size={30}
            weight="fill"
            className="diary-quote"
            aria-hidden="true"
          />

          <div className="diary-meta">
            <time dateTime={current.date}>
              {new Date(current.date + "T00:00:00").toLocaleDateString(
                locale === "ru" ? "ru-RU" : "en-GB",
                { day: "numeric", month: "long", year: "numeric" },
              )}
            </time>
            <span className="diary-mood-tag">{t(moodLabels[current.mood])}</span>
          </div>

          <h2 className="diary-title">{t(current.title)}</h2>

          <div className="diary-body">
            {current.body.map((paragraph, index) => (
              <p key={index}>{t(paragraph)}</p>
            ))}
          </div>

          <footer className="diary-foot">
            <button type="button" onClick={() => next()} className="action-button">
              <ArrowsClockwise size={17} aria-hidden="true" />
              {t({ ru: "Ещё одну", en: "Another one" })}
            </button>
            <span className="diary-progress">
              {t({ ru: "Прочитано", en: "Read" })} {readCount} / {entries.length}
            </span>
          </footer>
        </article>
      ) : (
        // Pre-hydration state. Never blank.
        <article className="diary-card diary-card-empty">
          <p className="diary-body">
            {t({ ru: "Открываю запись…", en: "Opening an entry…" })}
          </p>
        </article>
      )}

      <section className="mt-14">
        <div className="flex items-baseline justify-between border-b border-[var(--line-strong)] pb-4">
          <h2 className="font-display text-2xl">
            {t({ ru: "Все записи", en: "All entries" })}
          </h2>
          <span className="font-mono text-[.62rem] uppercase tracking-[.14em] text-[var(--ink-mute)]">
            {entries.length} {t({ ru: "записей", en: "entries" })}
          </span>
        </div>

        <ul className="diary-index">
          {entries.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => {
                  setCurrent(entry);
                  setTurning(true);
                  window.setTimeout(() => setTurning(false), 40);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="diary-index-row"
                aria-current={current?.id === entry.id ? "true" : undefined}
              >
                <time dateTime={entry.date} className="diary-index-date">
                  {entry.date.slice(5).replace("-", ".")}
                </time>
                <span className="diary-index-title">{t(entry.title)}</span>
                <span className="diary-index-mood">
                  {t(moodLabels[entry.mood])}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
