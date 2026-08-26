import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="26 August 2026">
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">1. The marketplace</h2>
        <p>
          Tornaz Stores connects buyers with independent sellers. Tornaz is not
          the seller of the products listed on the marketplace; products are
          sold and fulfilled by their listed sellers.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">2. Payments and escrow</h2>
        <p>
          Payments for physical orders are held by Tornaz in escrow until the
          order is ready for delivery. Eligible physical products may be paid
          for across three parts — 60% at checkout, 20% after 30 days, and 20%
          after 60 days. Goods are delivered after the final payment clears.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">3. Orders</h2>
        <p>
          Placing an order is a commitment to buy. Tornaz may cancel or refuse
          orders that appear fraudulent, mispriced, or otherwise in breach of
          these terms.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">4. Digital products</h2>
        <p>
          Digital guides and templates open in your library immediately after
          payment. Digital products are generally non-refundable once accessed.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">5. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, Tornaz is not liable for
          indirect or consequential losses arising from marketplace transactions.
          Our liability is limited to the amount you paid for the order in question.
        </p>
      </section>
    </LegalPage>
  );
}
