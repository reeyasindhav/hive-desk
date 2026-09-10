import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Hivedesk" },
      {
        name: "description",
        content: "Hivedesk privacy policy — how we collect, use, and protect your data.",
      },
      { property: "og:title", content: "Privacy Policy — Hivedesk" },
      {
        property: "og:description",
        content: "Your privacy matters. Here's how Hivedesk handles your data.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede="Your privacy matters. This policy explains what we collect, why we collect it, and how we keep your data safe."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Information we collect</h2>
              <p className="mt-2">
                We collect the minimum information needed to run Hivedesk: your name, email address,
                workspace data (projects, clients, invoices, time entries), and billing information
                when applicable.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">How we use your information</h2>
              <p className="mt-2">
                Your data is used to provide and improve the Hivedesk service. We do not sell your
                personal data to third parties. We may use anonymized usage data to improve
                performance and reliability.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Data storage and security</h2>
              <p className="mt-2">
                Data is stored securely using industry-standard encryption. Access is restricted to
                authorized personnel only. We retain data only as long as your account is active or
                as required by law.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Cookies and tracking</h2>
              <p className="mt-2">
                Hivedesk uses essential cookies to maintain session state and preferences. We do not
                use invasive third-party tracking cookies.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Third-party services</h2>
              <p className="mt-2">
                We may use trusted third-party services for hosting, analytics, and payment
                processing. These providers are contractually obligated to protect your data and may
                only use it for the services they provide to us.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Your rights</h2>
              <p className="mt-2">
                You can request a copy of your data, correct inaccurate information, or request
                deletion of your account and data at any time by contacting us or using the account
                settings in your dashboard.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Changes to this policy</h2>
              <p className="mt-2">
                We may update this policy from time to time. We will notify you of material changes
                by posting the new policy on this page and updating the effective date.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Contact us</h2>
              <p className="mt-2">
                If you have any questions about this privacy policy, please reach out through the
                contact form on our site or email us directly.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </MarketingLayout>
  );
}
