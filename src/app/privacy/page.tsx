import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Privacy Notice" };

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice" updated="26 August 2026">
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">What we collect</h2>
        <p>
          We collect the information you give us — your name, email address,
          phone number, and delivery address — plus order history and account
          details when you create an account.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">How we use it</h2>
        <p>
          Your information is used to process orders, manage payments and escrow,
          deliver products, send order updates, and improve the marketplace.
          We never sell your personal data.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">Payments</h2>
        <p>
          Payment details are processed securely. Tornaz holds funds in escrow
          accounts on your behalf and only releases them to sellers as orders
          progress.
        </p>
      </section>
      <section>
        <h2 className="font-display text-lg font-bold text-text-heading">Your rights</h2>
        <p>
          You can request a copy of your personal data, ask us to correct it, or
          delete your account at any time by contacting support.
        </p>
      </section>
    </LegalPage>
  );
}
