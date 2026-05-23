"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { galleryImages, type GalleryImage } from "@/lib/gallery-images";
import { useLanguage } from "@/context/LanguageContext";
import { useSlideReplay } from "@/hooks/useSlideReplay";
import { GalleryPhotoFrame } from "./GalleryPhotoFrame";

const ENTRY_FROM = [
  { opacity: 0, x: 0, y: -40 },
  { opacity: 0, x: -40, y: 0 },
  { opacity: 0, x: 40, y: 0 },
  { opacity: 0, x: 0, y: 40 },
] as const;

const ENTRY_TO = { opacity: 1, x: 0, y: 0 };

export function Gallery() {
  const { content } = useLanguage();
  const { ui } = content;
  const [images, setImages] = useState<GalleryImage[]>(galleryImages);
  const [active, setActive] = useState<number | null>(null);
  const { ref, playKey } = useSlideReplay();

  useEffect(() => {
    fetch(`/gallery/manifest.json?t=${Date.now()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { images?: GalleryImage[] } | null) => {
        if (data?.images?.length) setImages(data.images);
      })
      .catch(() => {});
  }, []);

  const goPrev = useCallback(() => {
    setActive((i) =>
      i === null ? null : (i - 1 + images.length) % images.length
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goPrev, goNext]);

  return (
    <section
      ref={ref}
      className="reel-slide flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto mobile-safe-x px-4 py-6 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-6 sm:py-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        className="mb-4 shrink-0 text-center sm:mb-6"
      >
        <p className="font-body text-[10px] tracking-[0.4em] text-maroon/50 uppercase">
          {ui.gallery.eyebrow}
        </p>
        <h2 className="mt-2 font-script text-[clamp(2.25rem,10vw,3rem)] text-maroon">
          {ui.gallery.title}
        </h2>
        <p className="mt-2 font-body text-[10px] tracking-[0.2em] text-gold/45">
          {images.length} {ui.gallery.moments}
        </p>
      </motion.div>

      {images.length === 0 ? (
        <p className="mx-auto max-w-sm text-center font-body text-sm text-maroon/60">
          No photos yet. Add images to{" "}
          <code className="text-gold">public/gallery/</code>, then run{" "}
          <code className="text-gold">npm run gallery:sync</code>.
        </p>
      ) : (
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
        {images.map((img, i) => (
          <motion.button
            key={`${img.src}-${playKey}`}
            type="button"
            initial={ENTRY_FROM[i % ENTRY_FROM.length]}
            whileInView={ENTRY_TO}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              delay: Math.min(i * 0.05, 1.2),
              duration: 0.85,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => setActive(i)}
            className={`invite-card relative overflow-hidden rounded-lg ${
              i === 0
                ? "col-span-2 aspect-[16/10] sm:aspect-[2/1]"
                : "aspect-square"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              unoptimized
              className="object-cover"
              sizes={
                i === 0
                  ? "(max-width: 640px) 100vw, 640px"
                  : "(max-width: 640px) 45vw, 240px"
              }
              priority={i < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/45 via-transparent to-transparent" />
            {i === 0 && (
              <span className="shimmer-red absolute bottom-2 left-3 font-script text-lg sm:bottom-3 sm:text-2xl">
                {ui.gallery.togetherForever}
              </span>
            )}
          </motion.button>
        ))}
      </div>
      )}

      <AnimatePresence mode="wait">
        {active !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              key={`bg-${active}`}
              className="absolute inset-0 bg-maroon-deep/90 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-25 blur-2xl"
              style={{ backgroundImage: `url(${images[active].src})` }}
              aria-hidden
            />
            <div className="absolute top-[max(1rem,env(safe-area-inset-top))] left-[max(1rem,env(safe-area-inset-left))] z-10 flex items-center gap-3">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(null);
                }}
                className="flex h-10 items-center gap-1.5 rounded-full border border-gold/40 bg-[#1a1512]/90 px-3.5 text-gold shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
                aria-label={ui.gallery.backToGallery}
              >
                <ArrowLeft size={18} strokeWidth={2} />
                <span className="font-body text-[10px] font-medium tracking-[0.12em] uppercase">
                  {ui.gallery.backToGallery}
                </span>
              </button>
              <p className="font-body text-[10px] tracking-[0.2em] text-ivory/70">
                {active + 1} / {images.length}
              </p>
            </div>

            <button
              type="button"
              className="absolute top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-[#1a1512]/90 text-ivory"
              onClick={(e) => {
                e.stopPropagation();
                setActive(null);
              }}
              aria-label="Close"
            >
              <X size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-[max(0.5rem,env(safe-area-inset-left))] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-[#1a1512]/90 text-gold"
              aria-label="Previous photo"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-[max(0.5rem,env(safe-area-inset-right))] z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-[#1a1512]/90 text-gold"
              aria-label="Next photo"
            >
              <ChevronRight size={22} />
            </button>

            <GalleryPhotoFrame photoKey={active}>
              <Image
                src={images[active].src}
                alt={images[active].alt}
                fill
                unoptimized
                className="object-contain sm:object-cover"
                sizes="(max-width: 640px) 100vw, 512px"
              />
            </GalleryPhotoFrame>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
