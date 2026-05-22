"use client";

import Image from "next/image";
import type { ReactNode } from "react";

/** Must match public/images/event-card-frame.png */
export const EVENT_FRAME_W = 980;
export const EVENT_FRAME_H = 800;
export const EVENT_FRAME_SRC = `/images/event-card-frame.png?v=${EVENT_FRAME_W}x${EVENT_FRAME_H}`;

/** Zoom crops empty dark margin baked into the PNG */
const FRAME_ZOOM = 1.22;

/** Safe zone inside the golden frame (after zoom crop) */
export const EVENT_FRAME_INSET = {
  top: "13%",
  right: "14%",
  bottom: "14%",
  left: "14%",
} as const;

type Props = {
  children: ReactNode;
  className?: string;
};

export function EventFrameCard({ children, className = "" }: Props) {
  return (
    <div
      className={`relative aspect-square w-[min(90vw,340px)] overflow-hidden sm:w-[min(88vw,360px)] ${className}`}
    >
      <Image
        src={EVENT_FRAME_SRC}
        alt=""
        width={EVENT_FRAME_W}
        height={EVENT_FRAME_H}
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ transform: `scale(${FRAME_ZOOM})` }}
        sizes="(max-width: 400px) 90vw, 360px"
      />

      <div
        className="absolute flex flex-col items-center justify-center text-center"
        style={EVENT_FRAME_INSET}
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 sm:gap-2">
          {children}
        </div>
      </div>
    </div>
  );
}
