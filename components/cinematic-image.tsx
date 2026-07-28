"use client";

import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

/**
 * CinematicImage — full-bleed capable image treated to one cohesive grade:
 * deepened contrast, warm/oxblood push, vignette. Parallax + a subtle
 * scale-in as it enters. If the file is missing it renders a rich dark
 * placeholder (never an empty grey box).
 *
 * REPLACE: drop real photos in /public. hero.jpg = Photo 1 (competition),
 * portrait.jpg = Photo 2 (training camp).
 */
export function CinematicImage({
  src,
  alt,
  parallax = 60,
  grade = true,
  priority = false,
  className = "",
  objectPosition = "center",
}: {
  src: string;
  alt: string;
  parallax?: number;
  grade?: boolean;
  priority?: boolean;
  className?: string;
  objectPosition?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : [`-${parallax / 8}%`, `${parallax / 8}%`],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.12, 1.22],
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {failed ? (
          <div className="photo-placeholder absolute inset-0" aria-label={alt} role="img" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover"
            style={{
              objectPosition,
              filter: grade
                ? "contrast(1.12) saturate(0.92) brightness(0.82) sepia(0.06)"
                : undefined,
            }}
          />
        )}
      </motion.div>

      {/* Cohesive grade: warm oxblood wash + bottom legibility gradient */}
      {grade && (
        <>
          <div
            className="absolute inset-0 mix-blend-multiply"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,10,9,0.20) 0%, rgba(11,10,9,0.05) 45%, rgba(11,10,9,0.85) 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-30"
            style={{
              background:
                "radial-gradient(90% 70% at 40% 40%, rgba(154,44,37,0.55), transparent 70%)",
            }}
            aria-hidden
          />
        </>
      )}
    </div>
  );
}
