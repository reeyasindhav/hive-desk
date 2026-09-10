import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hivedesk" },
      {
        name: "description",
        content:
          "Hivedesk is built for independent freelancers who want a calm, focused workspace to run their business.",
      },
      { property: "og:title", content: "About — Hivedesk" },
      {
        property: "og:description",
        content:
          "Built for independent work. Hivedesk helps freelancers stay organized and bill with confidence.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="About"
        title="Built for independent work."
        lede="Hivedesk started from a simple frustration: most freelancer tools are either too complex or too simple. We built something in the middle — a calm, focused workspace that handles the boring stuff so you can focus on the work."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <div className="space-y-10 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Our mission</h2>
              <p className="mt-2">
                We believe independent workers deserve tools that respect their time and attention.
                Hivedesk is designed to stay out of your way — clean, fast, and built around the way
                freelancers actually work.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">What we believe</h2>
              <p className="mt-2">
                Less noise, more signal. Every feature in Hivedesk is built to reduce friction — not
                add more dashboards, more notifications, or more complexity.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Who it's for</h2>
              <p className="mt-2">
                Freelancers, solo operators, and small studios who want one calm place to track
                time, manage clients, and send invoices — without switching between five different
                apps.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">Get in touch</h2>
              <p className="mt-2">
                We read every message. If you have feedback, questions, or just want to say hello,
                reach out through the contact form on our site or email us directly.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </MarketingLayout>
  );
}
