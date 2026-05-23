"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollHint() {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-0.5 text-gold/40"
      animate={{ y: [0, 5, 0] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <span className="font-body text-[9px] tracking-[0.22em] uppercase sm:text-[10px] sm:tracking-[0.25em]">
        Scroll
      </span>
      <ChevronDown className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
    </motion.div>
  );
}
