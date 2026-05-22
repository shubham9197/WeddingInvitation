"use client";

import { useEffect, useRef, useState } from "react";

/** Increments each time the slide scrolls into view — use as React key to replay animations */
export function useSlideReplay(threshold = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const [playKey, setPlayKey] = useState(0);
  const wasVisibleRef = useRef(false);
  const visitCountRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible =
          entry.isIntersecting && entry.intersectionRatio >= threshold;
        if (visible && !wasVisibleRef.current) {
          if (visitCountRef.current > 0) {
            setPlayKey((k) => k + 1);
          }
          visitCountRef.current += 1;
        }
        wasVisibleRef.current = visible;
      },
      { threshold: [threshold] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, playKey };
}
