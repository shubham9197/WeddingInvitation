"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/**
 * Unique countdown frame — gold gradient ring + dark inner panel + L-corner accents.
 * Styles live in globals.css (.countdown-frame, .countdown-frame__inner).
 */
export function CountdownFrameCard({ children, className = "" }: Props) {
  return (
    <div
      className={`countdown-frame mx-auto w-full max-w-[min(96vw,400px)] sm:max-w-md ${className}`}
    >
      <div className="countdown-frame__inner frame-border relative px-5 py-6 text-center sm:px-7 sm:py-8">
        {children}
      </div>
    </div>
  );
}
