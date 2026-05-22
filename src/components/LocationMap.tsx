"use client";

import { motion } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import { wedding } from "@/lib/wedding-data";

function buildEmbedUrl(): string {
  const { venue } = wedding;
  const { coordinates, name, address } = venue;

  if (coordinates) {
    return `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=en&z=16&output=embed`;
  }

  return `https://maps.google.com/maps?q=${encodeURIComponent(`${name}, ${address}`)}&hl=en&z=15&output=embed`;
}

export function LocationMap() {
  const { venue } = wedding;
  const embedUrl = buildEmbedUrl();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      className="mx-auto w-full max-w-md"
    >
      <div className="dark-card overflow-hidden rounded-2xl">
        <motion.div
          className="relative h-40 w-full sm:h-48 md:h-52"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2 }}
        >
          <iframe
            title="Wedding venue map"
            src={embedUrl}
            className="pointer-events-none absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
            aria-label={`Open ${venue.name} in Google Maps`}
          />
        </motion.div>

        <div className="space-y-3 px-6 py-5 text-center sm:space-y-4 sm:px-7 sm:py-6">
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MapPin className="mx-auto text-gold" size={22} strokeWidth={1.5} />
          </motion.div>
          <h3 className="font-display text-lg font-semibold leading-snug text-ivory sm:text-xl">
            {venue.name}
          </h3>
          <p className="font-body text-xs leading-relaxed text-gold/55 sm:text-sm">
            {venue.address}
          </p>
          <a
            href={venue.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-1.5 pt-1 font-body text-[10px] tracking-[0.15em] text-gold uppercase underline-offset-2 hover:underline"
          >
            Open in Google Maps
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
