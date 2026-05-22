"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { wedding } from "@/lib/wedding-data";
import { ScratchHeart } from "./ScratchHeart";
import {
  CelebrationConfetti,
  CONFETTI_BURST_MS,
} from "./CelebrationConfetti";
import { useReelUnlock } from "@/context/ReelUnlockContext";
import { useSlideReplay } from "@/hooks/useSlideReplay";
import { getReelScrollContainer, getReelSlideHeight } from "@/lib/reel-scroll";

export function SaveTheDate() {
  const { date } = wedding;
  const { saveDateRevealed, unlockSaveDate } = useReelUnlock();
  const revealed = useRef(0);
  const navigated = useRef(false);
  const [allDone, setAllDone] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const parts = [date.scratch.day, date.scratch.month, date.scratch.year];

  const goToNextSlide = useCallback(() => {
    const container = getReelScrollContainer();
    if (!container) return;
    const slideHeight = getReelSlideHeight(container);
    const current = Math.round(container.scrollTop / slideHeight);
    container.scrollTo({
      top: (current + 1) * slideHeight,
      behavior: "smooth",
    });
  }, []);

  const onHeartRevealed = useCallback(() => {
    revealed.current += 1;
    if (revealed.current >= 3 && !navigated.current) {
      navigated.current = true;
      setAllDone(true);
      unlockSaveDate();
      setCelebrate(true);
      setTimeout(() => {
        setCelebrate(false);
        goToNextSlide();
      }, CONFETTI_BURST_MS);
    }
  }, [goToNextSlide, unlockSaveDate]);

  const { ref, playKey } = useSlideReplay();

  useEffect(() => {
    if (playKey === 0) return;
    revealed.current = 0;
    navigated.current = false;
    setAllDone(false);
    setCelebrate(false);
  }, [playKey]);

  return (
    <section
      ref={ref}
      className="reel-slide relative min-h-dvh overflow-x-hidden overflow-y-auto mobile-safe-x"
    >
      <CelebrationConfetti active={celebrate} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(201,162,39,0.12),transparent_55%)]" />

      <div className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-10">
        <motion.div
          key={playKey}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="mobile-card dark-card relative rounded-3xl px-4 py-8 text-center sm:px-6 sm:py-10"
        >
          <div className="pointer-events-none absolute -top-px left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#e8c547] to-transparent" />

          <div className="flex items-center justify-center gap-2">
            <Sparkles className="text-[#d4af37]" size={14} />
            <p className="font-body text-[11px] tracking-[0.5em] text-gold/70 uppercase">
              Save the Date
            </p>
            <Sparkles className="text-[#d4af37]" size={14} />
          </div>

          <h2 className="mt-5 font-display text-[clamp(1.5rem,6vw,2.4rem)] font-semibold leading-tight text-ivory">
            Reveal Our{" "}
            <span className="shimmer-gold">Big Day</span>
          </h2>

          <p className="mt-3 font-display text-sm italic text-gold/60">
            Scratch the hearts to reveal
          </p>

          <div className="mx-auto mt-6 flex w-full max-w-[min(340px,100%)] justify-between gap-0.5 sm:mt-10 sm:gap-2">
            {parts.map((part) => (
              <span
                key={part.label}
                className="min-w-0 flex-1 text-center font-body text-[9px] font-semibold tracking-[0.12em] text-gold/55 uppercase sm:text-[11px] sm:tracking-[0.25em]"
              >
                {part.label}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-2 flex w-full max-w-[min(340px,100%)] justify-between gap-0.5 sm:mt-3 sm:gap-2">
            {parts.map((part) => (
              <ScratchHeart
                key={`${part.label}-${playKey}`}
                value={part.value}
                onRevealed={onHeartRevealed}
                large
              />
            ))}
          </div>

          <AnimatePresence>
            {allDone && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="mt-8 rounded-2xl border border-gold/40 bg-gradient-to-r from-[#1a1512] via-[#121010] to-[#1a1218] px-4 py-3 shadow-[0_0_24px_rgba(201,162,39,0.15)]"
              >
                <p className="font-script text-2xl text-gold-light">Congratulations!</p>
                <p className="mt-1 font-body text-[10px] tracking-[0.2em] text-gold/60 uppercase">
                  Our date is revealed
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {!allDone ? (
              <motion.div
                key="love-line"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45 }}
                className="mt-8 space-y-2"
              >
                <p className="font-display text-sm leading-relaxed text-gold/75 italic sm:text-base">
                  {date.loveLine}
                </p>
                <p className="font-body text-[11px] tracking-[0.08em] text-gold/60 italic sm:text-xs">
                  {date.loveLineCta}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="wedding-date"
                initial={{ opacity: 0, scale: 0.92, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 font-body text-[11px] font-medium tracking-[0.22em] text-gold/90 uppercase"
              >
                {date.footerLine}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {saveDateRevealed && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 font-body text-[10px] tracking-[0.15em] text-gold/45"
          >
            Scroll down to continue →
          </motion.p>
        )}
      </div>
    </section>
  );
}
