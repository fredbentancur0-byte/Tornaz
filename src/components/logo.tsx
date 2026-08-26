import Link from "next/link";

/**
 * Tornaz brand logo (wide lockup on transparent background).
 * Rendered as a contained image so it scales cleanly across light/dark
 * headers and the footer. The source transparent PNG holds a dark + gold
 * mark, so it reads well on the light header and the dark footer.
 */
export function Logo({ height = 40, className }: { height?: number; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Tornaz Stores — home"
      className={`flex shrink-0 items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Tornaz Stores"
        width={110}
        height={height}
        style={{ height, width: "auto", objectFit: "contain" }}
        className="select-none"
      />
    </Link>
  );
}