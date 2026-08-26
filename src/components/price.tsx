import { formatNaira } from "@/lib/format";
import { cn } from "@/lib/utils";

export function Price({
  value,
  fromPrice,
  originalPrice,
  className,
}: {
  value: number;
  fromPrice?: boolean;
  originalPrice?: number;
  className?: string;
}) {
  return (
    <span className={cn("text-base font-semibold tabular-nums text-text-heading", className)}>
      {fromPrice && (
        <span className="text-xs font-normal text-text-secondary">From </span>
      )}
      {formatNaira(value)}
      {originalPrice && originalPrice > value && (
        <span className="ml-1.5 text-xs font-normal text-text-tertiary line-through">
          {formatNaira(originalPrice)}
        </span>
      )}
    </span>
  );
}
