"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";
import { LocationMap } from "./LocationMap";
import { useSlideReplay } from "@/hooks/useSlideReplay";

export function Venue() {
  const { couple, date, venue } = wedding;
  const { ref, playKey } = useSlideReplay();

  return (
    <section
      ref={ref}
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

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 sm:gap-7">
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
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="w-full text-center"
        >
          <h2 className="font-display text-[clamp(1.75rem,7vw,2.25rem)] font-semibold leading-tight text-ivory">
            Join Us Here
          </h2>
        </motion.div>

        <LocationMap key={playKey} />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          className="w-full max-w-sm space-y-3 text-center sm:space-y-4"
        >
          <p className="font-script text-xl leading-snug text-gold-light sm:text-2xl">
            {venue.name}
          </p>
          <p className="font-body text-[10px] leading-relaxed text-gold/50 sm:text-[11px]">
            {venue.address}
          </p>
          <div className="space-y-1.5 pt-1">
            <p className="font-display text-sm text-ivory/90 sm:text-base">
              {date.display}
            </p>
            <p className="font-body text-xs text-gold/55 sm:text-sm">{date.time}</p>
          </div>
        </motion.div>

        <div className="flex w-full flex-col items-center space-y-4 pt-1 sm:space-y-5">
          <div className="h-px w-28 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <motion.div className="relative h-12 w-full" aria-hidden>
            <motion.div
              className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15"
              animate={{ rotate: 360 }}
              transition={{ duration: 42, repeat: Infinity, ease: "linear" }}
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
            Tap open in maps for directions
          </motion.p>
        </div>
      </div>
    </section>
  );
}
