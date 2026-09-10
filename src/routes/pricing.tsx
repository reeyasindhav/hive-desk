import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Hivedesk" },
      {
        name: "description",
        content:
          "Simple freelancer pricing: a free solo plan, a studio plan for growing practices, and team billing.",
      },
      { property: "og:title", content: "Pricing — Hivedesk" },
      {
        property: "og:description",
        content: "Free to start. Flat pricing as your practice grows.",
      },
    ],
  }),
  component: Pricing,
});

const plans = [
  {
    name: "Solo",
    monthly: 0,
    tagline: "For your first client.",
    features: ["1 active project", "Time tracker", "3 invoices per month", "1 client profile"],
  },
  {
    name: "Studio",
    monthly: 14,
    tagline: "For a full freelance practice.",
    features: [
      "Unlimited projects & clients",
      "Kanban workflow",
      "Automated invoices & reminders",
      "Revenue insights",
      "Client portal links",
    ],
    featured: true,
  },
  {
    name: "Collective",
    monthly: 29,
    tagline: "For small teams sharing work.",
    features: [
      "Everything in Studio",
      "Up to 5 collaborators",
      "Shared workload view",
      "Team time reports",
    ],
  },
];

const faqs = [
  {
    q: "Can I switch plans later?",
    a: "Yes — upgrade or downgrade whenever you like, and we prorate the difference.",
  },
  {
    q: "Do you take a cut of invoices?",
    a: "Never. Hivedesk charges a flat fee, and every invoice payment is yours.",
  },
  {
    q: "Is there a free trial of Studio?",
    a: "Studio is free for 14 days, with no card required to begin.",
  },
];

function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Pricing"
        title="Priced like a tool, not a tax."
        lede="Start free while you find your rhythm. Upgrade only when Hivedesk is doing real work for you."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className={cn(!yearly && "font-medium")}>Monthly</span>
          <button
            onClick={() => setYearly((v) => !v)}
            aria-label="Toggle yearly billing"
            className="relative h-6 w-11 rounded-full bg-muted transition-colors data-[on=true]:bg-ink"
            data-on={yearly}
          >
            <span
              className="absolute top-0.5 left-0.5 size-5 rounded-full bg-card shadow-soft transition-transform duration-300"
              style={{ transform: yearly ? "translateX(20px)" : "none" }}
            />
          </button>
          <span className={cn(yearly && "font-medium")}>
            Yearly <span className="text-muted-foreground">(2 months free)</span>
          </span>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 110}>
              <div
                className={cn(
                  "hover-lift flex h-full flex-col rounded-2xl border p-7",
                  plan.featured
                    ? "border-transparent bg-ink text-ink-foreground"
                    : "border-border bg-card",
                )}
              >
                <p className={cn("text-sm font-medium", plan.featured && "text-ink-foreground")}>
                  {plan.name}
                </p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    plan.featured ? "text-ink-foreground/60" : "text-muted-foreground",
                  )}
                >
                  {plan.tagline}
                </p>
                <p className="mt-6 font-display text-5xl font-bold">
                  ${yearly ? Math.round(plan.monthly * 10) : plan.monthly}
                  <span
                    className={cn(
                      "text-sm font-normal",
                      plan.featured ? "text-ink-foreground/60" : "text-muted-foreground",
                    )}
                  >
                    /{yearly ? "yr" : "mo"}
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          plan.featured ? "text-mint-signal" : "text-mint-signal",
                        )}
                      />
                      <span className={plan.featured ? "text-ink-foreground/85" : undefined}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={cn(
                    "mt-8 rounded-xl px-5 py-3 text-center text-sm font-medium transition-transform hover:-translate-y-0.5",
                    plan.featured ? "bg-cream text-ink" : "bg-ink text-ink-foreground",
                  )}
                >
                  {plan.monthly === 0 ? "Start free" : `Choose ${plan.name}`}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-sand/60 px-5 py-20">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-bold">Questions, answered</h2>
          </Reveal>
          <div className="mt-8 space-y-px overflow-hidden rounded-xl border border-border bg-border">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 90}>
                <div className="bg-card p-6">
                  <p className="text-sm font-semibold">{f.q}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
