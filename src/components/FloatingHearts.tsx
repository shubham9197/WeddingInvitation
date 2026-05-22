"use client";

import { motion } from "framer-motion";

const HEART_PATH =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";

/** 8 hearts spread across the viewport on every reel slide */
const HEARTS = [
  { left: "8%", top: "10%", size: 16, delay: 0 },
  { left: "82%", top: "8%", size: 14, delay: 0.35 },
  { left: "12%", top: "45%", size: 12, delay: 0.85 },
  { left: "78%", top: "42%", size: 16, delay: 0.2 },
  { left: "10%", top: "82%", size: 14, delay: 0.6 },
  { left: "85%", top: "78%", size: 15, delay: 1.0 },
  { left: "48%", top: "18%", size: 12, delay: 0.5 },
  { left: "50%", top: "72%", size: 14, delay: 0.75 },
] as const;

function Heart({
  left,
  top,
  size,
  delay,
}: {
  left: string;
  top: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute text-[#e8c547]"
      style={{
        left,
        top,
        width: size,
        height: size,
        filter: "drop-shadow(0 0 8px rgba(232, 197, 71, 0.45))",
      }}
      animate={{
        y: [0, -14, 0],
        scale: [1, 1.12, 1, 1.06, 1],
        opacity: [0.32, 0.58, 0.32],
        rotate: [0, 6, -6, 0],
      }}
      transition={{
        duration: 4.5,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full fill-current" aria-hidden>
        <path d={HEART_PATH} />
      </svg>
    </motion.div>
  );
}

/** Small gold hearts on every page (fixed behind content) */
export function FloatingHearts() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
      aria-hidden
    >
      {HEARTS.map((h, i) => (
        <Heart key={i} {...h} />
      ))}
    </div>
  );
}
