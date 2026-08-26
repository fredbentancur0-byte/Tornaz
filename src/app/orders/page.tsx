import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Package } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate, formatNaira } from "@/lib/format";
import { ORDER_STATUS_LABELS } from "@/lib/constants";
import type { Order } from "@/lib/types";
import { Badge } from "@/components/badge";
import { LinkButton } from "@/components/button";

export const metadata: Metadata = { title: "Your orders" };

export default async function OrdersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/orders");
  }

  let orders: Order[] = [];
  try {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    orders = (data as Order[] | null) ?? [];
  } catch {
    orders = [];
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <h1 className="font-display text-3xl font-extrabold tracking-tight text-text-heading">
        Your orders
      </h1>
      <p className="mt-2 text-sm text-text-tertiary">
        Orders placed while signed in appear here.
      </p>

      {orders.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border-strong bg-bg-sunken p-10 text-center">
          <Package size={32} strokeWidth={1.75} className="mx-auto text-text-tertiary" />
          <p className="mt-4 font-display text-lg font-bold text-text-heading">No orders yet</p>
          <p className="mt-1 text-sm text-text-tertiary">
            When you place an order it will show up here with its payment plan.
          </p>
          <LinkButton href="/products" variant="accent" size="lg" className="mt-6">
            Shop products
          </LinkButton>
        </div>
      ) : (
        <ul className="mt-8 space-y-5">
          {orders.map((order) => (
            <li key={order.id} className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-text-tertiary">
                    {order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-text-primary">
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <Badge variant={order.status === "paid" ? "success" : "neutral"}>
                  {ORDER_STATUS_LABELS[order.status] ?? order.status}
                </Badge>
              </div>

              <ul className="mt-4 space-y-2 border-t border-border pt-4">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.productId}`} className="flex justify-between text-sm">
                    <Link
                      href={`/products/${item.slug}`}
                      className="line-clamp-1 pr-4 text-text-secondary hover:text-text-primary"
                    >
                      {item.name} <span className="text-text-tertiary">× {item.quantity}</span>
                    </Link>
                    <span className="shrink-0 font-medium tabular-nums text-text-primary">
                      {formatNaira(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-text-tertiary">
                    {order.payment_mode === "pay_small_small"
                      ? "Pay Small Small — 60/20/20 over 60 days"
                      : "Paid in full"}
                  </p>
                  <p className="mt-1 text-sm font-semibold tabular-nums text-text-heading">
                    Total {formatNaira(order.total)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
