/** Locale-independent wedding data */
export const weddingShared = {
  /** Envelope seal only — always "S & A" in English, even in Marathi mode */
  sealInitials: "S & A",
  dateIso: "2026-06-22T10:00:00",
  venue: {
    mapUrl: "https://maps.app.goo.gl/RMTdjLHuSCw9zcT89",
    coordinates: { lat: 16.684674, lng: 74.5888038 },
  },
  events: [
    { icon: "🌿" },
    { icon: "✨" },
    { icon: "💛" },
    { icon: "💍" },
  ],
} as const;
