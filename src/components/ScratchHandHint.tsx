"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const TAP_LOOP = {
  duration: 1.25,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

const ease = [0.22, 1, 0.36, 1] as const;

/** Hand above the heart — points down */
export function ScratchHandAbove() {
  return (
    <motion.div
      className="pointer-events-none mb-1 flex flex-col items-center"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease }}
      aria-hidden
    >
      <motion.div
        animate={{ y: [0, 10, 0], scale: [1, 0.94, 1] }}
        transition={{ ...TAP_LOOP, times: [0, 0.4, 1] }}
      >
        <Image
          src="/images/tap-hand.png"
          alt=""
          width={72}
          height={72}
          className="h-11 w-11 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] sm:h-12 sm:w-12"
        />
      </motion.div>
    </motion.div>
  );
}

/** Pulse ring on the heart center */
export function ScratchHeartPulse() {
  return (
    <motion.span
      className="pointer-events-none absolute inset-[10%] z-[15] rounded-full border-2 border-[#fff8e8]/45"
      animate={{ scale: [1, 1.2, 1], opacity: [0.65, 0, 0.65] }}
      transition={TAP_LOOP}
      aria-hidden
    />
  );
}

/** Tap here label below the heart */
export function ScratchTapBelow() {
  const { content } = useLanguage();

  return (
    <motion.div
      className="pointer-events-none mt-1.5 flex flex-col items-center"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1, ease }}
      aria-hidden
    >
      <motion.div
        className="whitespace-nowrap rounded-full border border-[#e8c547]/55 bg-black/70 px-3 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-sm"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={TAP_LOOP}
      >
        <span className="font-body text-[9px] font-semibold tracking-[0.18em] text-[#fff8e8] uppercase sm:text-[10px] sm:tracking-[0.22em]">
          {content.ui.tapHere}
        </span>
      </motion.div>
    </motion.div>
  );
}
