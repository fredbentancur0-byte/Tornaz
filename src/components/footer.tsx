import Link from "next/link";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Shop",
    links: [
      { label: "All products", href: "/products" },
      { label: "Pay Small Small", href: "/pay-small-small" },
    ],
  },
  {
    heading: "Sell",
    links: [{ label: "Sell on Tornaz", href: "/sell-on-tornaz" }],
  },
  {
    heading: "Earn",
    links: [{ label: "Become a reseller", href: "/resell-with-tornaz" }],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Refund Policy", href: "/refunds" },
      { label: "Privacy Notice", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-16 md:px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Tornaz Stores"
          width={180}
          height={60}
          style={{ height: 56, width: "auto", objectFit: "contain" }}
          className="mb-8 select-none"
        />
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h2 className="mb-4 text-sm font-semibold text-white">{col.heading}</h2>
              <ul className="space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-neutral-300 transition-colors hover:text-accent-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-neutral-300">
          Your payment is held by Tornaz, not by the seller.
        </p>
        <hr className="my-6 border-white/10" />
        <p className="text-xs text-neutral-400">© 2026 Tornaz Stores</p>
      </div>
    </footer>
  );
}
