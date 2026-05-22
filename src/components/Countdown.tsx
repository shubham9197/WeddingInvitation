"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";
import { COUNTDOWN_SLIDE_INDEX } from "@/context/ReelUnlockContext";
import { useSlideReplay } from "@/hooks/useSlideReplay";
import { getReelScrollContainer, getReelSlideHeight } from "@/lib/reel-scroll";
import { CountdownFrameCard } from "./CountdownFrameCard";

const AUTO_ADVANCE_MS = 6000;

function getTimeLeft(target: string) {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const LABELS = ["Days", "Hours", "Mins", "Secs"] as const;

function HeartbeatLine() {
  return (
    <svg
      viewBox="0 0 280 40"
      className="mx-auto h-8 w-full max-w-[260px] text-gold/35"
      aria-hidden
    >
      <motion.path
        d="M0 20 H70 L82 8 L94 32 L106 20 H170 L182 6 L194 34 L206 20 H280"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0.3 }}
        animate={{ pathLength: 1, opacity: [0.3, 0.7, 0.3] }}
        transition={{
          pathLength: { duration: 2, repeat: Infinity, ease: "linear" },
          opacity: { duration: 2, repeat: Infinity },
        }}
      />
    </svg>
  );
}

export function Countdown() {
  const { couple, date } = wedding;
  const { ref: sectionRef, playKey } = useSlideReplay(0.55);
  const advancedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [time, setTime] = useState(() => getTimeLeft(date.iso));
  const [tick, setTick] = useState(0);
  const values = [time.days, time.hours, time.minutes, time.seconds];

  useEffect(() => {
    const id = setInterval(() => {
      setTime(getTimeLeft(date.iso));
      setTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [date.iso]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          if (advancedRef.current || timerRef.current) return;
          timerRef.current = setTimeout(() => {
            advancedRef.current = true;
            timerRef.current = null;
            const container = getReelScrollContainer();
            if (!container) return;
            const slideHeight = getReelSlideHeight(container);
            const current = Math.round(container.scrollTop / slideHeight);
            if (current !== COUNTDOWN_SLIDE_INDEX) return;
            container.scrollTo({
              top: (COUNTDOWN_SLIDE_INDEX + 1) * slideHeight,
              behavior: "smooth",
            });
          }, AUTO_ADVANCE_MS);
        } else {
          if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          advancedRef.current = false;
        }
      },
      { threshold: [0.55] }
    );

    observer.observe(section);
    return () => {
      observer.disconnect();
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [playKey]);

  return (
    <section
      ref={sectionRef}
      className="reel-slide relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden overflow-y-auto px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] mobile-safe-x sm:px-6 sm:py-8"
    >
      {/* Ambient glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,320px)] w-[min(70vw,320px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.18) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Sparkles */}
      {[
        { x: "22%", y: "28%" },
        { x: "74%", y: "24%" },
        { x: "30%", y: "58%" },
        { x: "68%", y: "55%" },
      ].map((s, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold/60"
          style={{ left: s.x, top: s.y }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
          transition={{
            duration: 2.2,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        key={playKey}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full"
      >
        <CountdownFrameCard>
        <HeartbeatLine />

        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-4 font-body text-[10px] tracking-[0.4em] text-gold/60 uppercase"
        >
          Counting every heartbeat until
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="mt-3 font-script text-[clamp(2.5rem,10vw,3.25rem)] shimmer-gold"
        >
          The Big Day
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.45 }}
          className="mt-2 font-display text-sm italic text-gold/50"
        >
          {couple.groom}{" "}
          <motion.span
            className="heart-shiny-red inline-block font-script text-lg not-italic"
            animate={{ scale: [1, 1.2, 1, 1.15, 1] }}
            transition={{
              duration: 1.25,
              repeat: Infinity,
              times: [0, 0.14, 0.28, 0.42, 0.55],
              repeatDelay: 0.35,
            }}
          >
            ♥
          </motion.span>{" "}
          {couple.bride}
        </motion.p>

        <div className="mt-5 grid grid-cols-4 gap-1.5 sm:mt-7 sm:gap-2.5">
          {LABELS.map((label, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="invite-card relative overflow-hidden rounded-xl py-3 sm:py-4"
            >
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gold/10 to-transparent"
                animate={{ opacity: i === 3 ? [0.3, 0.7, 0.3] : 0.2 }}
                transition={
                  i === 3
                    ? { duration: 1, repeat: Infinity, ease: "easeInOut" }
                    : undefined
                }
              />
              <motion.span
                key={`${label}-${values[i]}-${tick}`}
                initial={{ scale: 1.12, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative font-display text-xl font-bold tabular-nums text-ivory sm:text-2xl md:text-3xl"
              >
                {label === "Days"
                  ? String(values[i])
                  : String(values[i]).padStart(2, "0")}
              </motion.span>
              <p className="relative mt-1 font-body text-[9px] tracking-wider text-gold/55 uppercase">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mx-auto mt-6 h-px w-32 bg-gradient-to-r from-transparent via-gold/50 to-transparent sm:w-40"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 1 }}
          className="mt-4 font-body text-[10px] font-medium tracking-[0.22em] text-gold/70 uppercase"
        >
          {date.footerLine}
        </motion.p>

        <motion.p
          animate={{ opacity: [0.35, 0.7, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="mt-3 font-display text-xs italic text-gold/45"
        >
          Until we say &ldquo;I do&rdquo;
        </motion.p>
        </CountdownFrameCard>
      </motion.div>

      {/* Bottom decorative rings */}
      <motion.div
        className="pointer-events-none absolute bottom-[max(2.5rem,10%)] left-1/2 -translate-x-1/2 max-sm:opacity-40"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="h-16 w-16 rounded-full border border-gold/10 sm:h-24 sm:w-24 md:h-32 md:w-32"
          style={{ boxShadow: "inset 0 0 20px rgba(201,162,39,0.06)" }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-[max(3rem,12%)] left-1/2 -translate-x-1/2 max-sm:opacity-40"
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      >
        <div className="h-12 w-12 rounded-full border border-dashed border-gold/15 sm:h-16 sm:w-16 md:h-20 md:w-20" />
      </motion.div>
    </section>
  );
}
