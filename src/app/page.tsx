"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { FloralBg } from "@/components/FloralBg";
import { FloatingHearts } from "@/components/FloatingHearts";
import { TopBarControls } from "@/components/TopBarControls";
import { LanguageProvider } from "@/context/LanguageContext";
import { Hero } from "@/components/Hero";
import { SaveTheDate } from "@/components/SaveTheDate";
import { Countdown } from "@/components/Countdown";
import { Events } from "@/components/Events";
import { Gallery } from "@/components/Gallery";
import { Venue } from "@/components/Venue";
import { Family } from "@/components/Family";
import { RSVP } from "@/components/RSVP";
import { ReelScrollGuard } from "@/components/ReelScrollGuard";
import { ReelUnlockProvider } from "@/context/ReelUnlockContext";
import { WeddingMusicProvider } from "@/context/WeddingMusicContext";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const handleIntroOpen = useCallback(() => {
    setOpened(true);
  }, []);

  return (
    <LanguageProvider>
    <WeddingMusicProvider>
      <TopBarControls showLanguageHint={!opened} />
      <EnvelopeIntro onOpen={handleIntroOpen} />

      <AnimatePresence>
        {opened && (
          <motion.div
            key="wedding-app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative"
          >
            <ReelUnlockProvider>
              <FloralBg />
              <ReelScrollGuard />

              <main
                id="reel-scroll"
                className="reel-scroll dark-theme dark-shine-bg relative z-10 max-w-[100vw] overflow-x-hidden"
              >
                <FloatingHearts />
                <Hero />
                <SaveTheDate />
              <Countdown />
              <Events />
              <Gallery />
              <Family />
              <Venue />
              <RSVP />
              </main>
            </ReelUnlockProvider>
          </motion.div>
        )}
      </AnimatePresence>
    </WeddingMusicProvider>
    </LanguageProvider>
  );
}
