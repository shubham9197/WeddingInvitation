"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wedding } from "@/lib/wedding-data";
import { useSlideReplay } from "@/hooks/useSlideReplay";
import { EventFrameCard } from "./EventFrameCard";

const EVENTS = wedding.events;

const ease = [0.22, 1, 0.36, 1] as const;

const EVENT_TAGLINES: Record<string, string> = {
  Haldi: "Turmeric blessings & golden glow",
  Mehendi: "Henna, music & joyful colours",
  Sangeet: "Dance, songs & celebration",
  Wedding: "Sacred vows under the mandap",
};

const FLOATING_ICONS = ["✨", "🌿", "💍", "🪔", "✨", "💐"];

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

  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
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
      className="reel-slide relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden overflow-y-auto mobile-safe-x px-4 py-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-8"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(85vw,340px)] w-[min(85vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {FLOATING_ICONS.map((icon, i) => (
        <motion.span
          key={`icon-${i}`}
          className="pointer-events-none absolute text-base opacity-20 sm:text-lg"
          style={{
            left: `${8 + (i * 15) % 80}%`,
            top: `${8 + ((i * 19) % 84)}%`,
          }}
          animate={{
            y: [0, -14, 0],
            opacity: [0.1, 0.28, 0.1],
            rotate: [0, 10, -6, 0],
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

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-5 sm:gap-6">
        {/* Header — matches Venue */}
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
                style={{ transformOrigin: "center center" }}
                onClick={() => {
                  setActive(i);
                  scrollToIndex(i);
                }}
                animate={{ opacity: active === i ? 1 : 0.55 }}
                className={`flex min-w-0 flex-1 flex-col items-center rounded-xl border px-1 py-2 transition-colors sm:px-2 sm:py-2.5 ${
                  active === i
                    ? "border-gold/50 bg-gold/10"
                    : "border-gold/15 bg-[#121010]/80"
                }`}
              >
                <span className="text-base sm:text-lg">{event.icon}</span>
                <span className="mt-0.5 font-body text-[9px] font-semibold tracking-wide text-gold/70 uppercase sm:mt-1 sm:text-[10px] sm:tracking-wider">
                  {event.name}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Title — matches Venue heading rhythm */}
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

        {/* Event cards carousel — one card centered per swipe */}
        <div
          ref={scrollRef}
          className="flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth pb-0.5 scrollbar-hide"
        >
          {EVENTS.map((event, i) => {
            const isActive = active === i;
            return (
              <motion.div
                key={`wrap-${event.name}-${playKey}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="flex w-full shrink-0 snap-center snap-always justify-center"
                initial={{ opacity: 0, scale: 0.72 }}
                animate={{
                  scale: isActive ? 1 : 0.94,
                  opacity: isActive ? 1 : 0.55,
                }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.55,
                  ease,
                }}
                style={{ transformOrigin: "center center" }}
              >
                  <EventFrameCard>
                    <motion.span
                      className="relative block shrink-0 text-3xl sm:text-4xl"
                      animate={
                        isActive
                          ? { y: [0, -6, 0], scale: [1, 1.08, 1] }
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
                    <h3 className="shrink-0 font-script text-[clamp(1.65rem,6vw,2.25rem)] leading-snug text-ivory">
                      {event.name}
                    </h3>
                    <motion.div
                      className="h-px shrink-0 bg-gold/50"
                      animate={{
                        width: isActive ? 48 : 24,
                        opacity: isActive ? 1 : 0.4,
                      }}
                      transition={{ duration: 0.45 }}
                    />
                    <p className="shrink-0 font-display text-base font-medium leading-snug text-gold-light sm:text-lg">
                      {event.date}
                    </p>
                    <p className="shrink-0 font-body text-sm leading-relaxed text-gold/65">
                      {event.time}
                    </p>
                    <p className="shrink-0 font-body text-xs leading-relaxed text-gold/45">
                      {event.venue}
                    </p>
                  </EventFrameCard>
              </motion.div>
            );
          })}
        </div>

        {/* Active event details — matches Venue info block */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeEvent.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.5, ease }}
            className="w-full max-w-sm space-y-2 text-center sm:space-y-3"
          >
            <p className="font-script text-xl leading-snug text-gold-light sm:text-2xl">
              {activeEvent.name}
            </p>
            <p className="font-display text-xs italic leading-relaxed text-gold/55 sm:text-sm">
              {EVENT_TAGLINES[activeEvent.name]}
            </p>
            <p className="font-body text-[10px] tracking-[0.15em] text-gold/45">
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
              onClick={() => {
                setActive(i);
                scrollToIndex(i);
              }}
              className="flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9"
            >
              <HeartDot active={active === i} />
            </button>
          ))}
        </div>

        {/* Footer — matches Venue */}
        <div className="flex w-full flex-col items-center space-y-4 pt-1 sm:space-y-5">
          <div className="h-px w-28 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <motion.div className="relative h-12 w-full" aria-hidden>
            <motion.div
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15"
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{
                rotate: { duration: 42, repeat: Infinity, ease: "linear" },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="font-body text-[9px] tracking-[0.22em] text-gold/35 uppercase"
          >
            Swipe to see each celebration
          </motion.p>
        </div>
      </div>
    </section>
  );
}
