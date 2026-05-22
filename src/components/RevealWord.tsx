"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  index: number;
  startMs: number;
  intervalMs?: number;
  instant?: boolean;
  className?: string;
};

export function RevealWord({
  children,
  index,
  startMs,
  intervalMs = 400,
  instant = false,
  className = "",
}: Props) {
  const [visible, setVisible] = useState(instant);

  useEffect(() => {
    if (instant) {
      setVisible(true);
      return;
    }
    const t = setTimeout(() => setVisible(true), startMs + index * intervalMs);
    return () => clearTimeout(t);
  }, [index, startMs, intervalMs, instant]);

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{
        opacity: instant ? 1 : 0,
        y: instant ? 0 : 8,
        filter: instant ? "blur(0px)" : "blur(3px)",
      }}
      animate={
        visible
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 8, filter: "blur(3px)" }
      }
      transition={{
        duration: instant ? 0 : 0.42,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.span>
  );
}
