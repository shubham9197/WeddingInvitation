"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const TAP_LOOP = {
  duration: 1.25,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

/** Yellow hand + “Tap here” — mount inside the envelope seal (parent = seal circle) */
export function TapFingerHint() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 overflow-visible"
      aria-hidden
    >
      {/* Pulse ring on seal */}
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-[#fff8e8]/55"
        animate={{ scale: [1, 1.45, 1], opacity: [0.7, 0, 0.7] }}
        transition={TAP_LOOP}
      />

      {/* Hand just above seal — taps down onto S&A */}
      <motion.div
        className="absolute bottom-full left-1/2 mb-0.5 flex -translate-x-1/2 flex-col items-center"
        animate={{ y: [0, 14, 0], scale: [1, 0.94, 1] }}
        transition={{
          ...TAP_LOOP,
          times: [0, 0.4, 1],
        }}
      >
        <Image
          src="/images/tap-hand.png"
          alt=""
          width={72}
          height={72}
          priority
          className="h-14 w-14 object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)] sm:h-16 sm:w-16"
        />
      </motion.div>

      {/* Tap here label below seal */}
      <motion.div
        className="absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#e8c547]/55 bg-black/70 px-3.5 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.5)] backdrop-blur-sm"
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={TAP_LOOP}
      >
        <span className="font-body text-[10px] font-semibold tracking-[0.22em] text-[#fff8e8] uppercase">
          Tap here
        </span>
      </motion.div>
    </div>
  );
}
