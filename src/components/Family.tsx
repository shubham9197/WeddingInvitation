"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";
import { useSlideReplay } from "@/hooks/useSlideReplay";

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

function FamilyCard({
  label,
  name,
  relation,
  parents,
  playKey,
  delay,
}: {
  label: string;
  name: string;
  relation: string;
  parents: string;
  playKey: number;
  delay?: number;
}) {
  return (
    <motion.div
      key={`${label}-${playKey}`}
      initial={{ opacity: 0, scale: 0.88 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{
        delay: delay ?? 0,
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="invite-card mx-auto w-full max-w-md px-6 py-5 text-center sm:px-8 sm:py-6"
    >
      <span className="font-body text-[9px] tracking-[0.28em] text-gold/45 uppercase">
        {label}
      </span>
      <p className="mt-3 font-display text-base font-semibold leading-snug text-ivory sm:text-lg">
        {name}
      </p>
      <p className="mt-1.5 font-body text-[11px] text-gold/50">{relation}</p>
      <p className="mt-1 font-display text-sm leading-relaxed italic text-gold-light sm:text-base">
        {parents}
      </p>
    </motion.div>
  );
}

export function Family() {
  const { family, couple } = wedding;
  const { ref, playKey } = useSlideReplay();

  return (
    <section
      ref={ref}
      className="reel-slide relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden overflow-y-auto mobile-safe-x px-4 py-6 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-8"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(70vw,280px)] w-[min(70vw,280px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(122,31,61,0.12) 0%, transparent 68%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 sm:gap-7">
        <div className="w-full space-y-4 text-center sm:space-y-5">
          <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-gold/45 to-transparent sm:w-24" />

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="font-display text-xs italic leading-relaxed text-gold/55 sm:text-sm"
          >
            {family.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5"
          >
            {["Bride's side", "United", "Groom's side"].map((label, i) => (
              <span
                key={label}
                className={`font-body text-[9px] tracking-[0.14em] uppercase sm:text-[8px] sm:tracking-[0.18em] ${
                  i === 1 ? "text-gold/70" : "text-gold/40"
                }`}
              >
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          className="text-center"
        >
          <p className="font-body text-[9px] tracking-[0.32em] text-gold/60 uppercase">
            With blessings of
          </p>
          <h2 className="mt-1.5 font-script text-[clamp(2rem,8vw,2.85rem)] leading-tight shimmer-gold">
            Our Families
          </h2>
        </motion.div>

        <div className="flex w-full flex-col items-center gap-5 sm:gap-6">
        <FamilyCard
          label="Bride's family"
          name={couple.brideFull}
          relation="Daughter of"
          parents={family.brideParents}
          playKey={playKey}
        />

        <motion.div
          className="flex justify-center py-2 sm:py-3"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="heart-shiny-red h-6 w-6 fill-current"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          >
            <path d={HEART_PATH} />
          </motion.svg>
        </motion.div>

        <FamilyCard
          label="Groom's family"
          name={couple.groomFull}
          relation="Son of"
          parents={family.groomParents}
          playKey={playKey}
          delay={0.12}
        />
        </div>

        <div className="w-full space-y-4 pt-2 text-center sm:space-y-5 sm:pt-3">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            className="font-display text-xs leading-relaxed italic text-gold/55 sm:text-sm"
          >
            {family.blessing}
          </motion.p>

          <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:w-24" />

          <motion.p
            animate={{ opacity: [0.35, 0.75, 0.35] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="font-script text-base text-gold/60 sm:text-lg"
          >
            {family.footer}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
