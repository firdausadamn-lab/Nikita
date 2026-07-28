"use client";

import { useLang } from "@/content/i18n";
import { Play } from "@phosphor-icons/react";

// ---------------------------------------------------------------------------
// Configurable technique-video player. Video is NEVER self-hosted — it is
// embedded from a host decided later ({{VIDEO_HOST}}: Vimeo | Bunny |
// YouTube-unlisted), set via NEXT_PUBLIC_VIDEO_HOST. Until a host + video id
// are provided, it renders an on-brand placeholder so the layout is complete.
// ---------------------------------------------------------------------------

function srcFor(host: string, id: string): string | null {
  switch (host) {
    case "vimeo":
      return `https://player.vimeo.com/video/${id}`;
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${id}`;
    case "bunny":
      // {{BUNNY_LIBRARY}} — the library id is part of Bunny's embed URL.
      return `https://iframe.mediadelivery.net/embed/${process.env.NEXT_PUBLIC_BUNNY_LIBRARY ?? "LIBRARY"}/${id}`;
    default:
      return null;
  }
}

export function VideoEmbed({
  id,
  title,
}: {
  /** The host's video id. Provided by Nikita per movement. */
  id?: string;
  title?: string;
}) {
  const { t } = useLang();
  const host = process.env.NEXT_PUBLIC_VIDEO_HOST;
  const src = id && host ? srcFor(host, id) : null;

  if (!src) {
    return (
      <div className="relative flex aspect-video w-full items-center justify-center border border-dashed border-[var(--line-strong)] bg-[var(--bg-raise)]">
        <div className="text-center">
          <Play size={34} className="mx-auto text-[var(--ink-mute)]" weight="fill" />
          <p className="mt-3 font-mono text-[.66rem] uppercase tracking-[.16em] text-[var(--ink-mute)]">
            {title ?? t({ ru: "Видео техники", en: "Technique video" })}
          </p>
          {/* CONFIRM WITH NIKITA: video host ({{VIDEO_HOST}}) + per-movement ids. */}
          <p className="mt-1 text-[.62rem] text-[var(--ink-mute)]">
            {t({ ru: "Скоро", en: "Coming soon" })}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="aspect-video w-full overflow-hidden border border-[var(--line)] bg-black">
      <iframe
        src={src}
        title={title ?? "Technique video"}
        className="h-full w-full"
        loading="lazy"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
