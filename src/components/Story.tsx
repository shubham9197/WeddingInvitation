"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/wedding-data";
import { OrnamentDivider } from "./Ornament";

export function Story() {
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

        {wedding.story.map((chapter, i) => (
          <motion.article
            key={chapter.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className={`relative mb-14 pl-12 sm:pl-0 sm:w-[calc(50%-2rem)] ${
              i % 2 === 0
                ? "sm:mr-auto sm:pr-8 sm:text-right"
                : "sm:ml-auto sm:pl-8 sm:text-left sm:mt-[-3rem]"
            }`}
          >
            <span
              className={`absolute top-1 flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 bg-plum text-xs text-gold sm:top-2 ${
                i % 2 === 0
                  ? "left-0 sm:left-auto sm:right-[-1.15rem]"
                  : "left-0 sm:left-[-1.15rem]"
              }`}
            >
              {chapter.year.slice(2)}
            </span>
            <p className="font-display text-xs tracking-[0.2em] text-gold">{chapter.year}</p>
            <h3 className="mt-1 font-display text-xl text-champagne">{chapter.title}</h3>
            <p className="mt-2 font-body text-sm leading-relaxed text-champagne/65">
              {chapter.text}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
