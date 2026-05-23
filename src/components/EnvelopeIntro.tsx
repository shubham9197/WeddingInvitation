"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { weddingShared } from "@/lib/i18n/shared";
import { useWeddingMusic } from "@/context/WeddingMusicContext";
import { WeddingIntroScene } from "./WeddingIntroScene";
import { WeddingEnvelope } from "./WeddingEnvelope";

type Props = { onOpen: () => void };

type Phase = "names" | "envelope" | "opening" | "emerge" | "done";

const SMOOTH = [0.22, 1, 0.36, 1] as const;

const SPARKLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  angle: (i / 12) * Math.PI * 2,
  delay: 0.08 + i * 0.04,
}));

const NAMES_DURATION_MS = 4500;
/** Flap open + brief hold before fade to Hero */
const OPEN_HOLD_MS = 3600;
const EMERGE_FADE_MS = 1100;

export function EnvelopeIntro({ onOpen }: Props) {
  const { tryPlay } = useWeddingMusic();
  const [phase, setPhase] = useState<Phase>("names");
  const { content } = useLanguage();
  const { couple, ui } = content;
  const initials = weddingShared.couple.sealInitials;
  const onOpenRef = useRef(onOpen);
  const openedMainRef = useRef(false);
  onOpenRef.current = onOpen;

  useEffect(() => {
    if (phase !== "names") return;
    const t = setTimeout(() => setPhase("envelope"), NAMES_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== "emerge") return;

    if (!openedMainRef.current) {
      openedMainRef.current = true;
      onOpenRef.current();
    }

    const t = setTimeout(() => setPhase("done"), EMERGE_FADE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  function handleOpen() {
    if (phase !== "envelope") return;
    tryPlay();
    setPhase("opening");
    setTimeout(() => setPhase("emerge"), OPEN_HOLD_MS);
  }

  const showEnvelope =
    phase === "envelope" || phase === "opening" || phase === "emerge";
  const isOpening = phase === "opening";
  const isEmerge = phase === "emerge";
  const backgroundBlurred = showEnvelope;

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          exit={{ opacity: 0 }}
          animate={{
            opacity: isEmerge ? 0 : 1,
            backgroundColor: isEmerge ? "rgba(10,8,8,0)" : "#0a0808",
          }}
          transition={{ duration: isEmerge ? 1.05 : 0.5, ease: SMOOTH }}
          className={`fixed inset-0 z-[80] overflow-hidden bg-[#0a0808] ${
            isEmerge ? "pointer-events-none" : ""
          }`}
        >
          <WeddingIntroScene
            blurred={backgroundBlurred}
            showNames={phase === "names"}
            groom={couple.groom}
            bride={couple.bride}
            celebration={ui.intro.celebration}
            invitationAwaits={ui.intro.invitationAwaits}
          />

          {isEmerge && (
            <motion.div
              className="absolute inset-0 z-[15] dark-shine-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, ease: SMOOTH }}
            />
          )}

          <AnimatePresence mode="wait">
            {showEnvelope && (
              <motion.div
                key="envelope-layer"
                initial={{ opacity: 0, scale: 0.88, y: 80 }}
                animate={{
                  opacity: isEmerge ? 0 : 1,
                  scale: isEmerge ? 0.92 : isOpening ? 1.03 : 1,
                  y: isEmerge ? -36 : 0,
                }}
                exit={{ opacity: 0, scale: 0.94, y: -24 }}
                transition={{ duration: isEmerge ? 1.05 : 0.95, ease: SMOOTH }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
              >
                <motion.div
                  className="relative"
                  style={{ cursor: phase === "envelope" ? "pointer" : "default" }}
                  onClick={handleOpen}
                  whileTap={phase === "envelope" ? { scale: 0.98 } : undefined}
                  animate={
                    phase === "envelope"
                      ? { y: [0, -10, 0] }
                      : { y: 0, scale: 1 }
                  }
                  transition={
                    phase === "envelope"
                      ? { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                      : { duration: 0.85, ease: SMOOTH }
                  }
                >
                  {isOpening &&
                    SPARKLES.map((s) => (
                      <motion.span
                        key={s.id}
                        initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                        animate={{
                          scale: [0, 1.15, 0],
                          opacity: [0, 0.85, 0],
                          x: Math.cos(s.angle) * 88,
                          y: Math.sin(s.angle) * 88,
                        }}
                        transition={{
                          duration: 1.15,
                          delay: s.delay,
                          ease: SMOOTH,
                        }}
                        className="pointer-events-none absolute left-1/2 top-1/2 z-40 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#e8c547]"
                      />
                    ))}

                  <div className="relative" style={{ perspective: 1200 }}>
                    <WeddingEnvelope
                      initials={initials}
                      opening={isOpening || isEmerge}
                      fading={isEmerge}
                      showTapHint={phase === "envelope"}
                      weddingLabel={ui.envelope.wedding}
                      invitationLabel={ui.envelope.invitation}
                    />
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
