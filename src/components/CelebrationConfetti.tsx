"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const COLORS = ["#e8c547", "#f5a8b8", "#b87363", "#9e2a4a", "#fff4d6", "#d4af37"];

export const CONFETTI_BURST_MS = 5000;
export const CONFETTI_FADE_MS = 1500;

type Props = {
  active: boolean;
  /** How long new confetti is emitted */
  durationMs?: number;
  /** Opacity fade-out length after burst ends */
  fadeOutMs?: number;
  onComplete?: () => void;
};

export function CelebrationConfetti({
  active,
  durationMs = CONFETTI_BURST_MS,
  fadeOutMs = CONFETTI_FADE_MS,
  onComplete,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [running, setRunning] = useState(true);
  const [fading, setFading] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const wasActiveRef = useRef(false);
  const visibleRef = useRef(false);
  const fadingRef = useRef(false);

  visibleRef.current = visible;
  fadingRef.current = fading;

  const beginFadeOut = useCallback(() => {
    if (fadingRef.current) return;
    setRunning(false);
    setFading(true);
  }, []);

  useEffect(() => {
    const update = () => {
      const vp = window.visualViewport;
      setSize({
        width: vp?.width ?? window.innerWidth,
        height: vp?.height ?? window.innerHeight,
      });
    };
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);

  /** Start burst when active turns on */
  useEffect(() => {
    if (!active || wasActiveRef.current) return;

    wasActiveRef.current = true;
    setVisible(true);
    setRunning(true);
    setFading(false);

    const burstEnd = setTimeout(beginFadeOut, durationMs);
    return () => clearTimeout(burstEnd);
  }, [active, durationMs, beginFadeOut]);

  /** Smooth stop when parent sets active false (e.g. Save the Date / RSVP) */
  useEffect(() => {
    if (active) return;

    wasActiveRef.current = false;
    if (visibleRef.current && !fadingRef.current) {
      beginFadeOut();
    }
  }, [active, beginFadeOut]);

  return (
    <AnimatePresence>
      {visible && size.width > 0 && (
        <motion.div
          key="confetti-layer"
          className="pointer-events-none fixed inset-0 z-[90]"
          initial={{ opacity: 1 }}
          animate={{ opacity: fading ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: fadeOutMs / 1000, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => {
            if (!fading) return;
            setVisible(false);
            setFading(false);
            setRunning(true);
            onComplete?.();
          }}
        >
          <Confetti
            width={size.width}
            height={size.height}
            run={running || fading}
            recycle={running}
            numberOfPieces={400}
            gravity={0.1}
            friction={0.99}
            wind={0.02}
            colors={COLORS}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
