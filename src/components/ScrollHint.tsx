"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function ScrollHint() {
  return (
    <motion.div
      className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-gold/45"
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <span className="font-body text-[10px] tracking-[0.25em] uppercase">Scroll</span>
      <ChevronDown size={18} />
    </motion.div>
  );
}
