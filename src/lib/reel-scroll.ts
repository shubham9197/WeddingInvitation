/** Reel scroll container (`#reel-scroll`) */
export function getReelScrollContainer(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return document.getElementById("reel-scroll");
}

/** Height of one snap slide — matches `.reel-slide` viewport sizing */
export function getReelSlideHeight(container?: HTMLElement | null): number {
  const el = container ?? getReelScrollContainer();
  if (!el) {
    if (typeof window !== "undefined" && window.visualViewport?.height) {
      return window.visualViewport.height;
    }
    return typeof window !== "undefined" ? window.innerHeight : 0;
  }
  return el.clientHeight;
}
