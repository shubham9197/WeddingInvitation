"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { RevealWord } from "./RevealWord";

const WORD_MS = 380;
type Props = {
  animate?: boolean;
  className?: string;
  embedded?: boolean;
  /** Ganesha hero: families word-by-word, request fade, names slide, & center */
  heroSequence?: boolean;
  wordByWord?: boolean;
  wordStartMs?: number;
  wordIntervalMs?: number;
  instant?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function WeddingInviteCard({
  animate = false,
  className = "",
  embedded = false,
  heroSequence = false,
  wordByWord = false,
  wordStartMs = 0,
  wordIntervalMs = 400,
  instant = false,
}: Props) {
  const { content } = useLanguage();
  const { couple, ui } = content;
  const { familiesWords, requestLine } = ui.invite;

  const shellClass = embedded
    ? `relative px-1 py-3 text-center sm:px-2 sm:py-6 ${className}`
    : `invite-card frame-border relative px-6 py-10 text-center sm:px-10 sm:py-14 ${className}`;

  if (heroSequence) {
    const familiesEnd = familiesWords.length * WORD_MS + 300;
    const requestDelay = familiesEnd / 1000;
    const groomDelay = requestDelay + 0.85;
    const ampDelay = groomDelay + 0.55;
    const brideDelay = ampDelay + 0.45;
    const taglineDelay = brideDelay + 0.65;

    return (
      <div className={shellClass}>
        <p className="font-body text-[9px] tracking-[0.28em] text-gold/55 uppercase sm:text-[10px] sm:tracking-[0.4em]">
          {familiesWords.map((w, i) => (
            <RevealWord
              key={w}
              index={i}
              startMs={200}
              intervalMs={WORD_MS}
              className="mr-1.5"
            >
              {w}
            </RevealWord>
          ))}
        </p>

        <motion.p
          className="mt-3 font-display text-[11px] leading-snug tracking-[0.14em] text-gold/65 uppercase sm:mt-6 sm:text-sm sm:tracking-[0.2em]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: requestDelay, duration: 0.65, ease }}
        >
          {requestLine}
        </motion.p>

        <motion.h1
          className="invite-hero-name mt-3 overflow-hidden font-script text-maroon sm:mt-6"
          initial={{ opacity: 0, x: -72 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: groomDelay, duration: 0.75, ease }}
        >
          {couple.groom}
        </motion.h1>

        <div className="my-1.5 flex items-center justify-center gap-2 sm:my-3 sm:gap-3">
          <motion.span
            className="h-px bg-gradient-to-r from-transparent to-gold"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 36, opacity: 1 }}
            transition={{ delay: ampDelay, duration: 0.5, ease }}
          />
          <motion.span
            className="font-script text-2xl shimmer-gold inline-block sm:text-3xl"
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: ampDelay + 0.12, duration: 0.55, ease }}
          >
            &
          </motion.span>
          <motion.span
            className="h-px bg-gradient-to-l from-transparent to-gold"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 36, opacity: 1 }}
            transition={{ delay: ampDelay, duration: 0.5, ease }}
          />
        </div>

        <motion.h1
          className="invite-hero-name overflow-hidden font-script text-maroon"
          initial={{ opacity: 0, x: 72 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: brideDelay, duration: 0.75, ease }}
        >
          {couple.bride}
        </motion.h1>

        <motion.p
          className="mt-4 font-display text-sm italic text-gold/55 sm:mt-8 sm:text-base"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: taglineDelay, duration: 0.6, ease }}
        >
          {couple.tagline}
        </motion.p>
      </div>
    );
  }

  if (wordByWord) {
    let idx = 0;
    const next = () => idx++;
    const line1 = ["Together", "with", "their", "families"];
    const line2 = [
      "Request",
      "the",
      "pleasure",
      "of",
      "your",
      "company",
      "at",
      "the",
      "wedding",
      "of",
    ];

    return (
      <div className={shellClass}>
        <p className="font-body text-[10px] tracking-[0.4em] text-gold/55 uppercase">
          {line1.map((w) => (
            <RevealWord
              key={w}
              index={next()}
              startMs={wordStartMs}
              intervalMs={wordIntervalMs}
              instant={instant}
              className="mr-1.5"
            >
              {w}
            </RevealWord>
          ))}
        </p>
        <p className="mt-6 font-display text-sm tracking-[0.2em] text-gold/65 uppercase">
          {line2.map((w) => (
            <RevealWord
              key={w}
              index={next()}
              startMs={wordStartMs}
              intervalMs={wordIntervalMs}
              instant={instant}
              className="mr-1.5"
            >
              {w}
            </RevealWord>
          ))}
        </p>
        <h1 className="mt-6 font-script text-[clamp(2.75rem,12vw,4.5rem)] leading-none text-maroon">
          <RevealWord
            index={next()}
            startMs={wordStartMs}
            intervalMs={wordIntervalMs}
            instant={instant}
          >
            {couple.groom}
          </RevealWord>
        </h1>
        <div className="my-3 flex items-center justify-center gap-3">
          <RevealWord
            index={next()}
            startMs={wordStartMs}
            intervalMs={wordIntervalMs}
            instant={instant}
            className="font-script text-3xl shimmer-gold"
          >
            &
          </RevealWord>
        </div>
        <h1 className="font-script text-[clamp(2.75rem,12vw,4.5rem)] leading-none text-maroon">
          <RevealWord
            index={next()}
            startMs={wordStartMs}
            intervalMs={wordIntervalMs}
            instant={instant}
          >
            {couple.bride}
          </RevealWord>
        </h1>
        <p className="mt-8 font-display text-base italic text-gold/55">
          {couple.tagline.split(" ").map((w) => (
            <RevealWord
              key={w}
              index={next()}
              startMs={wordStartMs}
              intervalMs={wordIntervalMs}
              instant={instant}
              className="mr-1.5"
            >
              {w}
            </RevealWord>
          ))}
        </p>
      </div>
    );
  }

  const fadeUp = (delay: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 20 } as const,
          animate: { opacity: 1, y: 0 } as const,
          transition: { delay, duration: 0.7 },
        }
      : {};

  const Wrapper = animate ? motion.p : "p";
  const WrapperH1 = animate ? motion.h1 : "h1";
  const WrapperDiv = animate ? motion.div : "div";

  return (
    <div className={shellClass}>
      <Wrapper
        {...fadeUp(0.1)}
        className="font-body text-[10px] tracking-[0.4em] text-gold/55 uppercase"
      >
        {familiesWords.join(" ")}
      </Wrapper>
      <Wrapper
        {...fadeUp(0.25)}
        className="mt-6 font-display text-sm tracking-[0.2em] text-gold/65 uppercase"
      >
        {requestLine}
      </Wrapper>
      <WrapperH1
        {...fadeUp(0.4)}
        className="mt-6 font-script text-[clamp(2.75rem,12vw,4.5rem)] leading-none text-maroon"
      >
        {couple.groom}
      </WrapperH1>
      <WrapperDiv {...fadeUp(0.55)} className="my-3 flex items-center justify-center gap-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
        <span className="font-script text-3xl shimmer-gold">&</span>
        <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
      </WrapperDiv>
      <WrapperH1
        {...fadeUp(0.7)}
        className="font-script text-[clamp(2.75rem,12vw,4.5rem)] leading-none text-maroon"
      >
        {couple.bride}
      </WrapperH1>
      <Wrapper {...fadeUp(0.85)} className="mt-8 font-display text-base italic text-gold/55">
        {couple.tagline}
      </Wrapper>
    </div>
  );
}
