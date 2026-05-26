"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/** Hand sweeps English → Marathi → English below the toggle */
export function LanguageSelectHint() {
  return (
    <motion.div
      className="pointer-events-none relative mt-1 h-10 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-hidden
    >
      <motion.div
        className="absolute bottom-0 -translate-x-1/2"
        animate={{
          left: ["22%", "78%", "22%"],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          animate={{ y: [0, -5, 0], scale: [1, 0.95, 1] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/tap-hand.png"
            alt=""
            width={64}
            height={64}
            priority
            className="h-9 w-9 rotate-180 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)] sm:h-10 sm:w-10"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
