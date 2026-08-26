import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Package, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/sign-out-button";

export const metadata: Metadata = { title: "My account" };

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const fullName =
    (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "Tornaz customer";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 md:py-14">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <UserIcon size={26} strokeWidth={1.75} className="text-primary" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-extrabold text-text-heading">
              {fullName}
            </h1>
            <p className="text-sm text-text-tertiary">{user.email}</p>
          </div>
        </div>
        <SignOutButton />
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/orders"
          className="group rounded-2xl border border-border bg-surface p-6 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <Package size={26} strokeWidth={1.75} className="text-primary" />
          <h2 className="mt-4 font-display text-lg font-bold text-text-heading">Your orders</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Track the status of every order and its payment plan.
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
            View orders
            <ArrowRight size={15} strokeWidth={1.75} />
          </span>
        </Link>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <Package size={26} strokeWidth={1.75} className="text-primary" />
          <h2 className="mt-4 font-display text-lg font-bold text-text-heading">Pay Small Small</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Pay 60% today, then 20% in 30 days and 20% in 60 days on eligible
            items. Delivery after the final payment clears.
          </p>
          <Link
            href="/pay-small-small"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            How it works
            <ArrowRight size={15} strokeWidth={1.75} />
          </Link>
        </div>
      </div>
    </div>
  );
}
