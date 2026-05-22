"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export const HERO_SLIDE_INDEX = 0;
/** Save the Date slide in #reel-scroll */
export const SAVE_THE_DATE_SLIDE_INDEX = 1;
export const COUNTDOWN_SLIDE_INDEX = 2;

type ReelUnlockContextValue = {
  heroRevealed: boolean;
  unlockHero: () => void;
  saveDateRevealed: boolean;
  unlockSaveDate: () => void;
};

const ReelUnlockContext = createContext<ReelUnlockContextValue | null>(null);

export function ReelUnlockProvider({ children }: { children: ReactNode }) {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [saveDateRevealed, setSaveDateRevealed] = useState(false);
  const unlockHero = useCallback(() => setHeroRevealed(true), []);
  const unlockSaveDate = useCallback(() => setSaveDateRevealed(true), []);

  return (
    <ReelUnlockContext.Provider
      value={{ heroRevealed, unlockHero, saveDateRevealed, unlockSaveDate }}
    >
      {children}
    </ReelUnlockContext.Provider>
  );
}

export function useReelUnlock() {
  const ctx = useContext(ReelUnlockContext);
  if (!ctx) {
    throw new Error("useReelUnlock must be used within ReelUnlockProvider");
  }
  return ctx;
}
