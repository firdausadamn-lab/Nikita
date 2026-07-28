"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal — scroll-triggered entrance. Direction + distance are intentional,
 * not a blanket fade. Respects reduced motion (falls back to a soft fade).
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  once = true,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "span" | "li" | "section";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.72, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/**
 * Stagger — parent that cascades its Reveal-less children. Use with
 * <StaggerItem> for a waterfall entrance (30-80ms steps).
 */
export function Stagger({
  children,
  className,
  step = 0.07,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.66, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * useParallax — maps element scroll progress to a translateY range.
 * Returns [ref, motionValue]. Disabled (returns 0) under reduced motion.
 */
export function useParallax(distance = 80): [
  React.RefObject<HTMLDivElement>,
  MotionValue<number>,
] {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance],
  );
  return [ref, y];
}

export { motion, EASE };
