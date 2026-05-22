export function CherryBlossom({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      aria-hidden
      fill="none"
    >
      <circle cx="24" cy="14" r="6" fill="#f0a8b8" opacity="0.9" />
      <circle cx="14" cy="22" r="6" fill="#f5b8c4" />
      <circle cx="34" cy="22" r="6" fill="#f5b8c4" />
      <circle cx="18" cy="32" r="6" fill="#eeb0bc" />
      <circle cx="30" cy="32" r="6" fill="#eeb0bc" />
      <circle cx="24" cy="24" r="4" fill="#e895a8" />
    </svg>
  );
}
