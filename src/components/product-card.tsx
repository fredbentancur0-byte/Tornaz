import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/product-image";
import { Price } from "@/components/price";
import { Badge } from "@/components/badge";

export function ProductCard({
  product,
  showSeller = true,
}: {
  product: Product;
  showSeller?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      aria-label={`${product.name}, ${product.price} naira, ${product.productType} product, ${product.seller}`}
      className="group flex flex-col rounded-lg border border-border bg-surface p-2 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
    >
      <div className="relative aspect-square overflow-hidden rounded-md bg-bg-muted">
        <ProductImage src={product.image} alt={product.name} className="transition-transform duration-300 group-hover:scale-[1.03]" />
        {product.productType === "digital" && (
          <Badge variant="brand" className="absolute left-2 top-2">
            Digital
          </Badge>
        )}
        {product.stock === "low_stock" && (
          <Badge variant="danger" className="absolute right-2 top-2">
            Low stock
          </Badge>
        )}
      </div>
      <h3 className="mt-2 line-clamp-2 text-sm font-medium text-text-primary md:text-base">
        {product.name}
      </h3>
      <p className="mt-1 text-base font-semibold tabular-nums text-text-heading">
        <Price
          value={product.price}
          fromPrice={product.fromPrice}
          originalPrice={product.originalPrice}
        />
      </p>
      {showSeller && (
        <p className="mt-0.5 truncate text-xs text-text-tertiary">{product.seller}</p>
      )}
    </Link>
  );
}
