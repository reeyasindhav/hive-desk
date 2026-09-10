import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Hivedesk" },
      {
        name: "description",
        content: "Get in touch with the Hivedesk team. We read every message.",
      },
      { property: "og:title", content: "Contact — Hivedesk" },
      {
        property: "og:description",
        content: "Questions, feedback, or just saying hello — we'd love to hear from you.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Contact"
        title="We'd love to hear from you."
        lede="Questions, feedback, or just saying hello — we read every message."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold">General inquiries</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  For questions about Hivedesk, partnerships, or anything else, reach out to us
                  directly.
                </p>
                <p className="mt-2 text-sm font-medium">hello@hivedesk.app</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Support</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Need help with your account, billing, or a bug? Our support team is here for you.
                </p>
                <p className="mt-2 text-sm font-medium">support@hivedesk.app</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold">Follow along</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  We share updates, tips, and occasional thoughts on independent work.
                </p>
                <p className="mt-2 text-sm font-medium">@hivedesk on Twitter / X</p>
              </div>
            </div>

            {submitted ? (
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <p className="text-lg font-semibold text-mint-signal">Message sent</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Thanks for reaching out. We'll get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
                    placeholder="you@studio.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
                    placeholder="Tell us what's on your mind..."
                  />
                </div>
                <button
                  type="submit"
                  className="rounded-xl bg-ink px-5 py-3 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
                >
                  Send message
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </section>
    </MarketingLayout>
  );
}
