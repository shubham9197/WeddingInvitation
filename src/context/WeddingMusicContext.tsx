"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { wedding } from "@/lib/wedding-data";

type WeddingMusicContextValue = {
  playing: boolean;
  toggle: () => void;
  tryPlay: () => void;
};

const WeddingMusicContext = createContext<WeddingMusicContextValue | null>(null);

export function WeddingMusicProvider({ children }: { children: ReactNode }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { src, volume, clipDurationSeconds, startAtSeconds } = wedding.music;
  const clipEnd = startAtSeconds + clipDurationSeconds;

  const handleAudioTimeUpdate = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.currentTime >= clipEnd) {
      audio.currentTime = startAtSeconds;
    }
  }, [clipEnd, startAtSeconds]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.addEventListener("timeupdate", handleAudioTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleAudioTimeUpdate);
  }, [handleAudioTimeUpdate]);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.currentTime = startAtSeconds;
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [volume, startAtSeconds]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const tryPlay = useCallback(() => {
    play();
  }, [play]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else play();
  }, [playing, pause, play]);

  return (
    <WeddingMusicContext.Provider value={{ playing, toggle, tryPlay }}>
      <audio ref={audioRef} src={src} preload="auto" loop={false} className="hidden" />
      {children}
    </WeddingMusicContext.Provider>
  );
}

export function useWeddingMusic() {
  const ctx = useContext(WeddingMusicContext);
  if (!ctx) {
    throw new Error("useWeddingMusic must be used within WeddingMusicProvider");
  }
  return ctx;
}
