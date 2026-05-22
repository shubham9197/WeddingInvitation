"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  blurred: boolean;
  showNames: boolean;
  groom: string;
  bride: string;
};

export function WeddingIntroScene({ blurred, showNames, groom, bride }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0a0808]">
      {/* Wedding illustration backdrop */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: blurred ? 1.08 : 1,
          filter: blurred ? "blur(14px) brightness(0.92)" : "blur(0px) brightness(1)",
        }}
        transition={{ duration: 1.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/wedding-intro-scene.png"
          alt="Traditional Indian wedding mandap"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Soft vignette for depth */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 42%, transparent 0%, rgba(250,246,239,0.15) 55%, rgba(250,246,239,0.45) 100%)",
          }}
        />
      </motion.div>

      {/* Cream wash when blurred — makes envelope pop */}
      <motion.div
        className="absolute inset-0 bg-[#0a0808]/70"
        animate={{ opacity: blurred ? 0.55 : 0 }}
        transition={{ duration: 1.45, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Couple names — center gap above mandap */}
      <AnimatePresence>
        {showNames && (
          <AnimateNames key="names" groom={groom} bride={bride} />
        )}
      </AnimatePresence>
    </div>
  );
}

function AnimateNames({ groom, bride }: { groom: string; bride: string }) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-x-0 top-[clamp(18%,28vh,32%)] z-10 flex flex-col items-center px-4 sm:px-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.p
        initial={{ opacity: 0, letterSpacing: "0.2em" }}
        animate={{ opacity: 1, letterSpacing: "0.45em" }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="intro-scene-eyebrow relative font-body text-[9px] font-semibold tracking-[0.45em] uppercase sm:text-[10px]"
      >
        A Celebration of Love
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.9 }}
        className="relative mt-3 text-center"
      >
        <h1 className="intro-scene-name font-display text-[clamp(2rem,9vw,3rem)] font-bold leading-tight">
          {groom}
        </h1>
        <p className="intro-scene-amp my-1 font-script text-[clamp(1.75rem,7vw,2.25rem)]">&</p>
        <h1 className="intro-scene-name font-display text-[clamp(2rem,9vw,3rem)] font-bold leading-tight">
          {bride}
        </h1>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
        className="relative mt-4 h-px w-24 bg-gradient-to-r from-transparent via-[#8b6914] to-transparent sm:w-32"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ delay: 1.2, duration: 2.5, repeat: Infinity }}
        className="intro-scene-sub relative mt-5 font-display text-[10px] italic tracking-wide sm:text-[11px]"
      >
        Your invitation awaits…
      </motion.p>
    </motion.div>
  );
}
