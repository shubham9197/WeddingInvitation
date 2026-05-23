"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ENTER_EASE = [0.16, 1, 0.3, 1] as const;
const ease = [0.22, 1, 0.36, 1] as const;

const TAP_LOOP = {
  duration: 1.25,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

type Props = {
  visible?: boolean;
  /** Fires when officer has arrived and Tap here should show */
  onOfficerReady?: () => void;
};

/** 3D traffic officer walks in, speaks, then Tap here appears */
export function VenueGuideHint({ visible = true, onOfficerReady }: Props) {
  const [phase, setPhase] = useState<"hidden" | "enter" | "speak" | "tap">("hidden");

  useEffect(() => {
    if (!visible) {
      setPhase("hidden");
      return;
    }
    setPhase("enter");
  }, [visible]);

  const handleOfficerLanded = () => {
    setPhase("speak");
    setTimeout(() => {
      setPhase("tap");
      onOfficerReady?.();
    }, 900);
  };

  if (!visible || phase === "hidden") return null;

  return (
    <>
      {/* Officer on map — walks in from left */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-full overflow-visible"
        aria-hidden
      >
        <motion.div
          className="absolute bottom-0 left-0 flex items-end"
          initial={{ x: "-55%", opacity: 0, scale: 0.88 }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            x: { duration: 1.15, ease: ENTER_EASE },
            opacity: { duration: 0.5, ease: "easeOut" },
            scale: { duration: 1.15, ease: ENTER_EASE },
          }}
          onAnimationComplete={handleOfficerLanded}
        >
          <motion.div
            className="relative"
            animate={
              phase === "enter"
                ? { y: [0, -2, 0, -1, 0] }
                : { y: [0, -3, 0] }
            }
            transition={
              phase === "enter"
                ? { duration: 1.1, ease: "easeInOut" }
                : { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <span className="absolute bottom-0 left-1/2 h-2 w-[70%] -translate-x-1/2 rounded-[100%] bg-black/50 blur-md" />
            <Image
              src="/images/traffic-officer.png"
              alt=""
              width={200}
              height={280}
              priority
              className="relative h-[7.5rem] w-auto max-w-[5.5rem] object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] sm:h-[8.75rem] sm:max-w-[6.5rem]"
              style={{ mixBlendMode: "screen" }}
            />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {(phase === "speak" || phase === "tap") && (
            <motion.div
              className="absolute bottom-[2.25rem] left-[4.5rem] max-w-[10rem] rounded-xl border border-gold/40 bg-black/85 px-2.5 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:bottom-[2.75rem] sm:left-[5.25rem] sm:max-w-[11rem]"
              initial={{ opacity: 0, scale: 0.85, x: -8 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.45, ease }}
            >
              <span className="absolute -left-1.5 bottom-3 h-2.5 w-2.5 rotate-45 border-b border-l border-gold/35 bg-black/85" />
              <p className="font-display text-[10px] leading-snug text-[#fff8e8] sm:text-[11px]">
                Need directions? Tap below — I&apos;ll guide you to the venue!
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

type VenueMapsCtaProps = {
  mapUrl: string;
  venueName: string;
  showTapHint: boolean;
  onDismiss: () => void;
};

/** Hand above → Open in Google Maps → Tap here below (all centered) */
export function VenueMapsCta({
  mapUrl,
  venueName,
  showTapHint,
  onDismiss,
}: VenueMapsCtaProps) {
  return (
    <div className="flex w-full flex-col items-center pt-1">
      <AnimatePresence>
        {showTapHint && (
          <motion.div
            key="venue-hand"
            className="pointer-events-none relative z-30 mb-1 flex flex-col items-center"
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.45, ease }}
            aria-hidden
          >
            <motion.div
              animate={{ y: [0, 10, 0], scale: [1, 0.94, 1] }}
              transition={{ ...TAP_LOOP, times: [0, 0.42, 1] }}
            >
              <Image
                src="/images/tap-hand.png"
                alt=""
                width={64}
                height={64}
                className="h-11 w-11 object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] sm:h-12 sm:w-12"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center">
        {showTapHint && (
          <motion.span
            className="pointer-events-none absolute -inset-2 rounded-full border-2 border-[#fff8e8]/30"
            animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }}
            transition={TAP_LOOP}
            aria-hidden
          />
        )}
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onDismiss}
          aria-label={`Open ${venueName} in Google Maps`}
          className={`relative z-30 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-body text-[10px] tracking-[0.15em] text-gold uppercase underline-offset-2 transition-all hover:bg-gold/10 hover:underline ${
            showTapHint
              ? "bg-gold/10 ring-2 ring-gold/50 ring-offset-2 ring-offset-[#121010]"
              : ""
          }`}
        >
          Open in Google Maps
          <ExternalLink size={12} className="shrink-0" />
        </a>
      </div>

      <AnimatePresence>
        {showTapHint && (
          <motion.div
            key="venue-tap-label"
            className="pointer-events-none relative z-30 mt-2"
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.45, delay: 0.12, ease }}
            aria-hidden
          >
            <motion.div
              className="whitespace-nowrap rounded-full border border-[#e8c547]/60 bg-black/80 px-3 py-1 shadow-[0_4px_16px_rgba(0,0,0,0.55)] backdrop-blur-sm"
              animate={{ opacity: [0.85, 1, 0.85] }}
              transition={TAP_LOOP}
            >
              <span className="font-body text-[9px] font-semibold tracking-[0.2em] text-[#fff8e8] uppercase sm:text-[10px]">
                Tap here
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
