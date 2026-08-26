"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ProductImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-bg-muted",
          className,
        )}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-3xl font-extrabold text-text-tertiary">
          {(alt || "T").charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      sizes={sizes}
      onError={() => setFailed(true)}
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
