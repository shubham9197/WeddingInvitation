"use client";

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  top: `${(i * 17) % 100}%`,
  left: `${(i * 23 + 7) % 100}%`,
  size: i % 5 === 0 ? 2 : 1,
  delay: `${(i * 0.3) % 5}s`,
  duration: `${2 + (i % 4)}s`,
}));

export function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {STARS.map((s) => (
        <span
          key={s.id}
          className="star absolute rounded-full bg-champagne"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
}
