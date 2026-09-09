import { accentVar, projects } from "@/lib/mock-data";
import { Logo } from "@/components/logo";

export function DashboardPreview() {
  return (
    <div className="surface hover-lift mx-auto w-full max-w-4xl overflow-hidden p-2">
      <div className="rounded-lg border border-border/70 bg-background">
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
          <Logo className="scale-90 origin-left" />
          <div className="hidden gap-5 text-[11px] text-muted-foreground sm:flex">
            <span className="text-foreground">Overview</span>
            <span>Projects</span>
            <span>Time tracker</span>
            <span>Invoices</span>
          </div>
          <span className="size-5 rounded-full bg-amber-signal/70" />
        </div>

        <div className="grid gap-4 p-4 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="space-y-3">
            <div className="text-center">
              <p className="text-[11px] text-muted-foreground">Tuesday, September 9</p>
              <h3 className="mt-1 text-xl font-bold">Good morning, Alex</h3>
              <p className="text-[11px] text-muted-foreground">Here's your studio at a glance.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Stat label="Active projects" value="4" />
              <Stat label="Hours this week" value="18h 42m" />
            </div>
            <div className="rounded-lg border border-border/70 bg-card p-3">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Today's focus</span>
                <span className="size-2 rounded-full bg-amber-signal animate-dot" />
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-display text-2xl font-semibold tabular-nums">02:24:18</span>
                <span className="rounded-full bg-ink px-3 py-1 text-[11px] text-ink-foreground">Pause</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border/70 bg-card p-4">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-bold">Project pulse</h4>
                <p className="text-[11px] text-muted-foreground">Keep an eye on what's moving.</p>
              </div>
              <span className="text-[11px] text-muted-foreground">View all</span>
            </div>
            <div className="mt-4 space-y-4">
              {projects.slice(0, 3).map((p, i) => (
                <div key={p.id}>
                  <div className="flex items-baseline justify-between">
                    <p className="text-[13px] font-semibold">{p.name}</p>
                    <span className="text-[11px] text-muted-foreground">{p.progress}%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{p.client}</p>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="animate-bar h-full rounded-full"
                      style={{
                        width: `${p.progress}%`,
                        backgroundColor: accentVar[p.accent],
                        animationDelay: `${300 + i * 160}ms`,
                      }}
                    />
                  </div>
                  <p className="mt-1 text-center text-[10px] text-muted-foreground">{p.due}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-card p-3 text-center">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}
