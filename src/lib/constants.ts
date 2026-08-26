export const SITE = {
  name: "Tornaz Stores",
  tagline: "Buy what you need. Pay small small.",
  description:
    "Buy phones, generators and appliances in Nigeria and pay across three parts over 60 days. Tornaz holds your money in escrow until your order is delivered.",
  url: "https://tornaz.store",
  themeColor: "#0E1C43",
};

export interface Category {
  slug: string;
  name: string;
  blurb: string;
}

export const CATEGORIES: Category[] = [
  { slug: "generators-power", name: "Generators & Power", blurb: "Explore products" },
  { slug: "inverter-generators", name: "Inverter Generators", blurb: "Explore products" },
  { slug: "phones-tablets", name: "Phones & Tablets", blurb: "Explore products" },
  { slug: "home-appliances", name: "Home Appliances", blurb: "Explore products" },
  { slug: "digital-courses", name: "Digital & Courses", blurb: "Explore products" },
  { slug: "fashion-lifestyle", name: "Fashion & Lifestyle", blurb: "Explore products" },
];

export function categoryName(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;
}

/** Pay Small Small terms — 60% at checkout, then 20% in 30 days, 20% in 60 days. */
export const PAY_SMALL_SMALL = {
  installments: 3,
  shares: [0.6, 0.2, 0.2],
  days: [0, 30, 60],
  minEligiblePrice: 10_000,
};

/** Flat delivery fee for physical items; waived on digital orders and orders at/above the threshold. */
export const DELIVERY = {
  fee: 2_500,
  freeThreshold: 150_000,
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending payment",
  paid: "Paid — held in escrow",
  processing: "Processing",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
