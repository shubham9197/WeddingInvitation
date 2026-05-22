"use client";

const PETALS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 5.7 + 3) % 100}%`,
  delay: `${(i * 0.9) % 12}s`,
  duration: `${14 + (i % 8)}s`,
  size: 8 + (i % 5) * 2,
  opacity: 0.25 + (i % 4) * 0.12,
}));

export function FloatingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {PETALS.map((p) => (
        <span
          key={p.id}
          className="petal absolute rounded-full"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 1.4,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            background:
              "linear-gradient(135deg, rgba(212,175,55,0.5), rgba(232,196,184,0.3))",
          }}
        />
      ))}
    </div>
  );
}
