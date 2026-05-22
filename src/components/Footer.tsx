"use client";

import { wedding } from "@/lib/wedding-data";

export function Footer() {
  return (
    <footer className="relative border-t border-gold/10 px-6 py-12 text-center">
      <p className="font-display text-2xl gold-text">
        {wedding.couple.groom} & {wedding.couple.bride}
      </p>
      <p className="mt-3 font-display text-xs tracking-[0.3em] text-champagne/40 uppercase">
        {wedding.date.display}
      </p>
      <p className="mt-8 text-xs text-champagne/30">
        Made with love · #{wedding.couple.groom}
        {wedding.couple.bride}2026
      </p>
    </footer>
  );
}
