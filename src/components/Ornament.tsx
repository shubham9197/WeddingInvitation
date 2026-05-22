export function OrnamentDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <span className="ornament-line w-16 sm:w-24" />
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="text-gold shrink-0"
      >
        <path
          d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z"
          stroke="currentColor"
          strokeWidth="0.8"
          fill="rgba(212,175,55,0.15)"
        />
      </svg>
      <span className="ornament-line w-16 sm:w-24" />
    </div>
  );
}

export function MandalaRing({ size = 280 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className="absolute opacity-[0.12] text-gold"
      aria-hidden
    >
      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.3" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 50 * Math.cos(angle);
        const y1 = 100 + 50 * Math.sin(angle);
        const x2 = 100 + 90 * Math.cos(angle);
        const y2 = 100 + 90 * Math.sin(angle);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="0.4"
          />
        );
      })}
    </svg>
  );
}
