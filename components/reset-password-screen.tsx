"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useLang, type Localized } from "@/content/i18n";
import { ACCESS_PATH } from "@/lib/program-access";
import { PlatformStyle } from "./platform-style";
import { LanguageToggle } from "./language-toggle";

// ---------------------------------------------------------------------------
// Set a new password.
//
// Reached only from the emailed link, which /auth/callback has already turned
// into a session by the time this renders. So there is no email field and no
// "current password" field: owning the mailbox was the proof, and asking again
// would be theatre.
//
// Typed twice, because a password nobody can see is a password nobody can
// check — and the cost of a typo here is another round through the whole reset
// flow.
// ---------------------------------------------------------------------------

const MIN_PASSWORD = 8;

const copy = {
  eyebrow: { ru: "Восстановление доступа", en: "Account recovery" },
  title: { ru: "НОВЫЙ ПАРОЛЬ", en: "NEW PASSWORD" },
  body: {
    ru: "Задайте пароль, с которым будете входить дальше. Он заменит старый на всех устройствах.",
    en: "Choose the password you will sign in with from now on. It replaces the old one everywhere.",
  },
  password: { ru: "Новый пароль", en: "New password" },
  confirm: { ru: "Ещё раз", en: "Type it again" },
  hint: {
    ru: `Минимум ${MIN_PASSWORD} символов.`,
    en: `At least ${MIN_PASSWORD} characters.`,
  },
  submit: { ru: "Сохранить пароль", en: "Save password" },
  working: { ru: "Сохраняем…", en: "Saving…" },
  show: { ru: "Показать", en: "Show" },
  hide: { ru: "Скрыть", en: "Hide" },
  done: {
    ru: "Пароль обновлён. Открываем программу…",
    en: "Password updated. Opening the program…",
  },
  toLogin: { ru: "Вернуться ко входу", en: "Back to log in" },
  errors: {
    weak_password: {
      ru: `Пароль должен быть не короче ${MIN_PASSWORD} символов.`,
      en: `Your password needs at least ${MIN_PASSWORD} characters.`,
    },
    mismatch: {
      ru: "Пароли не совпадают.",
      en: "Those two passwords do not match.",
    },
    no_session: {
      ru: "Ссылка больше не действует. Запросите новую на странице входа.",
      en: "That link is no longer valid. Ask for a new one from the login page.",
    },
    update_failed: {
      ru: "Не удалось сохранить пароль. Попробуйте ещё раз.",
      en: "The password could not be saved. Try again.",
    },
    not_configured: {
      ru: "Доступ ещё не настроен. Напишите Никите.",
      en: "Access is not set up yet. Message Nikita.",
    },
    network: {
      ru: "Не удалось связаться с сервером. Попробуйте ещё раз.",
      en: "The server could not be reached. Try again.",
    },
  } as Record<string, Localized>,
};

type Status = "idle" | "working" | "error" | "done";

export function ResetPasswordScreen() {
  const { t, locale } = useLang();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  function reject(value: Localized) {
    setStatus("error");
    setMessage(t(value));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (status === "working" || status === "done") return;

    if (password.length < MIN_PASSWORD) {
      return reject(copy.errors.weak_password);
    }
    if (password !== confirm) return reject(copy.errors.mismatch);

    setStatus("working");
    setMessage("");

    try {
      const response = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        return reject(copy.errors[result?.error ?? ""] ?? copy.errors.network);
      }

      setStatus("done");
      setMessage(t(copy.done));

      // Updating the password keeps them signed in, so send them straight into
      // the program rather than making them log in with what they just typed.
      window.location.assign(`/${locale}`);
    } catch {
      reject(copy.errors.network);
    }
  }

  const working = status === "working";

  return (
    <>
      <PlatformStyle />
      <main className="access-shell">
        <section className="access-identity">
          <div className="access-mark">
            <span className="access-monogram" aria-hidden="true">
              {t({ ru: "ДБ", en: "WH" })}
            </span>
            <span>{t({ ru: "ДОМ БОРЦА", en: "THE WRESTLER'S HOME" })}</span>
          </div>

          <div className="access-statement">
            <span className="eyebrow">{t(copy.eyebrow)}</span>
            <h1 className="access-title">{t(copy.title)}</h1>
            <p className="access-body">{t(copy.body)}</p>
          </div>

          <p className="access-foot">
            {t({ ru: "Сила обрела дом.", en: "Strength has a home." })}
          </p>
        </section>

        <section className="access-panel">
          <div className="access-panel-top">
            <LanguageToggle />
          </div>

          <form onSubmit={submit} className="access-form" noValidate>
            <span className="access-index">RESET · 02</span>

            <div className="access-field">
              <div className="access-label-row">
                <label htmlFor="new-password" className="access-label">
                  {t(copy.password)}
                </label>
                <button
                  type="button"
                  className="access-reveal"
                  onClick={() => setRevealed((value) => !value)}
                >
                  {t(revealed ? copy.hide : copy.show)}
                </button>
              </div>
              <input
                id="new-password"
                name="password"
                type={revealed ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  if (status === "error") setStatus("idle");
                }}
                autoComplete="new-password"
                minLength={MIN_PASSWORD}
                aria-invalid={status === "error"}
                aria-describedby="new-password-hint"
                className="access-input access-input--text"
                autoFocus
              />
              <p id="new-password-hint" className="access-hint">
                {t(copy.hint)}
              </p>
            </div>

            <div className="access-field">
              <label htmlFor="confirm-password" className="access-label">
                {t(copy.confirm)}
              </label>
              <input
                id="confirm-password"
                name="confirm"
                type={revealed ? "text" : "password"}
                value={confirm}
                onChange={(event) => {
                  setConfirm(event.target.value);
                  if (status === "error") setStatus("idle");
                }}
                autoComplete="new-password"
                aria-invalid={status === "error"}
                className="access-input access-input--text"
              />
            </div>

            <button
              type="submit"
              className="action-button access-submit"
              disabled={working || status === "done"}
            >
              {working ? t(copy.working) : t(copy.submit)}
              {working ? null : <ArrowRight size={17} />}
            </button>

            {message && (
              <p
                role={status === "done" ? "status" : "alert"}
                className={status === "done" ? "access-sent" : "access-error"}
              >
                {message}
              </p>
            )}

            <p className="access-help">
              <a href={`/${locale}${ACCESS_PATH}`}>{t(copy.toLogin)}</a>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}
