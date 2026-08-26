export function BrandMark({ size = 30 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Tornaz Stores"
      width={size}
      height={size}
      style={{ display: "inline-flex", flex: "none" }}
    >
      <rect x="42" y="8" width="16" height="82" rx="1.5" className="fill-mark-ink" />
      <rect x="57.9" y="8" width="15.8" height="16" rx="1.5" className="fill-mark-ink" />
      <rect x="76.2" y="8" width="15.8" height="16" rx="1.5" className="fill-mark-ink" />
      <rect x="8" y="8" width="47.4" height="16" rx="1.5" className="fill-mark-gold" />
    </svg>
  );
}
