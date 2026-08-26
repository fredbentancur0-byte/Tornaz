import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-text-tertiary">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-text-primary">
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight size={14} strokeWidth={1.75} className="text-text-tertiary" />
            {item.href ? (
              <Link href={item.href} className="hover:text-text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-text-primary">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
