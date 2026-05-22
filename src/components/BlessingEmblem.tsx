"use client";

import { useId } from "react";
import { motion } from "framer-motion";

type Props = {
  className?: string;
  size?: number;
  pulse?: boolean;
};

/** Golden namaste + lotus — wedding blessing emblem (no emoji) */
export function BlessingEmblem({ className = "", size = 72, pulse = true }: Props) {
  const uid = useId().replace(/:/g, "");
  const gold = `blessing-gold-${uid}`;
  const glow = `blessing-glow-${uid}`;
  const softGlow = `blessing-soft-${uid}`;

  return (
    <motion.svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      aria-hidden
      animate={
        pulse
          ? {
              opacity: [0.75, 1, 0.75],
              scale: [1, 1.04, 1],
            }
          : undefined
      }
      transition={
        pulse
          ? { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      <defs>
        <linearGradient id={gold} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8e0" />
          <stop offset="40%" stopColor="#e8c547" />
          <stop offset="100%" stopColor="#9a7b1a" />
        </linearGradient>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(232,196,71,0.35)" />
          <stop offset="100%" stopColor="rgba(232,196,71,0)" />
        </radialGradient>
        <filter id={softGlow}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx="60" cy="60" r="56" fill={`url(#${glow})`} />
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth="1"
        opacity="0.5"
      />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth="0.6"
        strokeDasharray="4 6"
        opacity="0.35"
      />

      {/* Lotus base */}
      <g fill={`url(#${gold})`} opacity="0.85">
        <ellipse cx="60" cy="88" rx="22" ry="6" opacity="0.4" />
        <path d="M60 78 C48 82 42 90 60 94 C78 90 72 82 60 78Z" />
        <path d="M60 76 C52 80 46 86 60 90 C74 86 68 80 60 76Z" opacity="0.7" />
        <path d="M48 84 C44 88 52 92 60 90 C68 92 76 88 72 84 C66 86 54 86 48 84Z" opacity="0.5" />
      </g>

      {/* Namaste hands */}
      <g
        filter={`url(#${softGlow})`}
        fill="none"
        stroke={`url(#${gold})`}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M42 52 L42 38 C42 32 48 28 54 30 L58 34" />
        <path d="M78 52 L78 38 C78 32 72 28 66 30 L62 34" />
        <path d="M54 30 L60 26 L66 30" />
        <path d="M50 52 L60 58 L70 52" />
        <path d="M56 58 L60 64 L64 58" />
        <path d="M48 44 L52 48 M72 44 L68 48" opacity="0.6" strokeWidth="1.2" />
      </g>

      {/* Spark accents */}
      <g fill="#e8c547" opacity="0.7">
        <circle cx="60" cy="18" r="1.5" />
        <circle cx="28" cy="42" r="1" />
        <circle cx="92" cy="42" r="1" />
        <circle cx="22" cy="68" r="0.8" />
        <circle cx="98" cy="68" r="0.8" />
      </g>
    </motion.svg>
  );
}

/** Small floating lotus sparkle */
export function LotusSpark({ className = "", size = 20 }: { className?: string; size?: number }) {
  const gradId = `lotus-spark-${size}`;
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff8e0" />
          <stop offset="100%" stopColor="#c9a227" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradId})`}
        opacity="0.9"
        d="M16 8c-2 4-6 5-6 9s4 7 6 11 6-7 6-11-4-5-6-9zm0 14c-1.5-2-3-3.5-3-5.5s1.5-4 3-6 3 4 3 6-1.5 3.5-3 5.5z"
      />
      <circle cx="16" cy="6" r="1" fill="#e8c547" opacity="0.8" />
    </svg>
  );
}
