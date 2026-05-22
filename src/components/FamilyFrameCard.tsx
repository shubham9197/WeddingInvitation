"use client";

import Image from "next/image";
import type { ReactNode } from "react";

/** Must match public/images/family-card-frame.png */
export const FAMILY_FRAME_W = 960;
export const FAMILY_FRAME_H = 640;
export const FAMILY_FRAME_SRC = `/images/family-card-frame.png?v=${FAMILY_FRAME_W}x${FAMILY_FRAME_H}`;

/** Zoom crops empty margin in the PNG */
const FRAME_ZOOM = 1.18;

/** Safe zone — clears corner florals (top-left & bottom-right) */
export const FAMILY_FRAME_INSET = {
  top: "16%",
  right: "14%",
  bottom: "16%",
  left: "14%",
} as const;

type Props = {
  children: ReactNode;
  className?: string;
};

export function FamilyFrameCard({ children, className = "" }: Props) {
  return (
    <div
      className={`relative aspect-[960/640] w-full max-w-md overflow-hidden sm:max-w-lg ${className}`}
    >
      <Image
        src={FAMILY_FRAME_SRC}
        alt=""
        width={FAMILY_FRAME_W}
        height={FAMILY_FRAME_H}
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ transform: `scale(${FRAME_ZOOM})` }}
        sizes="(max-width: 512px) 92vw, 480px"
      />

      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={FAMILY_FRAME_INSET}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-1 px-1 sm:gap-1.5">
          {children}
        </div>
      </div>
    </div>
  );
}
