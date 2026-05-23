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
      className="reel-slide reel-slide--tall reel-slide--compact-start relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden overflow-y-visible mobile-safe-x px-3 py-4 pb-[max(5rem,calc(env(safe-area-inset-bottom)+3.5rem))] pt-[max(0.5rem,env(safe-area-inset-top))] sm:px-6 sm:py-6 sm:pb-[max(4.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="mx-auto w-full max-w-md shrink-0">
        <GaneshaBlessing key={playKey} />
      </div>
      {heroRevealed && <ScrollHint />}
    </section>
  );
}
