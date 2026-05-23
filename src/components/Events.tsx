"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/lib/wedding-data";
import { useSlideReplay } from "@/hooks/useSlideReplay";

/** Auto-advance interval between events (ms) — slower = easier to read */
const AUTO_ADVANCE_MS = 4800;

const EVENTS = wedding.events;

const ease = [0.22, 1, 0.36, 1] as const;

const EVENT_TAGLINES: Record<string, string> = {
  Haldi: "Turmeric blessings & golden glow",
  Mehendi: "Henna, music & joyful colours",
  Sangeet: "Dance, songs & celebration",
  Wedding: "Sacred vows under the mandap",
};

const FLOATING_ICONS = ["✨", "🌿", "💍", "🪔", "✨", "💐"];

const SPARKLES = [
  { x: "18%", y: "22%" },
  { x: "82%", y: "18%" },
  { x: "12%", y: "72%" },
  { x: "88%", y: "68%" },
];

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

function HeartDot({ active }: { active: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="heart-shiny-red h-5 w-5 fill-current sm:h-6 sm:w-6"
      animate={{
        scale: active ? [1, 1.18, 1] : 0.7,
        opacity: active ? 1 : 0.4,
      }}
      transition={
        active
          ? {
              scale: { duration: 0.85, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.35 },
            }
          : { duration: 0.35 }
      }
      aria-hidden
    >
      <path d={HEART_PATH} />
    </motion.svg>
  );
}

export function Events() {
  const { couple, date } = wedding;
  const { ref: sectionRef, playKey } = useSlideReplay();
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [slideInView, setSlideInView] = useState(false);
  const autoPausedRef = useRef(false);
  const activeEvent = EVENTS[active];

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    const root = scrollRef.current;
    const el = cardRefs.current[index];
    if (!root || !el) return;

    const rootRect = root.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const left =
      root.scrollLeft +
      (elRect.left - rootRect.left) -
      (root.clientWidth - elRect.width) / 2;

    root.scrollTo({
      left: Math.max(0, left),
      behavior: smooth ? "smooth" : "auto",
    });
  }, []);

  const resetToMehendi = useCallback(
    (smooth = false) => {
      autoPausedRef.current = false;
      setCycleIndex(0);
      setActive(0);
      const snap = () => scrollToIndex(0, smooth);
      requestAnimationFrame(snap);
      window.setTimeout(snap, 150);
    },
    [scrollToIndex]
  );

  const goToEvent = useCallback(
    (index: number) => {
      autoPausedRef.current = true;
      setCycleIndex(index);
      setActive(index);
      scrollToIndex(index);
    },
    [scrollToIndex]
  );

  /* When Events slide scrolls into view → always start at Mehendi (index 0) */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= 0.45;
        setSlideInView(visible);
        if (visible) {
          resetToMehendi(false);
        }
      },
      { threshold: [0.35, 0.45, 0.55] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionRef, resetToMehendi, playKey]);

  useEffect(() => {
    if (playKey > 0) resetToMehendi(false);
  }, [playKey, resetToMehendi]);

  /* Auto-advance Mehendi → Sangeet → Haldi → Wedding while slide is visible */
  useEffect(() => {
    if (!slideInView || autoPausedRef.current) return;

    const t = setInterval(() => {
      setCycleIndex((i) => (i + 1) % EVENTS.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(t);
  }, [slideInView, playKey]);

  useEffect(() => {
    if (autoPausedRef.current || !slideInView) return;
    setActive(cycleIndex);
    scrollToIndex(cycleIndex, cycleIndex !== 0);
  }, [cycleIndex, scrollToIndex, slideInView]);

  /* Manual swipe updates active tab only after user takes over */
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!autoPausedRef.current) return;

        let best: { idx: number; ratio: number } | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = cardRefs.current.indexOf(entry.target as HTMLElement);
          if (idx < 0) continue;
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { idx, ratio: entry.intersectionRatio };
          }
        }
        if (best && best.ratio >= 0.4) setActive(best.idx);
      },
      { root, threshold: [0.25, 0.4, 0.55, 0.75] }
    );

    const t = window.setTimeout(() => {
      cardRefs.current.forEach((node) => {
        if (node) observer.observe(node);
      });
    }, 50);

    return () => {
      window.clearTimeout(t);
      observer.disconnect();
    };
  }, [playKey]);

  return (
    <section
      ref={sectionRef}
      className="reel-slide relative flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto mobile-safe-x"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[min(90vw,380px)] w-[min(90vw,380px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.14) 0%, transparent 65%)",
        }}
        animate={{ scale: [1, 1.14, 1], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[min(55vw,220px)] w-[min(55vw,220px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(122,31,61,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {SPARKLES.map((s, i) => (
        <motion.span
          key={`sparkle-${i}`}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold/70"
          style={{ left: s.x, top: s.y }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
          transition={{
            duration: 2.4,
            delay: i * 0.55,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {FLOATING_ICONS.map((icon, i) => (
        <motion.span
          key={`icon-${i}`}
          className="pointer-events-none absolute text-sm opacity-25 sm:text-base"
          style={{
            left: `${8 + (i * 15) % 80}%`,
            top: `${8 + ((i * 19) % 84)}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.15, 0.35, 0.15],
            rotate: [0, 8, -5, 0],
          }}
          transition={{
            duration: 5 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.span>
      ))}

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-md flex-col items-center gap-4 px-4 py-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-5 sm:px-6">
        <div className="w-full space-y-3 text-center sm:space-y-4">
          <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent sm:w-32" />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="font-display text-sm italic leading-relaxed text-gold/55"
          >
            {couple.groom}{" "}
            <motion.span
              className="heart-shiny-red inline-block font-script text-lg not-italic"
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            >
              ♥
            </motion.span>{" "}
            {couple.bride}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.15 }}
            className="font-body text-[9px] tracking-[0.28em] text-gold/50 uppercase"
          >
            {date.footerLine}
          </motion.p>

          <div className="flex w-full gap-1.5 pt-1 sm:gap-2 sm:pt-2">
            {EVENTS.map((event, i) => (
              <motion.button
                key={`${event.name}-tab-${playKey}`}
                type="button"
                initial={{ opacity: 0, scale: 0.72 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ delay: i * 0.12, duration: 1.05, ease }}
                whileTap={{ scale: 0.96 }}
                style={{ transformOrigin: "center center" }}
                onClick={() => goToEvent(i)}
                animate={{
                  opacity: active === i ? 1 : 0.5,
                  y: active === i ? -2 : 0,
                }}
                className={`flex min-w-0 flex-1 flex-col items-center rounded-xl border px-1 py-2 transition-colors sm:px-2 sm:py-2.5 ${
                  active === i
                    ? "event-tab--active"
                    : "border-gold/15 bg-[#121010]/80"
                }`}
              >
                <motion.span
                  className="text-base sm:text-lg"
                  animate={{ scale: active === i ? 1.12 : 1 }}
                  transition={{ duration: 0.35 }}
                >
                  {event.icon}
                </motion.span>
                <span className="mt-0.5 font-body text-[9px] font-semibold tracking-wide text-gold/70 uppercase sm:mt-1 sm:text-[10px] sm:tracking-wider">
                  {event.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div
          key={`title-${playKey}`}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, ease }}
          className="w-full text-center"
        >
          <p className="font-body text-[10px] tracking-[0.4em] text-gold/60 uppercase">
            Celebrations
          </p>
          <h2 className="mt-1 font-script text-[clamp(2rem,8vw,2.75rem)] leading-tight shimmer-gold">
            Our Events
          </h2>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth pb-1 scrollbar-hide"
          onPointerDown={() => {
            autoPausedRef.current = true;
          }}
        >
          {EVENTS.map((event, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={`wrap-${event.name}-${playKey}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex w-full shrink-0 snap-center snap-always justify-center px-1"
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{
                  scale: isActive ? 1 : 0.92,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.55,
                  ease,
                }}
                style={{ transformOrigin: "center center" }}
              >
                <article
                  className={`invite-card event-showcase-card frame-border relative flex w-full max-w-[18.5rem] flex-col items-center overflow-hidden px-6 py-5 text-center sm:max-w-[20rem] sm:px-7 sm:py-6 ${
                    isActive ? "event-showcase-card--active" : ""
                  }`}
                >
                  <div className="pointer-events-none absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

                  {isActive && (
                    <motion.div
                      className="pointer-events-none absolute left-1/2 top-8 h-24 w-24 -translate-x-1/2 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(201,162,39,0.25) 0%, transparent 70%)",
                      }}
                      animate={{ opacity: [0.4, 0.8, 0.4], scale: [0.9, 1.1, 0.9] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <motion.div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/12 via-transparent to-[#1a1218]/40"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.45 }}
                  />

                  <motion.span
                    className="relative z-10 block text-4xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                    animate={
                      isActive
                        ? { y: [0, -6, 0], scale: [1, 1.1, 1] }
                        : { y: 0, scale: 1 }
                    }
                    transition={
                      isActive
                        ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.3 }
                    }
                  >
                    {event.icon}
                  </motion.span>

                  <div className="relative z-10 flex w-full flex-col items-center space-y-2 sm:space-y-2.5">
                    <h3 className="mt-2 font-script text-3xl leading-snug text-ivory sm:mt-3 sm:text-4xl">
                      {event.name}
                    </h3>
                    <motion.div
                      className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
                      animate={{
                        width: isActive ? 56 : 28,
                        opacity: isActive ? 1 : 0.35,
                      }}
                      transition={{ duration: 0.45 }}
                    />

                    <p className="font-display text-lg font-medium leading-snug text-gold-light">
                      {event.date}
                    </p>
                    <p className="font-body text-sm leading-relaxed text-gold/70">
                      {event.time}
                    </p>
                    <p className="rounded-full border border-gold/15 bg-gold/5 px-3 py-1 font-body text-[10px] leading-relaxed text-gold/50">
                      {event.venue}
                    </p>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.5, ease }}
            className="w-full max-w-[18.5rem] rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/8 to-transparent px-4 py-3 text-center sm:max-w-[20rem]"
          >
            <p className="font-script text-xl leading-snug text-gold-light sm:text-2xl">
              {activeEvent.name}
            </p>
            <p className="mt-1.5 font-display text-xs italic leading-relaxed text-gold/60 sm:text-sm">
              {EVENT_TAGLINES[activeEvent.name]}
            </p>
            <p className="mt-2 font-body text-[10px] tracking-[0.15em] text-gold/45">
              {activeEvent.date} · {activeEvent.time}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-4 sm:gap-5">
          {EVENTS.map((event, i) => (
            <button
              key={event.name}
              type="button"
              aria-label={`Go to ${event.name}`}
              onClick={() => goToEvent(i)}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gold/10 sm:h-9 sm:w-9"
            >
              <HeartDot active={active === i} />
            </button>
          ))}
        </div>

        <div className="flex w-full flex-col items-center space-y-3 pt-1 sm:space-y-4">
          <div className="h-px w-28 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ opacity: { duration: 2.5, repeat: Infinity } }}
            className="font-body text-[9px] tracking-[0.22em] text-gold/40 uppercase"
          >
            Swipe to see each celebration
          </motion.p>
        </div>
      </div>
    </section>
  );
}
