"use client";

const FLOWERS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3 + 2) % 98}%`,
  delay: `${(i * 1.1) % 10}s`,
  duration: `${16 + (i % 6)}s`,
  size: 10 + (i % 4) * 4,
  hue: i % 2 === 0 ? "#e8a030" : "#d4849a",
}));

export function FloralBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {FLOWERS.map((f) => (
        <span
          key={f.id}
          className="flower-petal absolute"
          style={{
            left: f.left,
            width: f.size,
            height: f.size,
            animationDelay: f.delay,
            animationDuration: f.duration,
            background: `radial-gradient(circle at 30% 30%, ${f.hue}, transparent 70%)`,
            borderRadius: "50% 0 50% 50%",
            opacity: 0.28,
          }}
        />
      ))}
    </div>
  );
}
