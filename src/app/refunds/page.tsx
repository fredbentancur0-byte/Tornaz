import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Refund Policy" };

export default function RefundsPage() {
  return (
    <LegalPage title="Refund Policy" updated="26 August 2026">
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">Physical products</h2>
        <p>
          Because payments are held in escrow, unfulfilled orders are refunded in
          full — including any installments already paid. If an order is
          cancelled before delivery, your escrow balance is returned to your
          original payment method within 3–7 business days.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">Damaged or incorrect items</h2>
        <p>
          If your order arrives damaged or doesn&apos;t match the listing, contact
          support within 48 hours of delivery with photos. Tornaz will arrange a
          replacement or refund once the return is confirmed.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">Pay Small Small cancellations</h2>
        <p>
          You can cancel a Pay Small Small plan before delivery. Paid
          installments are returned, less any non-refundable charges already
          released to the seller for work completed.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">Digital products</h2>
        <p>
          Digital guides are non-refundable once downloaded or accessed. If a
          digital product is defective or fails to open, contact support and
          we&apos;ll make it right.
        </p>
      </section>
    </LegalPage>
  );
}
