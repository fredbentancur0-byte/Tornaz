# Tornaz Stores

E-commerce marketplace for Nigeria — **“Buy what you need. Pay small small.”**

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**, backed by
**Supabase** for products, orders, and authentication. The UI is a faithful
recreation of the original Tornaz Stores site, including the full design
system (brand navy + gold, Plus Jakarta Sans / Inter / JetBrains Mono, light &
dark themes) and the escrow-backed **Pay Small Small** model:

- **Pay in full** — delivered after payment confirmed
- **Pay Small Small** — 60% at checkout, 20% in 30 days, 20% in 60 days;
  payment held by Tornaz in escrow until delivery

## Pages

| Route                | Description                                    |
| -------------------- | ---------------------------------------------- |
| `/`                  | Landing (hero, categories, arrivals, PSS, grow)|
| `/products`          | Catalog with search, filters, and sort         |
| `/products/[slug]`   | Product detail + payment plan + add to cart    |
| `/cart`              | Cart with quantities and summary               |
| `/checkout`          | Delivery form + payment mode + simulated escrow|
| `/login` `/signup`   | Supabase auth                                  |
| `/account` `/orders` | Profile and order history                      |
| `/pay-small-small`   | How the payment plan works                     |
| `/sell-on-tornaz`    | Seller landing                                 |
| `/resell-with-tornaz`| Reseller landing                               |
| `/terms` `/refunds` `/privacy` | Legal pages                            |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

The storefront ships with a bundled catalog, so it runs with **zero
configuration** — Supabase is optional until you’re ready to connect it.

## Supabase setup (products + orders + auth)

1. **Env vars** — copy `.env.example` to `.env.local` and fill in:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon or publishable key>
   SUPABASE_SERVICE_ROLE_KEY=<secret or service-role key>
   ```

2. **Schema** — open the Supabase dashboard → SQL Editor → New query, paste the
   contents of `supabase/schema.sql`, and run it (creates `products` +
   `orders` tables with RLS).

3. **Seed products**:

   ```bash
   npm run seed
   ```

Once the `products` table exists, the storefront reads from Supabase
automatically and falls back to the bundled catalog if the database is
unreachable or empty.

> **Security note:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` is safe for the browser.
> `SUPABASE_SERVICE_ROLE_KEY` is **server-only** — never expose it, and don’t
> paste it into shared chats.

## Payments

Checkout currently uses a **simulated escrow payment** so the full flow works
end-to-end (order creation, payment schedule, success screen, order history).
Swap in a real gateway (e.g. Paystack or Flutterwave) in the “Place order”
handler at `src/app/api/orders/route.ts` when you’re ready.

## Deployment (Vercel + GitHub)

1. Push this repo to GitHub.
2. In Vercel → **New Project** → import the repo. Next.js is auto-detected.
3. Add the three env vars from above in **Project → Settings → Environment
   Variables** (repeat for Production/Preview).
4. Deploy. Product images are served from `/public/media/products/*`.

## Scripts

| Script               | What it does                          |
| -------------------- | ------------------------------------- |
| `npm run dev`        | Start the dev server (Turbopack)      |
| `npm run build`      | Production build                      |
| `npm start`          | Serve the production build            |
| `npm run typecheck`  | Type-check the project                |
| `npm run lint`       | Lint with Next ESLint config          |
| `npm run seed`       | Upsert the product catalog into Supabase |
