"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight } from "@phosphor-icons/react";
import { useLang, type Localized } from "@/content/i18n";
import { safeReturnPath } from "@/lib/program-access";
import { PlatformStyle } from "./platform-style";
import { LanguageToggle } from "./language-toggle";

// ---------------------------------------------------------------------------
// The way in. Three states on one screen, never three pages.
//
//   redeem  first time. A code, plus the email and password they will use from
//           now on. The code is spent here and never asked for again.
//   login   every time after that.
//   forgot  the email-me-a-link detour, folded into the same panel so nobody
//           loses their place.
//
// The order matters: "I have a code" comes first because a buyer arriving from
// Nikita's DM has a code in their hand and nothing else. Returning athletes
// find the login tab once and then know where it is.
// ---------------------------------------------------------------------------

type Mode = "redeem" | "login" | "forgot";
type Status = "idle" | "working" | "error" | "sent";

const MIN_PASSWORD = 8;

const copy = {
  eyebrow: { ru: "Закрытая программа", en: "Private program" },

  title: {
    redeem: { ru: "АКТИВИРУЙТЕ КОД", en: "ACTIVATE YOUR CODE" },
    login: { ru: "С ВОЗВРАЩЕНИЕМ", en: "WELCOME BACK" },
    forgot: { ru: "СБРОС ПАРОЛЯ", en: "RESET YOUR PASSWORD" },
  } satisfies Record<Mode, Localized>,

  body: {
    redeem: {
      ru: "Код активируется один раз и превращается в ваш аккаунт. Дальше вы входите по почте и паролю — код больше не понадобится.",
      en: "A code activates once and becomes your account. After that you sign in with your email and password, and never need the code again.",
    },
    login: {
      ru: "Почта и пароль, которые вы задали при активации кода.",
      en: "The email and password you set when you activated your code.",
    },
    forgot: {
      ru: "Пришлём на почту ссылку, по которой можно задать новый пароль.",
      en: "We will email you a link to set a new password.",
    },
  } satisfies Record<Mode, Localized>,

  tabs: {
    redeem: { ru: "У меня есть код", en: "I have a code" },
    login: { ru: "Вход", en: "Log in" },
  } satisfies Record<"redeem" | "login", Localized>,

  fields: {
    code: { ru: "Код доступа", en: "Access code" },
    email: { ru: "Почта", en: "Email" },
    password: { ru: "Пароль", en: "Password" },
    newPassword: { ru: "Придумайте пароль", en: "Choose a password" },
  },

  actions: {
    redeem: { ru: "Создать доступ", en: "Create my access" },
    login: { ru: "Войти", en: "Log in" },
    forgot: { ru: "Прислать ссылку", en: "Email me a link" },
    working: { ru: "Минуту…", en: "One moment…" },
  } satisfies Record<Mode | "working", Localized>,

  show: { ru: "Показать", en: "Show" },
  hide: { ru: "Скрыть", en: "Hide" },

  passwordHint: {
    ru: `Минимум ${MIN_PASSWORD} символов.`,
    en: `At least ${MIN_PASSWORD} characters.`,
  },

  forgotLink: { ru: "Забыли пароль?", en: "Forgot your password?" },
  backToLogin: { ru: "Вернуться ко входу", en: "Back to log in" },

  accountReady: {
    ru: "Аккаунт создан. Войдите по своей почте и паролю.",
    en: "Your account is ready. Log in with your email and password.",
  },

  note: {
    redeem: {
      ru: "Доступ привязан к аккаунту, а не к устройству: заходите с телефона, ноутбука, из зала.",
      en: "Access belongs to your account, not to one device: sign in from your phone, your laptop, the gym.",
    },
    login: {
      ru: "Вы останетесь в системе на этом устройстве.",
      en: "You will stay signed in on this device.",
    },
    forgot: {
      ru: "Открывайте ссылку в том же браузере, из которого её запросили.",
      en: "Open the link in the same browser you asked for it from.",
    },
  } satisfies Record<Mode, Localized>,

  sent: {
    ru: "Если такой аккаунт есть, письмо со ссылкой уже в пути. Проверьте папку «Спам».",
    en: "If that account exists, the link is on its way. Check your spam folder.",
  },

  missing: { ru: "Нет кода?", en: "No code yet?" },
  missingLink: { ru: "Написать Никите", en: "Message Nikita" },

  errors: {
    no_code: { ru: "Введите код доступа.", en: "Enter your access code." },
    invalid_email: {
      ru: "Проверьте адрес почты.",
      en: "Check that email address.",
    },
    weak_password: {
      ru: `Пароль должен быть не короче ${MIN_PASSWORD} символов.`,
      en: `Your password needs at least ${MIN_PASSWORD} characters.`,
    },
    invalid_code: {
      ru: "Этот код недействителен или уже был использован.",
      en: "This code is invalid or has already been used.",
    },
    code_taken: {
      ru: "Этот код уже был использован.",
      en: "This code has already been used.",
    },
    email_taken: {
      ru: "На эту почту уже есть аккаунт. Войдите или сбросьте пароль.",
      en: "There is already an account on this email. Log in, or reset your password.",
    },
    invalid_credentials: {
      ru: "Неверная почта или пароль.",
      en: "That email or password is not right.",
    },
    access_revoked: {
      ru: "Доступ по этому коду отключён. Напишите Никите.",
      en: "Access on this code has been switched off. Message Nikita.",
    },
    no_access: {
      ru: "У этого аккаунта нет доступа к программе.",
      en: "This account does not have access to the program.",
    },
    activation_failed: {
      ru: "Аккаунт создан, но доступ не включился. Напишите Никите — он поправит за минуту.",
      en: "Your account was created but access did not switch on. Message Nikita and he will fix it.",
    },
    signup_failed: {
      ru: "Не удалось создать аккаунт. Попробуйте ещё раз.",
      en: "The account could not be created. Try again.",
    },
    lookup_failed: {
      ru: "Не удалось проверить доступ. Попробуйте ещё раз.",
      en: "Access could not be checked. Try again.",
    },
    link_expired: {
      ru: "Ссылка больше не действует. Запросите новую и откройте её в том же браузере.",
      en: "That link is no longer valid. Ask for a new one, and open it in the same browser.",
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

function errorFor(key: string | undefined): Localized {
  return copy.errors[key ?? ""] ?? copy.errors.network;
}

export function AccessScreen() {
  const { t, locale } = useLang();
  const params = useSearchParams();

  const [mode, setMode] = useState<Mode>("redeem");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [revealed, setRevealed] = useState(false);

  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Two ways of arriving here that are not "first visit":
  //   ?error=link_expired  a dead reset link. Say so on the login tab, which is
  //                        where they were trying to get to in the first place.
  //   ?mode=forgot         the "change password" link from account settings.
  useEffect(() => {
    if (params.get("error") === "link_expired") {
      setMode("login");
      setStatus("error");
      setMessage(t(copy.errors.link_expired));
      return;
    }
    if (params.get("mode") === "forgot") setMode("forgot");
  }, [params, t]);

  function switchTo(next: Mode) {
    if (next === mode) return;
    setMode(next);
    setStatus("idle");
    setMessage("");
    setRevealed(false);
  }

  function reject(value: Localized) {
    setStatus("error");
    setMessage(t(value));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (status === "working") return;

    const trimmedCode = code.trim().toUpperCase();
    const trimmedEmail = email.trim();

    // Checked here as well as on the server, so a typo costs no round trip.
    if (mode === "redeem" && !trimmedCode) return reject(copy.errors.no_code);
    if (!trimmedEmail.includes("@")) return reject(copy.errors.invalid_email);
    if (mode === "redeem" && password.length < MIN_PASSWORD) {
      return reject(copy.errors.weak_password);
    }

    setStatus("working");
    setMessage("");

    const endpoint =
      mode === "redeem"
        ? "/api/auth/redeem"
        : mode === "login"
          ? "/api/auth/login"
          : "/api/auth/reset";

    const payload =
      mode === "redeem"
        ? { code: trimmedCode, email: trimmedEmail, password }
        : mode === "login"
          ? { email: trimmedEmail, password }
          : { email: trimmedEmail, locale };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        signedIn?: boolean;
      } | null;

      if (!response.ok) return reject(errorFor(result?.error));

      if (mode === "forgot") {
        setStatus("sent");
        setMessage(t(copy.sent));
        return;
      }

      // Redemption can succeed while the sign-in behind it does not. Say so and
      // hand them to the login tab rather than pretending it all worked.
      if (mode === "redeem" && result?.signedIn === false) {
        setMode("login");
        setPassword("");
        setRevealed(false);
        setStatus("error");
        setMessage(t(copy.accountReady));
        return;
      }

      // A full navigation, not a client route change: the middleware has to see
      // the new session on a fresh request before it will let anyone through.
      window.location.assign(safeReturnPath(params.get("from"), locale));
    } catch {
      reject(copy.errors.network);
    }
  }

  const working = status === "working";
  const invalid = status === "error";

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
            <h1 className="access-title">{t(copy.title[mode])}</h1>
            <p className="access-body">{t(copy.body[mode])}</p>
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
            {mode === "forgot" ? (
              <span className="access-index">RESET · 01</span>
            ) : (
              <div className="access-modes">
                {(["redeem", "login"] as const).map((value) => (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={mode === value}
                    className="access-mode"
                    onClick={() => switchTo(value)}
                  >
                    {t(copy.tabs[value])}
                  </button>
                ))}
              </div>
            )}

            {mode === "redeem" && (
              <div className="access-field">
                <label htmlFor="access-code" className="access-label">
                  {t(copy.fields.code)}
                </label>
                <input
                  id="access-code"
                  name="code"
                  value={code}
                  onChange={(event) => {
                    setCode(event.target.value.toUpperCase());
                    if (invalid) setStatus("idle");
                  }}
                  placeholder="WH-XXXX-XXXX"
                  autoComplete="one-time-code"
                  autoCapitalize="characters"
                  spellCheck={false}
                  aria-invalid={invalid}
                  className="access-input"
                />
              </div>
            )}

            <div className="access-field">
              <label htmlFor="access-email" className="access-label">
                {t(copy.fields.email)}
              </label>
              <input
                id="access-email"
                name="email"
                type="email"
                inputMode="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (invalid) setStatus("idle");
                }}
                placeholder="you@example.com"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                aria-invalid={invalid}
                className="access-input access-input--text"
              />
            </div>

            {mode !== "forgot" && (
              <div className="access-field">
                <div className="access-label-row">
                  <label htmlFor="access-password" className="access-label">
                    {t(
                      mode === "redeem"
                        ? copy.fields.newPassword
                        : copy.fields.password,
                    )}
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
                  id="access-password"
                  name="password"
                  type={revealed ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    if (invalid) setStatus("idle");
                  }}
                  autoComplete={
                    mode === "redeem" ? "new-password" : "current-password"
                  }
                  minLength={mode === "redeem" ? MIN_PASSWORD : undefined}
                  aria-invalid={invalid}
                  aria-describedby={
                    mode === "redeem" ? "access-password-hint" : undefined
                  }
                  className="access-input access-input--text"
                />
                {mode === "redeem" && (
                  <p id="access-password-hint" className="access-hint">
                    {t(copy.passwordHint)}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="action-button access-submit"
              disabled={working}
            >
              {working ? t(copy.actions.working) : t(copy.actions[mode])}
              {working ? null : <ArrowRight size={17} />}
            </button>

            {message && (
              <p
                role={status === "sent" ? "status" : "alert"}
                className={status === "sent" ? "access-sent" : "access-error"}
              >
                {message}
              </p>
            )}

            <p className="access-note">{t(copy.note[mode])}</p>

            {mode === "login" && (
              <button
                type="button"
                className="access-inline"
                onClick={() => switchTo("forgot")}
              >
                {t(copy.forgotLink)}
              </button>
            )}

            {mode === "forgot" && (
              <button
                type="button"
                className="access-inline"
                onClick={() => switchTo("login")}
              >
                {t(copy.backToLogin)}
              </button>
            )}

            <p className="access-help">
              {t(copy.missing)}{" "}
              <a
                href="https://www.instagram.com/direct/t/113130960074619/"
                target="_blank"
                rel="noopener"
              >
                {t(copy.missingLink)}
              </a>
            </p>
          </form>
        </section>
      </main>
    </>
  );
}
