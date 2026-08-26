import Link from "next/link";
import { ArrowRight, LayoutGrid, Link2, Package } from "lucide-react";
import { fetchProducts } from "@/lib/data-access";
import { CATEGORIES } from "@/lib/constants";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";

export default async function HomePage() {
  const allProducts = await fetchProducts();

  // Hero slides: full-bleed image carousel in JMPotters style, built from
  // featured physical products so the carousel always reflects the catalog.
  const heroSlides: HeroSlide[] = [
    {
      image: "/media/products/bright-3-5kva-petrol-generator/1.png",
      eyebrow: "A marketplace built for the things you need",
      title: "Shop better, without paying all at once.",
      copy: "Discover products from trusted sellers. On eligible physical items, pay 60% today and the rest in two smaller payments.",
      primary: { label: "Shop products", href: "/products" },
      secondary: { label: "How Pay Small Small works", href: "/pay-small-small" },
      showSearch: true,
    },
    {
      image: "/media/products/tecno-spark-smartphone/1.png",
      eyebrow: "Pay Small Small eligible",
      title: "Bring home the bigger things with a clearer payment plan.",
      copy: "Pay 60% at checkout, then 20% in 30 days and 20% in 60 days. Your item is delivered after the final payment clears.",
      primary: { label: "See how it works", href: "/pay-small-small" },
      secondary: { label: "Eligible products", href: "/products?payment=pay-small-small" },
    },
    {
      image: "/media/products/solar-home-starter-kit/1.png",
      eyebrow: "Grow with Tornaz",
      title: "There is more than one way to build on the marketplace.",
      copy: "Open a storefront and list your products, or share products you rate and earn commission on completed orders.",
      primary: { label: "Explore selling", href: "/sell-on-tornaz" },
      secondary: { label: "Become a reseller", href: "/resell-with-tornaz" },
    },
  ];

  // New arrivals: newest products.
  const newArrivals = [...allProducts]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 8);

  // Pay Small Small eligible physical items.
  const pssProducts = allProducts
    .filter((p) => p.paySmallSmall && p.productType === "physical")
    .slice(0, 6);

  // Main categories (excludes the "Inverter Generators" sub-category).
  const mainCategories = CATEGORIES.filter((c) => c.slug !== "inverter-generators");

  return (
    <>
      {/* Hero — JMPotters-style full-width image carousel */}
      <HeroCarousel slides={heroSlides} />

      {/* Shop by category */}
      <section aria-labelledby="categories-h2" className="bg-bg-sunken">
        <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6 md:py-16">
          <SectionHeading
            eyebrow="Browse with purpose"
            title="Shop by category"
            linkHref="/products"
            linkLabel="View all"
          />
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {mainCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className="group rounded-xl border border-border bg-surface p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <LayoutGrid size={22} strokeWidth={1.75} className="text-primary" />
                <p className="mt-5 text-sm font-semibold text-text-heading">{c.name}</p>
                <p className="mt-1 text-xs text-text-tertiary">{c.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New arrivals */}
      <section aria-labelledby="new-h2" className="bg-bg-canvas">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <SectionHeading
            eyebrow="Fresh to the marketplace"
            title="New arrivals"
            linkHref="/products?sort=newest"
            linkLabel="See all products"
          />
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4 xl:gap-6">
            {newArrivals.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Pay Small Small eligible */}
      <section aria-labelledby="pay-small-small-h2" className="bg-accent-bg">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="max-w-xl lg:col-span-5">
              <p className="text-sm font-semibold text-accent-fg">
                Pay Small Small eligible
              </p>
              <h2
                id="pay-small-small-h2"
                className="mt-2 font-display text-2xl font-bold text-text-heading md:text-3xl"
              >
                Bring home the bigger things with a clearer payment plan.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                Pay 60% at checkout, then 20% in 30 days and 20% in 60 days. Your
                item is delivered after the final payment clears.
              </p>
              <Link
                href="/pay-small-small"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                See how it works
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:col-span-7">
              {pssProducts.map((p) => (
                <ProductCard key={p.slug} product={p} showSeller={false} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grow with Tornaz */}
      <section aria-labelledby="partner-h2" className="bg-bg-canvas">
        <div className="mx-auto w-full max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-primary">Grow with Tornaz</p>
            <h2
              id="partner-h2"
              className="mt-1 font-display text-2xl font-bold text-text-heading md:text-3xl"
            >
              There is more than one way to build on the marketplace.
            </h2>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <Package size={28} strokeWidth={1.75} className="text-primary" />
              <h3 className="mt-5 text-xl font-bold text-text-heading">
                Sell on Tornaz
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                Open a storefront, list your products, and let Tornaz support the
                payment and fulfilment journey.
              </p>
              <Link
                href="/sell-on-tornaz"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Explore selling
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </article>
            <article className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <Link2 size={28} strokeWidth={1.75} className="text-primary" />
              <h3 className="mt-5 text-xl font-bold text-text-heading">
                Become a reseller
              </h3>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-secondary">
                Share products you rate, earn commission on completed orders, and
                never hold stock yourself.
              </p>
              <Link
                href="/resell-with-tornaz"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Explore reselling
                <ArrowRight size={16} strokeWidth={1.75} />
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
