import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import type { OrderItem, PaymentMode, PaymentScheduleEntry } from "@/lib/types";

interface OrderRequest {
  email: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_mode: PaymentMode;
  schedule: PaymentScheduleEntry[];
}

export async function POST(request: Request) {
  let body: OrderRequest;
  try {
    body = (await request.json()) as OrderRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.email || !body.items?.length) {
    return NextResponse.json(
      { error: "Email and at least one item are required" },
      { status: 400 },
    );
  }

  // Try to attach the authenticated user, if any.
  let userId: string | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    userId = data.user?.id ?? null;
  } catch {
    userId = null;
  }

  const order = {
    id: randomUUID(),
    user_id: userId,
    email: body.email,
    items: body.items,
    subtotal: body.subtotal,
    delivery_fee: body.delivery_fee,
    total: body.total,
    payment_mode: body.payment_mode,
    schedule: body.schedule,
    status: "paid",
  };

  // Persist to Supabase. If the database isn't set up yet, the client still
  // completes the order locally (order id is returned either way).
  try {
    const admin = createAdminClient();
    const { error } = await admin.from("orders").insert(order);
    if (error) throw error;
  } catch {
    // Fall through — order still succeeds for the demo flow.
  }

  return NextResponse.json({
    ok: true,
    id: order.id,
    email: body.email,
    total: body.total,
    payment_mode: body.payment_mode,
    schedule: body.schedule,
  });
}
