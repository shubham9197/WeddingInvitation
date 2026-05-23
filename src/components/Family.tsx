"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";
import { useSlideReplay } from "@/hooks/useSlideReplay";

const ease = [0.22, 1, 0.36, 1] as const;

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

const FLOATING_HEARTS = [
  { left: "12%", delay: 0, duration: 9 },
  { left: "78%", delay: 1.2, duration: 10 },
  { left: "28%", delay: 2.4, duration: 11 },
  { left: "65%", delay: 0.8, duration: 8.5 },
  { left: "45%", delay: 3, duration: 9.5 },
];

const SPARKLES = [
  { x: "20%", y: "18%" },
  { x: "85%", y: "24%" },
  { x: "15%", y: "78%" },
  { x: "80%", y: "72%" },
];

function FloatingHeart({
  left,
  delay,
  duration,
}: {
  left: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.span
      className="pointer-events-none absolute bottom-[-10%] text-sm text-gold/25 sm:text-base"
      style={{ left }}
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, "-110vh"],
        opacity: [0, 0.45, 0.45, 0],
        x: [0, 8, -6, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
      aria-hidden
    >
      ♥
    </motion.span>
  );
}

function FamilyCard({
  label,
  name,
  relation,
  parents,
  playKey,
  delay,
  accent,
}: {
  label: string;
  name: string;
  relation: string;
  parents: string;
  playKey: number;
  delay?: number;
  accent: "bride" | "groom";
}) {
  return (
    <motion.div
      key={`${label}-${playKey}`}
      initial={{ opacity: 0, y: 28, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.35 }}
      transition={{
        delay: delay ?? 0,
        duration: 0.75,
        ease,
      }}
      className="invite-card family-showcase-card frame-border relative mx-auto w-[min(88vw,18.5rem)] overflow-hidden px-5 py-4 text-center sm:w-[min(85vw,20rem)] sm:px-6 sm:py-5"
    >
      <div className="pointer-events-none absolute -top-px left-5 right-5 h-px bg-gradient-to-r from-transparent via-gold/55 to-transparent" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            accent === "bride"
              ? "radial-gradient(ellipse at 30% 0%, rgba(201,162,39,0.1) 0%, transparent 55%)"
              : "radial-gradient(ellipse at 70% 100%, rgba(122,31,61,0.08) 0%, transparent 55%)",
        }}
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.span
        initial={{ opacity: 0, letterSpacing: "0.1em" }}
        whileInView={{ opacity: 1, letterSpacing: "0.28em" }}
        viewport={{ once: false }}
        transition={{ delay: (delay ?? 0) + 0.15, duration: 0.6 }}
        className="relative z-10 font-body text-[9px] tracking-[0.28em] text-gold/50 uppercase"
      >
        {label}
      </motion.span>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: (delay ?? 0) + 0.25, duration: 0.55, ease }}
        className="relative z-10 mt-3 font-display text-base font-semibold leading-snug text-ivory sm:text-lg"
      >
        {name}
      </motion.p>

      <motion.div
        className="relative z-10 mx-auto my-2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 40, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: (delay ?? 0) + 0.35, duration: 0.5 }}
      />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: (delay ?? 0) + 0.4, duration: 0.5 }}
        className="relative z-10 font-body text-[11px] text-gold/55"
      >
        {relation}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ delay: (delay ?? 0) + 0.5, duration: 0.55, ease }}
        className="relative z-10 mt-1 font-display text-sm leading-relaxed italic text-gold-light sm:text-base"
      >
        {parents}
      </motion.p>
    </motion.div>
  );
}

export function Family() {
  const { family, couple } = wedding;
  const { ref, playKey } = useSlideReplay();

  return (
    <section
      ref={ref}
      className="reel-slide relative flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto mobile-safe-x"
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[45%] h-[min(85vw,360px)] w-[min(85vw,360px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,162,39,0.12) 0%, transparent 68%)",
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.65, 0.35] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute left-1/2 top-[40%] h-[min(50vw,200px)] w-[min(50vw,200px)] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(122,31,61,0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {FLOATING_HEARTS.map((h, i) => (
        <FloatingHeart key={`fh-${i}-${playKey}`} {...h} />
      ))}

      {SPARKLES.map((s, i) => (
        <motion.span
          key={`sparkle-${i}-${playKey}`}
          className="pointer-events-none absolute h-1 w-1 rounded-full bg-gold/65"
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

      <div className="relative z-10 mx-auto my-auto flex w-full max-w-md flex-col items-center gap-5 px-4 py-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:gap-6 sm:px-6">
        <div className="w-full space-y-4 text-center sm:space-y-5">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            className="mx-auto h-px w-20 origin-center bg-gradient-to-r from-transparent via-gold/45 to-transparent sm:w-24"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.65, ease }}
            className="font-display text-xs italic leading-relaxed text-gold/55 sm:text-sm"
          >
            {family.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5"
          >
            {["Bride's side", "United", "Groom's side"].map((label, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.45 }}
                className={`font-body text-[9px] tracking-[0.14em] uppercase sm:text-[8px] sm:tracking-[0.18em] ${
                  i === 1
                    ? "rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-gold/80"
                    : "text-gold/40"
                }`}
              >
                {i === 1 ? (
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {label}
                  </motion.span>
                ) : (
                  label
                )}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <motion.div
          key={`title-${playKey}`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.15em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
            viewport={{ once: false }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-body text-[9px] text-gold/60 uppercase"
          >
            With blessings of
          </motion.p>
          <h2 className="mt-1.5 font-script text-[clamp(2rem,8vw,2.85rem)] leading-tight shimmer-gold">
            Our Families
          </h2>
        </motion.div>

        <div className="relative flex w-full flex-col items-center gap-4 sm:gap-5">
          <motion.div
            className="pointer-events-none absolute top-[12%] bottom-[12%] left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent"
            initial={{ scaleY: 0, opacity: 0 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 1, ease }}
            aria-hidden
          />

          <FamilyCard
            label="Bride's family"
            name={couple.brideFull}
            relation="Daughter of"
            parents={family.brideParents}
            playKey={playKey}
            accent="bride"
          />

          <motion.div
            className="relative z-10 flex justify-center py-1 sm:py-2"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{ delay: 0.35, duration: 0.55, ease }}
          >
            <motion.div
              className="absolute inset-0 -m-3 rounded-full bg-[#e53935]/15 blur-md"
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 1.25, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            />
            <motion.svg
              viewBox="0 0 24 24"
              className="heart-shiny-red relative h-7 w-7 fill-current sm:h-8 sm:w-8"
              animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
              transition={{
                duration: 1.25,
                repeat: Infinity,
                times: [0, 0.14, 0.28, 0.42, 0.55],
                repeatDelay: 0.35,
              }}
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
            delay={0.15}
            accent="groom"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: 0.7, ease }}
          className="w-full max-w-sm space-y-3 rounded-2xl border border-gold/15 bg-gradient-to-b from-gold/6 to-transparent px-4 py-3.5 text-center sm:space-y-3.5 sm:px-5"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-display text-xs leading-relaxed italic text-gold/60 sm:text-sm"
          >
            {family.blessing}
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: false }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mx-auto h-px w-20 origin-center bg-gradient-to-r from-transparent via-gold/40 to-transparent sm:w-24"
          />

          <motion.p
            animate={{ opacity: [0.35, 0.8, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            className="font-script text-base text-gold/65 sm:text-lg"
          >
            {family.footer}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
