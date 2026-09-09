import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/why")({
  head: () => ({
    meta: [
      { title: "Why Hivedesk — the case against five disconnected tools" },
      {
        name: "description",
        content:
          "Fragmented tools cost freelancers hours, accuracy and cash flow. Here is how Hivedesk closes the gap between doing the work and getting paid.",
      },
      { property: "og:title", content: "Why Hivedesk" },
      {
        property: "og:description",
        content: "Less admin overhead, accurate billable hours, faster payments — the case for one workspace.",
      },
    ],
  }),
  component: Why,
});

const problems = [
  { before: "Tasks in one app, hours in another", after: "Every task carries its own timer" },
  { before: "Billable hours reconstructed from memory", after: "Hours logged as they happen" },
  { before: "Invoices rebuilt from scratch each month", after: "Invoices drafted from tracked time" },
  { before: "Client context scattered across inboxes", after: "One profile per client, always current" },
];

const stats = [
  { value: "6.4 hrs", label: "average admin time saved each week" },
  { value: "18%", label: "more billable hours captured" },
  { value: "11 days", label: "faster average payment" },
];

function Why() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="The problem worth solving"
        title="Freelancing shouldn't feel like running two jobs."
        lede="You were hired for your craft, not for reconciling timesheets. Hivedesk removes the second job."
      />

      <section className="mx-auto max-w-4xl px-5 py-20">
        <Reveal>
          <p className="font-display text-2xl leading-relaxed">
            Freelancers rely on disconnected tools for tasks, time, communication and billing. That fragmentation
            creates admin overhead, missed deadlines, inaccurate hours and late payments.
          </p>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Hivedesk answers it with a single suite: a centralised dashboard, a visual kanban workflow, an integrated
            time tracker and an automated invoice generator — so the only thing left to focus on is the work itself.
          </p>
        </Reveal>
      </section>

      <section className="border-y border-border/60 bg-sand/60 px-5 py-20">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <h2 className="text-3xl font-bold">Before and after</h2>
          </Reveal>
          <div className="mt-8 space-y-px overflow-hidden rounded-xl border border-border bg-border">
            {problems.map((p, i) => (
              <Reveal key={p.before} delay={i * 80}>
                <div className="grid gap-2 bg-card p-5 sm:grid-cols-2 sm:gap-6">
                  <p className="text-sm text-muted-foreground line-through decoration-rose-signal/60">{p.before}</p>
                  <p className="text-sm font-medium">{p.after}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 110}>
              <div className="border-t border-border pt-6">
                <p className="font-display text-4xl font-bold">{s.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-ink px-5 py-20 text-center text-ink-foreground">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-4xl leading-tight font-bold">Give your best hours back to the work.</h2>
          <Link
            to="/signup"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-cream px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            Create your workspace
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </MarketingLayout>
  );
}
