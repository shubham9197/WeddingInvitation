"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Heart } from "lucide-react";
import { wedding } from "@/lib/wedding-data";
import {
  CelebrationConfetti,
  CONFETTI_BURST_MS,
} from "./CelebrationConfetti";
import { useSlideReplay } from "@/hooks/useSlideReplay";

export function RSVP() {
  const { ref, playKey } = useSlideReplay();
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const confettiStopRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (confettiStopRef.current) clearTimeout(confettiStopRef.current);
    };
  }, []);

  useEffect(() => {
    if (playKey === 0) return;
    setSubmitted(false);
    setShowConfetti(false);
  }, [playKey]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    setShowConfetti(true);
    if (confettiStopRef.current) clearTimeout(confettiStopRef.current);
    confettiStopRef.current = setTimeout(() => {
      setShowConfetti(false);
      confettiStopRef.current = null;
    }, CONFETTI_BURST_MS);
  }

  return (
    <section
      ref={ref}
      className="reel-slide relative flex min-h-dvh flex-col items-center justify-center overflow-x-hidden overflow-y-auto mobile-safe-x px-4 py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-12"
    >
      <CelebrationConfetti active={showConfetti} />
      <motion.div
        key={playKey}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        className="mb-6 text-center"
      >
        <Heart className="heart-shiny-red mx-auto fill-current" size={28} />
        <h2 className="mt-3 font-script text-[clamp(2.5rem,12vw,3rem)] text-maroon">RSVP</h2>
        <p className="mt-2 font-body text-xs text-maroon/50">
          Kindly respond by 15th June 2026
        </p>
      </motion.div>

      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="invite-card px-8 py-12 text-center"
            >
              <CheckCircle2 className="mx-auto text-gold" size={48} />
              <p className="mt-4 font-script text-2xl text-maroon sm:text-3xl">Thank You!</p>
              <p className="mt-2 font-body text-sm text-maroon/55">
                We cannot wait to celebrate with you.
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="invite-card space-y-4 px-6 py-8"
            >
              <input
                required
                placeholder="Your full name"
                className="w-full rounded-lg border border-gold/25 bg-[#0f0d0c] px-4 py-3 font-body text-sm text-ivory outline-none focus:border-gold/60"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-lg border border-gold/25 bg-[#0f0d0c] px-4 py-3 font-body text-sm text-ivory outline-none focus:border-gold/60"
              />
              <select
                required
                className="w-full rounded-lg border border-gold/25 bg-[#0f0d0c] px-4 py-3 font-body text-sm text-ivory outline-none focus:border-gold/60"
              >
                <option value="yes">Joyfully accepting</option>
                <option value="no">Regretfully declining</option>
              </select>
              <input
                type="number"
                min={1}
                max={10}
                defaultValue={1}
                placeholder="Guests"
                className="w-full rounded-lg border border-gold/25 bg-[#0f0d0c] px-4 py-3 font-body text-sm text-ivory outline-none focus:border-gold/60"
              />
              <textarea
                rows={2}
                placeholder="Your wishes..."
                className="w-full resize-none rounded-lg border border-gold/25 bg-[#0f0d0c] px-4 py-3 font-body text-sm text-ivory outline-none focus:border-gold/60"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full border border-gold/40 bg-gradient-to-r from-[#7a1f3d] to-[#5c1530] py-3.5 font-body text-xs tracking-[0.2em] text-gold-light uppercase shadow-[0_0_20px_rgba(201,162,39,0.2)] transition hover:shadow-[0_0_28px_rgba(201,162,39,0.35)] disabled:opacity-60"
              >
                {loading ? "Sending..." : "Confirm RSVP"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-6 text-center font-script text-2xl text-maroon/80 sm:mt-8 sm:text-3xl">
        {wedding.couple.groom} & {wedding.couple.bride}
      </p>
    </section>
  );
}
