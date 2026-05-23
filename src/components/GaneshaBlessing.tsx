"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RevealWord } from "./RevealWord";
import { WeddingInviteCard } from "./WeddingInviteCard";
import { useReelUnlock } from "@/context/ReelUnlockContext";

const GANESHA_REVEAL_MS = 2400;
const WORD_INTERVAL_MS = 400;
const GAP_AFTER_GANESHA_MS = 350;
const GAP_AFTER_SHLOKA_MS = 450;

/** Invite name/tagline sequence after showInvite */
const INVITE_SEQUENCE_MS = 5200;

const SHLOKA_WORDS = [
  "वक्रतुण्ड",
  "महाकाय",
  "सूर्यकोटि",
  "समप्रभ ॥",
  "निर्विघ्नं",
  "कुरु",
  "मे",
  "देव",
  "सर्वकार्येषु",
  "सर्वदा ॥",
];

export function GaneshaBlessing() {
  const { heroRevealed, unlockHero } = useReelUnlock();
  const [ganeshaDone, setGaneshaDone] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  useEffect(() => {
    if (!ganeshaDone) return;
    const t = setTimeout(
      () => setShowInvite(true),
      GAP_AFTER_GANESHA_MS +
        (SHLOKA_WORDS.length - 1) * WORD_INTERVAL_MS +
        550 +
        GAP_AFTER_SHLOKA_MS
    );
    return () => clearTimeout(t);
  }, [ganeshaDone]);

  useEffect(() => {
    if (!showInvite || heroRevealed) return;
    const t = setTimeout(() => unlockHero(), INVITE_SEQUENCE_MS);
    return () => clearTimeout(t);
  }, [showInvite, heroRevealed, unlockHero]);

  return (
    <motion.div
      className="mobile-card dark-card frame-border relative mx-auto w-full overflow-hidden px-2.5 py-3 sm:px-6 sm:py-7"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="relative mx-auto flex justify-center">
        <motion.div
          className="pointer-events-none absolute -inset-3 rounded-xl"
          animate={
            ganeshaDone
              ? { opacity: [0.35, 0.6, 0.35] }
              : { opacity: 0.25 }
          }
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            background:
              "radial-gradient(ellipse, rgba(201,162,39,0.3) 0%, transparent 70%)",
          }}
        />

        <motion.div
          className="ganesha-hero-size relative z-10 aspect-[165/195] w-[min(38vw,150px)] overflow-hidden sm:w-[min(42vw,165px)]"
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{
            duration: GANESHA_REVEAL_MS / 1000,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          onAnimationComplete={() => setGaneshaDone(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ganesha-golden.png"
            alt="Lord Ganesha"
            width={165}
            height={195}
            sizes="(max-width: 380px) 42vw, 165px"
            className="ganesha-on-dark block h-full w-full object-contain object-center"
            draggable={false}
          />
        </motion.div>
      </div>

      {ganeshaDone && (
        <motion.div
          className="hero-shloka-block relative mt-3 w-full border-y border-gold/20 py-3 sm:mt-5 sm:py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-2 text-center">
            {SHLOKA_WORDS.map((word, i) => (
              <RevealWord
                key={`${word}-${i}`}
                index={i}
                startMs={GAP_AFTER_GANESHA_MS}
                intervalMs={WORD_INTERVAL_MS}
                className="shloka-gold font-devanagari text-[11px] font-semibold sm:text-sm"
              >
                {word}
              </RevealWord>
            ))}
          </div>
        </motion.div>
      )}

      {showInvite && (
        <div className="mt-1 w-full sm:mt-2">
          <WeddingInviteCard embedded heroSequence />
        </div>
      )}

      {!heroRevealed && (
        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-2 text-center font-body text-[9px] tracking-[0.12em] text-gold/45 sm:mt-4 sm:text-[10px]"
        >
          Please wait for the blessing to finish…
        </motion.p>
      )}
    </motion.div>
  );
}
