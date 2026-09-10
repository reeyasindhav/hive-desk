import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Hivedesk" },
      {
        name: "description",
        content: "Hivedesk terms of service — the rules and agreements for using the platform.",
      },
      { property: "og:title", content: "Terms of Service — Hivedesk" },
      {
        property: "og:description",
        content: "Please read these terms carefully before using Hivedesk.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        lede="These terms govern your use of Hivedesk. By using the service, you agree to these terms."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Agreement to terms</h2>
              <p className="mt-2">
                By accessing or using Hivedesk, you agree to be bound by these Terms of Service. If
                you do not agree, please do not use the service.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Eligibility</h2>
              <p className="mt-2">
                You must be at least 18 years old and capable of entering into a binding agreement
                to use Hivedesk. By using the service, you represent that you meet these
                requirements.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Accounts</h2>
              <p className="mt-2">
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activity under your account. Notify us immediately of any unauthorized
                access or security breach.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Subscription and payments</h2>
              <p className="mt-2">
                Paid plans are billed in advance on a monthly or annual basis. Fees are
                non-refundable except as required by law. We reserve the right to change pricing
                with reasonable notice.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Acceptable use</h2>
              <p className="mt-2">
                You agree not to misuse Hivedesk or assist anyone else in doing so. This includes
                attempting to access the service by unauthorized means, interfering with service
                infrastructure, or using the service for unlawful purposes.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Intellectual property</h2>
              <p className="mt-2">
                Hivedesk and its original content, features, and functionality remain the exclusive
                property of Hivedesk. Your data remains yours. We claim no ownership over the
                projects, clients, or invoices you create.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Termination</h2>
              <p className="mt-2">
                We may suspend or terminate your access to Hivedesk at any time, without prior
                notice, for conduct that we believe violates these terms or is harmful to other
                users, us, or third parties, or for any other reason.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Limitation of liability</h2>
              <p className="mt-2">
                Hivedesk is provided on an as-is basis. We are not liable for any indirect,
                incidental, special, consequential, or punitive damages resulting from your use or
                inability to use the service.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Changes to these terms</h2>
              <p className="mt-2">
                We may update these terms from time to time. We will notify users of material
                changes by posting the updated terms on this page. Continued use of the service
                after changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Contact us</h2>
              <p className="mt-2">
                If you have any questions about these terms, please contact us through the contact
                form on our site or email us directly.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </MarketingLayout>
  );
}
