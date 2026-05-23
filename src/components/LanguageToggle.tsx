"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import type { Locale } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale, content } = useLanguage();

  const options: { id: Locale; label: string }[] = [
    { id: "mr", label: content.ui.langMarathi },
    { id: "en", label: content.ui.langEnglish },
  ];

  return (
    <div
      className="flex rounded-full border border-gold/45 bg-[#1a1512]/92 p-0.5 shadow-[0_0_20px_rgba(201,162,39,0.15)] backdrop-blur-sm"
      role="group"
      aria-label="Choose language"
    >
      {options.map((opt) => {
        const active = locale === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setLocale(opt.id)}
            className={`relative rounded-full px-2.5 py-1.5 font-body text-[9px] font-semibold tracking-wide transition-colors sm:px-3 sm:text-[10px] ${
              active ? "text-[#1a1512]" : "text-gold/70 hover:text-gold"
            }`}
            aria-pressed={active}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e8d48a] to-[#c9a227]"
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <span className="relative z-[1]">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
