import { galleryImages } from "./gallery-images";

export type WeddingMusic = {
  src: string;
  title: string;
  artist: string;
  volume: number;
  /** Seconds to play before looping back to startAtSeconds */
  clipDurationSeconds: number;
  startAtSeconds: number;
};

/** Hosted MP3 — works on localhost and live server (unlike YouTube embed) */
export const weddingMusic: WeddingMusic = {
  src: "/wedding-music.mp3",
  title: "Makhmali",
  artist: "Sonu Nigam & Shreya Ghoshal",
  volume: 0.45,
  clipDurationSeconds: 60,
  startAtSeconds: 0,
};

import { weddingShared } from "./i18n/shared";

/** Static venue links + music/gallery (text comes from LanguageContext) */
export const wedding = {
  date: { iso: weddingShared.dateIso },
  venue: {
    mapUrl: weddingShared.venue.mapUrl,
    coordinates: weddingShared.venue.coordinates,
  },
  music: weddingMusic,
  gallery: galleryImages,
};
