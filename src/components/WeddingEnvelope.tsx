"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TapFingerHint } from "./TapFingerHint";

const SMOOTH = [0.22, 1, 0.36, 1] as const;

type Props = {
  initials: string;
  opening: boolean;
  weddingLabel: string;
  invitationLabel: string;
  /** Hide maroon frame when image expands to fullscreen */
  hideFrame?: boolean;
  /** Fade out during emerge to Hero */
  fading?: boolean;
  /** Show tap hand on the seal */
  showTapHint?: boolean;
};

/** Indian wedding envelope with Shankar–Parvati hands artwork */
export function WeddingEnvelope({
  initials,
  opening,
  weddingLabel,
  invitationLabel,
  hideFrame = false,
  fading = false,
  showTapHint = false,
}: Props) {
  return (
    <div
      className="relative mx-auto w-[min(88vw,300px)] sm:w-[320px]"
      style={{ aspectRatio: "3/4", perspective: 1200, transformStyle: "preserve-3d" }}
    >
      <motion.div
        className={`relative h-full w-full rounded-lg ${
          showTapHint ? "overflow-visible" : "overflow-hidden"
        }`}
        animate={{
          opacity: hideFrame || fading ? 0 : 1,
          scale: hideFrame ? 0.95 : fading ? 0.9 : opening ? 1.02 : 1,
          y: fading ? -28 : 0,
        }}
        transition={{ duration: fading ? 1.1 : 0.65, ease: SMOOTH }}
        style={{
          boxShadow: hideFrame
            ? "none"
            : "0 0 0 3px #c9a227, 0 0 0 6px #7a1530, 0 28px 60px rgba(92,21,48,0.45)",
          willChange: "transform, opacity",
        }}
      >
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: "linear-gradient(145deg, #9e1f3d 0%, #6b1228 50%, #5c0f28 100%)",
          }}
        />
        <div className="absolute inset-[10px] rounded-md border border-[#e8c547]/70" />

        <CornerLotus className="left-3 top-3" />
        <CornerLotus className="right-3 top-3 scale-x-[-1]" />
        <CornerLotus className="bottom-3 left-3 scale-y-[-1]" />
        <CornerLotus className="bottom-3 right-3 scale-x-[-1] scale-y-[-1]" />

        <motion.div
          id="envelope-art"
          className="absolute z-[1] overflow-hidden rounded-sm"
          style={{
            top: "14%",
            left: "7%",
            right: "7%",
            bottom: "8%",
            background: "#0a0a0a",
            boxShadow:
              "inset 0 0 0 2px rgba(201,162,39,0.45), 0 4px 24px rgba(0,0,0,0.4)",
          }}
          animate={
            opening
              ? { scale: 1.06, y: -6, boxShadow: "inset 0 0 0 2px rgba(232,197,71,0.65), 0 12px 40px rgba(0,0,0,0.5)" }
              : { scale: 1, y: 0 }
          }
          transition={{ duration: 1.35, ease: SMOOTH, delay: opening ? 0.25 : 0 }}
        >
          <Image
            src="/shiva-parvati-hands.png"
            alt="Shankar and Parvati — joined hands"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 320px) 88vw, 300px"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 85% 75% at 50% 55%, transparent 40%, rgba(92,21,48,0.35) 100%)",
            }}
          />
        </motion.div>

        <motion.div
          className="absolute left-0 right-0 top-0 z-[5] origin-top overflow-hidden rounded-t-lg"
          style={{
            height: "46%",
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
          animate={
            opening
              ? { rotateX: -168, opacity: 0.15 }
              : { rotateX: 0, opacity: 1 }
          }
          transition={{
            duration: 1.35,
            ease: SMOOTH,
            opacity: { duration: 1.1, ease: "easeOut" },
          }}
        >
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(180deg, #a82845 0%, #7a1530 42%, #5c0f28 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              background:
                "linear-gradient(180deg, rgba(255,248,224,0.12) 0%, transparent 45%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              border: "2px solid rgba(232,197,71,0.45)",
              borderBottom: "none",
            }}
          />

          {/* Title sits in the flat top band of the flap — not clipped by the triangle point */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] flex h-[38%] min-h-[4.5rem] flex-col items-center justify-center px-4 pt-1 text-center">
            <p className="font-script text-[clamp(1.65rem,7.5vw,2rem)] leading-[0.95] shimmer-gold drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
              {weddingLabel}
            </p>
            <p className="mt-0.5 font-script text-[clamp(1.25rem,5.5vw,1.55rem)] leading-none tracking-[0.06em] text-[#fff8e8] drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
              {invitationLabel}
            </p>
            <div className="mt-2 h-px w-14 bg-gradient-to-r from-transparent via-[#e8c547]/80 to-transparent" />
          </div>
        </motion.div>

        <motion.div
          className="absolute left-1/2 z-[6] flex items-center justify-center overflow-visible rounded-full"
          style={{
            top: "46%",
            width: "4.75rem",
            height: "4.75rem",
            marginLeft: "-2.375rem",
            background:
              "radial-gradient(circle at 35% 30%, #d4af37 0%, #9a7b1a 40%, #6b5210 100%)",
            boxShadow:
              "0 0 0 3px rgba(255,248,224,0.45), 0 8px 32px rgba(0,0,0,0.45), inset 0 2px 10px rgba(255,255,255,0.45)",
          }}
          animate={
            opening
              ? { scale: 0, opacity: 0, rotate: 180 }
              : { scale: [1, 1.05, 1], opacity: 1, rotate: 0 }
          }
          transition={
            opening
              ? { duration: 0.7, ease: SMOOTH, delay: 0.12 }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <span className="relative z-[1] font-script text-[1.65rem] tracking-wide text-[#fff8e8] [font-variant-ligatures:none]">
            {initials}
          </span>
          {showTapHint && <TapFingerHint />}
        </motion.div>

        {!opening && !hideFrame && !fading && (
          <motion.div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden rounded-lg">
            <motion.div
              className="absolute top-0 h-full w-1/3"
              style={{
                background:
                  "linear-gradient(105deg, transparent 0%, rgba(255,248,224,0.2) 48%, rgba(255,255,255,0.35) 50%, transparent 100%)",
              }}
              animate={{ left: ["-40%", "140%"] }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1.2,
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

function CornerLotus({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className={`pointer-events-none absolute z-[3] opacity-75 ${className ?? ""}`}
      aria-hidden
    >
      <circle cx="14" cy="14" r="11" fill="none" stroke="#e8c547" strokeWidth="0.8" />
      {[0, 72, 144, 216, 288].map((rot) => (
        <ellipse
          key={rot}
          cx="14"
          cy="6"
          rx="3"
          ry="7"
          fill="#e8c547"
          opacity="0.55"
          transform={`rotate(${rot} 14 14)`}
        />
      ))}
    </svg>
  );
}
