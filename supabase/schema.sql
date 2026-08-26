-- Tornaz Stores — Supabase schema
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).

-- ===========================================================================
-- Products
-- ===========================================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category text not null,
  price numeric not null check (price >= 0),
  from_price boolean not null default false,
  original_price numeric,
  description text not null default '',
  long_description text not null default '',
  product_type text not null default 'physical' check (product_type in ('physical', 'digital')),
  pay_small_small boolean not null default false,
  stock text not null default 'in_stock' check (stock in ('in_stock', 'low_stock', 'out_of_stock')),
  seller text not null default '',
  seller_verified boolean not null default true,
  image_url text not null default '',
  featured boolean not null default false,
  is_new boolean not null default false,
  rating numeric,
  reviews integer,
  created_at timestamptz not null default now()
);

-- Public read access for the storefront (anonymous + authenticated).
alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products for select
  using (true);

-- ===========================================================================
-- Orders
-- ===========================================================================
create table if not exists public.orders (
  id uuid primary key,
  user_id uuid references auth.users (id) on delete set null,
  email text not null,
  items jsonb not null,
  subtotal numeric not null check (subtotal >= 0),
  delivery_fee numeric not null default 0 check (delivery_fee >= 0),
  total numeric not null check (total >= 0),
  payment_mode text not null check (payment_mode in ('full', 'pay_small_small')),
  schedule jsonb not null,
  status text not null default 'paid' check (status in ('pending', 'paid', 'processing', 'delivered', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Users can read their own orders. Inserts are handled server-side
-- (service role) so the order is recorded even for guest checkouts.
alter table public.orders enable row level security;

create policy "Users can read their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

-- ===========================================================================
-- Helper index
-- ===========================================================================
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists products_category_idx on public.products (category);
