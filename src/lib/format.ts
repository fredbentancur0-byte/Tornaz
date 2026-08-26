const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

/** Format a number as naira, e.g. 145000 -> "₦145,000". */
export function formatNaira(value: number): string {
  return nairaFormatter.format(value);
}

/** Format a number with thousand separators, e.g. 145000 -> "145,000". */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-NG").format(value);
}

/** Format an ISO date as a short human date, e.g. "12 Aug 2026". */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
