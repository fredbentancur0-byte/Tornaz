import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { fetchProduct, fetchProducts } from "@/lib/data-access";
import { Breadcrumb } from "@/components/breadcrumb";
import { ProductDetail } from "@/components/product-detail";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProduct(slug);
  if (!product) notFound();

  const allProducts = await fetchProducts();
  const related = allProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);
  const sellerCount = allProducts.filter((p) => p.seller === product.seller).length;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12">
      <Breadcrumb
        items={[
          { label: product.categoryName, href: `/products?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6">
        <ProductDetail product={product} />
      </div>

      {/* Description */}
      <section aria-labelledby="description-h2" className="mt-14">
        <h2 id="description-h2" className="font-display text-xl font-bold text-text-heading">
          Description
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary">
          {product.longDescription}
        </p>
      </section>

      {/* Seller card */}
      <section aria-label="Seller information" className="mt-10">
        <div className="max-w-3xl rounded-2xl border border-border bg-surface p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-text-tertiary">Sold by</p>
              <p className="mt-0.5 font-display text-lg font-bold text-text-heading">
                {product.seller}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold tabular-nums text-text-heading">
                {sellerCount} {sellerCount === 1 ? "product" : "products"}
              </p>
              <p className="mt-0.5 text-xs text-text-tertiary">
                {product.sellerVerified ? "Verified seller" : "Seller"}
              </p>
            </div>
          </div>
          <p className="mt-4 flex items-start gap-2 rounded-lg bg-state-info-bg px-3 py-2.5 text-xs leading-relaxed text-state-info-fg">
            <ShieldCheck size={16} strokeWidth={1.75} className="mt-0.5 shrink-0" />
            Verified seller. Your payment is held safely by Tornaz until your
            order is delivered.
          </p>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section aria-labelledby="related-h2" className="mt-14">
          <SectionHeading
            eyebrow="More from this category"
            title="You may also like"
            linkHref={`/products?category=${product.category}`}
            linkLabel="View all"
          />
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-12">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          View all products
          <ArrowRight size={16} strokeWidth={1.75} />
        </Link>
      </div>
    </div>
  );
}
