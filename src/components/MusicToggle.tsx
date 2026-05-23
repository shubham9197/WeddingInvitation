"use client";

import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { useWeddingMusic } from "@/context/WeddingMusicContext";

export function MusicToggle() {
  const { playing, toggle } = useWeddingMusic();

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.92 }}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-[#1a1512]/90 text-gold shadow-[0_0_20px_rgba(201,162,39,0.2)] backdrop-blur-sm"
      aria-label={playing ? "Mute music" : "Play music"}
      aria-pressed={playing}
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </motion.button>
  );
}
