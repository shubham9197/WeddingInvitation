"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { OrnamentDivider } from "./Ornament";

/** Legacy section — not used in reel flow; kept for optional layouts */
export function Story() {
  const { content } = useLanguage();
  const story =
    "story" in content
      ? (content as { story: { year: string; title: string; text: string }[] }).story
      : [];

  if (story.length === 0) return null;

  return (
    <section id="story" className="relative px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl tracking-wide text-champagne sm:text-4xl"
        >
          Our <span className="gold-text">Love Story</span>
        </motion.h2>
        <OrnamentDivider className="my-8" />
      </div>

      <div className="relative mx-auto max-w-xl">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-gold/20 to-transparent sm:left-1/2 sm:-translate-x-px" />

        {story.map((chapter, i) => (
          <motion.article
            key={chapter.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1 }}
            className={`relative mb-12 pl-12 sm:mb-16 sm:w-1/2 sm:pl-0 ${
              i % 2 === 0 ? "sm:mr-auto sm:pr-12 sm:text-right" : "sm:ml-auto sm:pl-12"
            }`}
          >
            <span className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-maroon-deep font-display text-xs text-gold sm:left-auto sm:right-0 sm:top-0">
              {chapter.year.slice(-2)}
            </span>
            {i % 2 !== 0 && (
              <span className="absolute -left-4 top-3 hidden h-2 w-2 rounded-full bg-gold sm:left-0 sm:block" />
            )}
            {i % 2 === 0 && (
              <span className="absolute -right-4 top-3 hidden h-2 w-2 rounded-full bg-gold sm:right-0 sm:block" />
            )}
            <h3 className="font-display text-xl text-gold-light">{chapter.title}</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-champagne/70">
              {chapter.text}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
