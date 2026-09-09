import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, KanbanSquare, Timer, ReceiptText, Users, BarChart3, Bell } from "lucide-react";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Hivedesk" },
      {
        name: "description",
        content:
          "Kanban workflow, a one-tap time tracker, automated invoices and client profiles — every part of freelance admin in one suite.",
      },
      { property: "og:title", content: "Features — Hivedesk" },
      {
        property: "og:description",
        content: "Kanban, time tracking, invoicing and client management, designed to work as one.",
      },
    ],
  }),
  component: Features,
});

const features = [
  {
    icon: KanbanSquare,
    title: "Visual kanban workflow",
    body: "Drag work from backlog to delivered. Every card carries its client, estimate and due date.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=900&q=70",
  },
  {
    icon: Timer,
    title: "Time tracker that stays honest",
    body: "One tap to start, one tap to stop. Hours flow straight into the right project and the next invoice.",
    image: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&w=900&q=70",
  },
  {
    icon: ReceiptText,
    title: "Invoices without the dread",
    body: "Turn tracked hours into a clean, branded invoice in seconds, then watch its status until it's paid.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=70",
  },
];

const grid = [
  { icon: Users, title: "Client profiles", body: "Rates, contacts, history and notes, all on one page." },
  { icon: BarChart3, title: "Revenue insight", body: "Know your best months before your accountant does." },
  { icon: Bell, title: "Gentle nudges", body: "Reminders for deadlines and overdue invoices — never spam." },
];

function Features() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Everything in one suite"
        title="Four tools, one calm surface."
        lede="Hivedesk replaces the tab-hopping between a task board, a stopwatch, a spreadsheet and an invoice template."
      />

      <section className="mx-auto max-w-6xl space-y-24 px-5 py-24">
        {features.map((f, i) => (
          <Reveal key={f.title}>
            <div className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div>
                <span className="inline-grid size-10 place-items-center rounded-xl bg-accent">
                  <f.icon className="size-5" />
                </span>
                <h2 className="mt-5 text-3xl leading-tight font-bold">{f.title}</h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                <Link
                  to="/signup"
                  className="group mt-6 inline-flex items-center gap-2 text-sm font-medium underline-offset-4 hover:underline"
                >
                  Try it free
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div className="surface hover-lift overflow-hidden p-0">
                <img
                  src={f.image}
                  alt={f.title}
                  loading="lazy"
                  className="h-64 w-full object-cover opacity-95 md:h-72"
                />
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-border/60 bg-sand/60 px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {grid.map((g, i) => (
            <Reveal key={g.title} delay={i * 100}>
              <div className="surface hover-lift h-full p-6">
                <g.icon className="size-5" />
                <h3 className="mt-4 text-lg font-bold">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </MarketingLayout>
  );
}
