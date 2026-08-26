import type { CartItem, PaymentMode, PaymentScheduleEntry } from "@/lib/types";
import { PAY_SMALL_SMALL, DELIVERY } from "@/lib/constants";

/**
 * Build the payment schedule for a total.
 * - "full": one payment of the whole total.
 * - "pay_small_small": 60% today, 20% in 30 days, 20% in 60 days.
 *   The final installment absorbs rounding so the parts always sum to the total.
 */
export function buildPaymentSchedule(
  total: number,
  mode: PaymentMode,
): PaymentScheduleEntry[] {
  if (mode === "full") {
    return [{ label: "Pay in full", dueInDays: 0, amount: total }];
  }

  const entries = PAY_SMALL_SMALL.shares.map((share, i) => {
    const dueInDays = PAY_SMALL_SMALL.days[i];
    return {
      label:
        i === 0
          ? "Today"
          : dueInDays === 30
            ? "In 30 days"
            : "In 60 days",
      dueInDays,
      amount: Math.round(total * share),
    };
  });

  // Adjust the last installment so the parts sum exactly to the total.
  const sum = entries.reduce((n, e) => n + e.amount, 0);
  entries[entries.length - 1].amount += total - sum;
  return entries;
}

/** Delivery fee: free for digital-only orders and orders at/above the free threshold. */
export function deliveryFee(items: CartItem[]): number {
  if (items.length === 0) return 0;
  if (items.every((i) => i.productType === "digital")) return 0;
  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  return subtotal >= DELIVERY.freeThreshold ? 0 : DELIVERY.fee;
}

/** Subtotal of the cart (before delivery). */
export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.price * i.quantity, 0);
}
