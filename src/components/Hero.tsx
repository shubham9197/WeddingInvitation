"use client";

import { GaneshaBlessing } from "./GaneshaBlessing";
import { ScrollHint } from "./ScrollHint";
import { useReelUnlock } from "@/context/ReelUnlockContext";
import { useSlideReplay } from "@/hooks/useSlideReplay";

export function Hero() {
  const { heroRevealed } = useReelUnlock();
  const { ref, playKey } = useSlideReplay();

  return (
    <section
      ref={ref}
      className="reel-slide relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden overflow-y-auto mobile-safe-x px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-8"
    >
      <GaneshaBlessing key={playKey} />
      {heroRevealed && <ScrollHint />}
    </section>
  );
}
