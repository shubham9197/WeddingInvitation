"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const SMOOTH = [0.22, 1, 0.36, 1] as const;

const CORNERS = [
  "left-0 top-0 border-t-2 border-l-2 rounded-tl-sm",
  "right-0 top-0 border-t-2 border-r-2 rounded-tr-sm",
  "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-sm",
  "bottom-0 right-0 border-b-2 border-r-2 rounded-br-sm",
] as const;

type Props = {
  children: ReactNode;
  /** Changes when navigating photos — replays frame animation */
  photoKey: string | number;
};

export function GalleryPhotoFrame({ children, photoKey }: Props) {
  return (
    <motion.div
      key={photoKey}
      className="gallery-frame-root relative w-full max-w-md sm:max-w-lg"
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={{ duration: 0.5, ease: SMOOTH }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Outer maroon band — scales in */}
      <motion.div
        className="gallery-frame-outer pointer-events-none absolute -inset-2 rounded-xl sm:-inset-3"
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: SMOOTH }}
        aria-hidden
      />

      {/* Gold inner mat */}
      <motion.div
        className="gallery-frame-mat pointer-events-none absolute -inset-1 rounded-lg border border-[#e8c547]/50 sm:-inset-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, delay: 0.12, ease: SMOOTH }}
        aria-hidden
      />

      {/* Animated border lines (draw effect) */}
      <span className="gallery-frame-edge gallery-frame-edge--top" aria-hidden />
      <span className="gallery-frame-edge gallery-frame-edge--bottom" aria-hidden />
      <span className="gallery-frame-edge gallery-frame-edge--left" aria-hidden />
      <span className="gallery-frame-edge gallery-frame-edge--right" aria-hidden />

      {/* Corner brackets */}
      {CORNERS.map((cls, i) => (
        <motion.span
          key={cls}
          className={`gallery-frame-corner pointer-events-none absolute h-10 w-10 border-[#e8c547] sm:h-12 sm:w-12 ${cls}`}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 + i * 0.07, ease: SMOOTH }}
          aria-hidden
        />
      ))}

      {/* Shimmer sweep */}
      <motion.div
        className="gallery-frame-shimmer pointer-events-none absolute inset-0 overflow-hidden rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.3 }}
        aria-hidden
      >
        <motion.div
          className="absolute top-0 h-full w-1/2"
          style={{
            background:
              "linear-gradient(105deg, transparent 0%, rgba(255,248,224,0.12) 45%, rgba(255,255,255,0.28) 50%, transparent 100%)",
          }}
          initial={{ left: "-60%" }}
          animate={{ left: ["-60%", "130%"] }}
          transition={{ duration: 1.1, delay: 0.4, ease: SMOOTH }}
        />
      </motion.div>

      {/* Photo */}
      <div className="gallery-frame-photo relative h-[min(70dvh,80svh)] w-full overflow-hidden rounded-lg">
        {children}
      </div>
    </motion.div>
  );
}
