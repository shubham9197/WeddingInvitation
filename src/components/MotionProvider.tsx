"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Shared motion settings — use `motion` (not LazyMotion `m`) across the app */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
