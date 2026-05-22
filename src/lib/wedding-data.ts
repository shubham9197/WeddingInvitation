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

export const wedding = {
  couple: {
    bride: "Aishwarya",
    brideFull: "Aishwarya",
    groom: "Shubham",
    groomFull: "Shubham",
    tagline: "Two souls, one forever",
  },
  date: {
    iso: "2026-06-22T10:00:00",
    display: "Monday, 22 June 2026",
    time: "10:00 AM — Muhurat",
    footerLine: "Monday, 22 June 2026",
    /** Save the Date — before scratch (line 1 + line 2) */
    loveLine: "A million little moments brought us here",
    loveLineCta: "Scratch the hearts to meet our wedding day",
    scratch: {
      day: { label: "DAY", value: "22" },
      month: { label: "MONTH", value: "June" },
      year: { label: "YEAR", value: "2026" },
    },
  },
  venue: {
    name: "Vrindawan Mangal Karyalay",
    address: "Near ST Bus Stand, Kurundwad, Maharashtra",
    mapUrl: "https://maps.app.goo.gl/RMTdjLHuSCw9zcT89",
    /** Same pin as mapUrl — address-only search was opening the wrong place */
    coordinates: { lat: 16.684674, lng: 74.5888038 },
  },
  story: [
    {
      year: "2019",
      title: "First Glance",
      text: "A crowded café in Jaipur — her laugh cut through the noise. He knew before the coffee arrived.",
    },
    {
      year: "2021",
      title: "Mountains & Promises",
      text: "A trek to Manali in the snow. He asked; she said yes, breathless and laughing.",
    },
    {
      year: "2024",
      title: "Families Meet",
      text: "Garlands, sweets, and blessings. Two families became one beautiful story.",
    },
    {
      year: "2026",
      title: "The Wedding",
      text: "Under a canopy of stars and marigolds, they begin the greatest chapter.",
    },
  ],
  events: [
    {
      name: "Mehendi",
      date: "21 June 2026",
      time: "7:00 PM",
      venue: "Near by venue",
      icon: "🌿",
    },
    {
      name: "Sangeet",
      date: "21 june 2026",
      time: "7:00 PM",
      venue: "Near by venue",
      icon: "✨",
    },
    {
      name: "Haldi",
      date: "22 June 2026",
      time: "10:00 AM",
      venue: "Vrindawan Mangal Karyalay",
      icon: "💛",
    },
    {
      name: "Wedding",
      date: "22 June 2026",
      time: "12:40 PM",
      venue: "Vrindawan Mangal Karyalay",
      icon: "💍",
    },
  ],
  music: weddingMusic,
  /** 24 photos in public/gallery/photo-1.jpg … photo-24.jpg */
  gallery: galleryImages,
  family: {
    brideParents: "Balasaheb & Bharti Wale",
    groomParents: "Ravindra & Kalpana Magdum",
    intro: "Two families woven into one celebration",
    blessing:
      "With the love of our parents and elders, we begin this sacred journey together.",
    footer: "Your blessings mean the world to us",
  },
};
