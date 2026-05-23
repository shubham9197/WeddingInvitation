export type Locale = "mr" | "en";

export type ScratchPart = {
  label: string;
  value: string;
};

export type WeddingEvent = {
  name: string;
  date: string;
  time: string;
  venue: string;
  icon: string;
  tagline: string;
};

export type WeddingContent = {
  locale: Locale;
  couple: {
    bride: string;
    groom: string;
    brideFull: string;
    groomFull: string;
    tagline: string;
  };
  date: {
    iso: string;
    display: string;
    time: string;
    footerLine: string;
    loveLine: string;
    loveLineCta: string;
    scratch: {
      day: ScratchPart;
      month: ScratchPart;
      year: ScratchPart;
    };
  };
  venue: {
    name: string;
    address: string;
  };
  events: WeddingEvent[];
  family: {
    brideParents: string;
    groomParents: string;
    intro: string;
    blessing: string;
    footer: string;
    brideFamilyLabel: string;
    groomFamilyLabel: string;
    daughterOf: string;
    sonOf: string;
    withBlessings: string;
    united: string;
    brideSide: string;
    groomSide: string;
  };
  ui: {
    langMarathi: string;
    langEnglish: string;
    scroll: string;
    scrollContinue: string;
    tapHere: string;
    scratchHere: string;
    openInMaps: string;
    tapOpenMaps: string;
    venueDirections: string;
    pleaseWaitBlessing: string;
    intro: {
      celebration: string;
      invitationAwaits: string;
    };
    envelope: {
      wedding: string;
      invitation: string;
    };
    invite: {
      familiesWords: string[];
      requestLine: string;
    };
    saveTheDate: {
      title: string;
      revealTitle: string;
      revealHighlight: string;
      scratchHint: string;
      congratulations: string;
      dateRevealed: string;
    };
    countdown: {
      eyebrow: string;
      title: string;
      labels: [string, string, string, string];
      untilWeSay: string;
    };
    events: {
      celebrations: string;
      title: string;
      swipeHint: string;
    };
    gallery: {
      eyebrow: string;
      title: string;
      moments: string;
      togetherForever: string;
      backToGallery: string;
      photoOf: string;
    };
    family: {
      title: string;
    };
    venue: {
      title: string;
    };
    rsvp: {
      title: string;
      deadline: string;
      thankYou: string;
      thankYouSub: string;
      namePlaceholder: string;
      phonePlaceholder: string;
      accept: string;
      decline: string;
      guestsPlaceholder: string;
      wishesPlaceholder: string;
      sending: string;
      confirm: string;
    };
  };
};
