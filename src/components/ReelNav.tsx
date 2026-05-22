"use client";

import { useEffect, useState } from "react";
import {
  HERO_SLIDE_INDEX,
  SAVE_THE_DATE_SLIDE_INDEX,
  useReelUnlock,
} from "@/context/ReelUnlockContext";

const SLIDES = [
  "intro",
  "date",
  "countdown",
  "events",
  "gallery",
  "venue",
  "family",
  "rsvp",
];

export function ReelNav() {
  const { heroRevealed, saveDateRevealed } = useReelUnlock();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = document.getElementById("reel-scroll");
    if (!container) return;

    const onScroll = () => {
      const idx = Math.round(container.scrollTop / container.clientHeight);
      setActive(Math.min(idx, SLIDES.length - 1));
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  function goTo(i: number) {
    if (!heroRevealed && i > HERO_SLIDE_INDEX) return;
    if (!saveDateRevealed && i > SAVE_THE_DATE_SLIDE_INDEX) return;
    const container = document.getElementById("reel-scroll");
    if (!container) return;
    container.scrollTo({ top: i * container.clientHeight, behavior: "smooth" });
  }

  return (
    <nav className="fixed right-[max(0.5rem,env(safe-area-inset-right))] top-1/2 z-50 flex -translate-y-1/2 flex-col gap-2.5">
      {SLIDES.map((_, i) => (
        <button
          key={SLIDES[i]}
          type="button"
          onClick={() => goTo(i)}
          disabled={
            (!heroRevealed && i > HERO_SLIDE_INDEX) ||
            (!saveDateRevealed && i > SAVE_THE_DATE_SLIDE_INDEX)
          }
          aria-label={`Go to slide ${i + 1}`}
          className={`min-h-[10px] min-w-[10px] rounded-full transition-all duration-300 ${
            active === i
              ? "h-2.5 w-2.5 bg-gold shadow-[0_0_8px_rgba(232,197,71,0.6)]"
              : "h-2 w-2 bg-gold/30"
          } ${
            (!heroRevealed && i > HERO_SLIDE_INDEX) ||
            (!saveDateRevealed && i > SAVE_THE_DATE_SLIDE_INDEX)
              ? "cursor-not-allowed opacity-20"
              : ""
          }`}
        />
      ))}
    </nav>
  );
}
