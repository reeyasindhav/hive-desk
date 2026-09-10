import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  clients,
  currency,
  hhmm,
  invoices,
  projects,
  timeEntries,
  weekHours,
} from "@/lib/mock-data";
import { useTimer, formatTimer } from "@/lib/timer";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/")({
  component: Overview,
});

function Overview() {
  const { user } = useAuth();
  const { seconds, isRunning, start, pause, reset } = useTimer();

  const billableThisWeek = timeEntries
    .filter((e) => e.billable)
    .reduce((sum, e) => sum + e.duration, 0);
  const totalOutstanding = clients.reduce((sum, c) => sum + c.outstanding, 0);
  const activeProjects = projects.filter((p) => p.progress < 100);

  if (!user) return null;

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold" suppressHydrationWarning>
          Good morning, {user.name}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's your studio at a glance.</p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Active projects" value={activeProjects.length.toString()} />
        <Stat
          label="Hours this week"
          value={hhmm(weekHours.reduce((s, d) => s + Math.round(d.hours * 60), 0))}
        />
        <Stat label="Billable hours" value={hhmm(billableThisWeek)} />
        <Stat label="Outstanding" value={currency(totalOutstanding)} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Projects</h2>
            <div className="mt-4 space-y-4">
              {activeProjects.map((p, i) => (
                <ProjectRow key={p.id} project={p} delay={i * 100} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Timer</h2>
            <div className="mt-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
              <p className="text-xs text-muted-foreground">Today</p>
              <p
                className="mt-2 font-display text-3xl font-bold tabular-nums"
                suppressHydrationWarning
              >
                {formatTimer(seconds)}
              </p>
              <div className="mt-3 flex gap-2">
                {isRunning ? (
                  <button
                    onClick={pause}
                    className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-ink-foreground"
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={start}
                    className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-ink-foreground"
                  >
                    Start
                  </button>
                )}
                <button
                  onClick={reset}
                  className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Invoices</h2>
            <div className="mt-4 space-y-3">
              {invoices.slice(0, 3).map((inv) => (
                <div
                  key={inv.id}
                  className="rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{inv.id}</p>
                    <span
                      className={cn(
                        "text-xs font-medium",
                        inv.status === "Paid" && "text-mint-signal",
                        inv.status === "Sent" && "text-amber-signal",
                        inv.status === "Overdue" && "text-rose-signal",
                        inv.status === "Draft" && "text-muted-foreground",
                      )}
                    >
                      {inv.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{inv.client}</p>
                  <p className="mt-1 text-sm font-medium" suppressHydrationWarning>
                    {currency(inv.amount)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground">Today's entries</h2>
            <div className="mt-4 space-y-2">
              {timeEntries
                .filter((e) => e.date === "Today")
                .map((e) => (
                  <div key={e.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{e.task}</span>
                    <span className="tabular-nums" suppressHydrationWarning>
                      {hhmm(e.duration)}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold tabular-nums" suppressHydrationWarning>
        {value}
      </p>
    </div>
  );
}

function ProjectRow({ project, delay }: { project: (typeof projects)[0]; delay: number }) {
  const accentMap = {
    amber: "bg-amber-signal",
    sky: "bg-sky-signal",
    mint: "bg-mint-signal",
    rose: "bg-rose-signal",
  };

  return (
    <div
      className="rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{project.name}</p>
        <span className="text-xs text-muted-foreground">{project.progress}%</span>
      </div>
      <p className="text-xs text-muted-foreground">{project.client}</p>
      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", accentMap[project.accent])}
          style={{ width: `${project.progress}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{project.due}</p>
    </div>
  );
}
