import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Play, Check } from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { DashboardPreview } from "@/components/dashboard-preview";
import { Reveal } from "@/components/reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hivedesk — More making. Less managing." },
      {
        name: "description",
        content:
          "Hivedesk brings projects, time, clients and invoices into one beautifully simple workspace built for independent work.",
      },
      { property: "og:title", content: "Hivedesk — More making. Less managing." },
      {
        property: "og:description",
        content: "The all-in-one productivity suite for freelancers: kanban, time tracking and invoicing in one place.",
      },
    ],
  }),
  component: Home,
});

const logos = ["Moss & Co.", "Lumen", "Northstar", "Fieldnote", "Forma"];

const pillars = [
  {
    n: "01",
    title: "See the whole studio",
    body: "Projects, priorities, time, and cash flow in one calm command center.",
  },
  {
    n: "02",
    title: "Move work forward",
    body: "Turn loose ends into a visual workflow your clients and collaborators understand.",
  },
  {
    n: "03",
    title: "Get paid on time",
    body: "Log billable hours and send polished invoices before admin starts piling up.",
  },
];

function Home() {
  return (
    <MarketingLayout>
      <section className="px-5 pt-16 pb-20 text-center">
        <div className="animate-fade mx-auto inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-mint-signal animate-dot" />
          Your studio, in one place
        </div>

        <h1 className="animate-rise mx-auto mt-8 max-w-3xl text-6xl leading-[0.98] font-bold md:text-7xl">
          More making.
          <br />
          Less managing.
        </h1>

        <p className="animate-rise mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-muted-foreground [animation-delay:120ms]">
          Hivedesk brings your projects, time, clients, and invoices into one beautifully simple workspace built for
          independent work.
        </p>

        <div className="animate-rise mt-9 flex flex-wrap items-center justify-center gap-3 [animation-delay:220ms]">
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
          >
            Start for free
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/features"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
          >
            <Play className="size-3.5 fill-current" />
            See how it works
          </Link>
        </div>

        <p className="animate-fade mt-4 text-xs text-muted-foreground [animation-delay:320ms]">
          Free forever for your first project · No credit card required
        </p>

        <div className="animate-rise mt-14 px-1 [animation-delay:380ms]">
          <DashboardPreview />
        </div>
      </section>

      <section className="border-y border-border/60 bg-sand/60 px-5 py-10">
        <Reveal>
          <p className="eyebrow text-center">Trusted by independent studios everywhere</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-16 gap-y-4">
            {logos.map((l) => (
              <span
                key={l}
                className="font-display text-sm tracking-[0.16em] text-muted-foreground/70 uppercase transition-colors hover:text-foreground"
              >
                {l}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Reveal>
            <p className="eyebrow">One less thing to worry about</p>
            <h2 className="mt-5 text-4xl leading-[1.08] font-bold md:text-[2.75rem]">
              The quiet operating system for your work.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The best tools disappear into your day. Hivedesk keeps the important things close, without adding more
              noise.
            </p>
          </Reveal>

          <div>
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 110}>
                <div className="group grid grid-cols-[3rem_1fr] gap-4 border-t border-border py-7 last:border-b">
                  <span className="text-xs text-muted-foreground">{p.n}</span>
                  <div>
                    <h3 className="text-lg font-bold transition-transform group-hover:translate-x-1">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink px-5 py-24 text-ink-foreground">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-ink-foreground/50">Built for the long haul</p>
            <h2 className="mt-5 text-4xl leading-[1.08] font-bold md:text-[2.75rem]">
              A better business starts with a clearer day.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/70">
              Stop stitching together five different tools. Make room for the work only you can do.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-2xl bg-cream p-6 text-foreground shadow-lift">
              <p className="text-sm font-semibold">Everything you need to begin</p>
              <ul className="mt-4 space-y-3 text-sm">
                {["Unlimited projects", "Time tracking and invoices", "Client workspace"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="size-4 text-mint-signal" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/signup"
                className="group mt-6 flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
              >
                Start building your rhythm
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </MarketingLayout>
  );
}
