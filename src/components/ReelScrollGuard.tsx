"use client";

import { useEffect } from "react";
import {
  HERO_SLIDE_INDEX,
  SAVE_THE_DATE_SLIDE_INDEX,
  useReelUnlock,
} from "@/context/ReelUnlockContext";
import { getReelScrollContainer, getReelSlideHeight } from "@/lib/reel-scroll";

/** Blocks reel scroll until Hero animation & Save the Date hearts are done */
export function ReelScrollGuard() {
  const { heroRevealed, saveDateRevealed } = useReelUnlock();

  useEffect(() => {
    const container = getReelScrollContainer();
    if (!container) return;

    const maxSlideIndex = !heroRevealed
      ? HERO_SLIDE_INDEX
      : !saveDateRevealed
        ? SAVE_THE_DATE_SLIDE_INDEX
        : -1;

    if (maxSlideIndex < 0) return;

    const clampScroll = () => {
      const maxTop = maxSlideIndex * getReelSlideHeight(container);
      if (container.scrollTop > maxTop + 8) {
        container.scrollTo({ top: maxTop, behavior: "smooth" });
      }
    };

    container.addEventListener("scroll", clampScroll, { passive: true });
    window.visualViewport?.addEventListener("resize", clampScroll);
    window.addEventListener("resize", clampScroll);

    return () => {
      container.removeEventListener("scroll", clampScroll);
      window.visualViewport?.removeEventListener("resize", clampScroll);
      window.removeEventListener("resize", clampScroll);
    };
  }, [heroRevealed, saveDateRevealed]);

  useEffect(() => {
    if (!heroRevealed) return;
    const container = getReelScrollContainer();
    if (!container) return;

    const t = setTimeout(() => {
      container.scrollTo({
        top: SAVE_THE_DATE_SLIDE_INDEX * getReelSlideHeight(container),
        behavior: "smooth",
      });
    }, 1800);

    return () => clearTimeout(t);
  }, [heroRevealed]);

  return null;
}
