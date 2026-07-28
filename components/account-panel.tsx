"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/content/i18n";
import { ACCESS_PATH } from "@/lib/program-access";

// ---------------------------------------------------------------------------
// The account block on the settings page.
//
// Small, and it earns its place three times over: it tells an athlete which
// email they signed up with (the most common support question once a login
// exists), it gives them a way out on a shared or borrowed device, and it is
// the one place the "one code, one account" rule is stated where somebody who
// already has access will actually read it.
// ---------------------------------------------------------------------------

const copy = {
  signedInAs: { ru: "Вы вошли как", en: "Signed in as" },
  loading: { ru: "Загружаем…", en: "Loading…" },
  signOut: { ru: "Выйти", en: "Sign out" },
  signingOut: { ru: "Выходим…", en: "Signing out…" },
  changePassword: { ru: "Сменить пароль", en: "Change password" },
  bound: {
    ru: "Доступ привязан к этому аккаунту. Код был потрачен при активации и больше не действует.",
    en: "Access belongs to this account. The code was spent when you activated it and no longer works.",
  },
};

export function AccountPanel() {
  const { t, locale } = useLang();
  const [email, setEmail] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let live = true;

    fetch("/api/auth/session")
      .then((response) => response.json())
      .then((data: { email?: string | null }) => {
        if (!live) return;
        setEmail(data.email ?? null);
        setLoaded(true);
      })
      .catch(() => {
        if (live) setLoaded(true);
      });

    // Guards against setting state after the athlete has navigated away.
    return () => {
      live = false;
    };
  }, []);

  async function signOut() {
    if (leaving) return;
    setLeaving(true);

    await fetch("/api/auth/logout", { method: "POST" }).catch(() => undefined);

    // Full navigation, so the middleware sees the cleared cookies on a fresh
    // request rather than serving a cached view of a session that is gone.
    window.location.assign(`/${locale}${ACCESS_PATH}`);
  }

  return (
    <section className="account-panel">
      <p className="account-label">{t(copy.signedInAs)}</p>
      <p className="account-email">{loaded ? (email ?? "—") : t(copy.loading)}</p>
      <p className="account-note">{t(copy.bound)}</p>

      <div className="account-actions">
        <button
          type="button"
          className="account-button"
          onClick={signOut}
          disabled={leaving}
        >
          {leaving ? t(copy.signingOut) : t(copy.signOut)}
        </button>
        {/* Straight to the reset flow: changing a password you still know and
            resetting one you have forgotten are the same journey here, and two
            routes to it would only be two things to keep working. */}
        <a className="account-link" href={`/${locale}${ACCESS_PATH}?mode=forgot`}>
          {t(copy.changePassword)}
        </a>
      </div>
    </section>
  );
}
