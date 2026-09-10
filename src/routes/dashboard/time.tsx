import { createFileRoute } from "@tanstack/react-router";
import { useTimer, formatTimer } from "@/lib/timer";
import { timeEntries, hhmm, weekHours } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/time")({
  head: () => ({
    meta: [{ title: "Time — Hivedesk Dashboard" }],
  }),
  component: TimePage,
});

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

function TimePage() {
  const { seconds, isRunning, start, pause, reset } = useTimer();

  const totalWeekMinutes = weekHours.reduce((s, d) => s + Math.round(d.hours * 60), 0);
  const billableMinutes = timeEntries
    .filter((e) => e.billable)
    .reduce((sum, e) => sum + e.duration, 0);
  const todayMinutes = timeEntries
    .filter((e) => e.date === "Today")
    .reduce((s, e) => s + e.duration, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Time</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track your billable hours.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
        <p className="text-xs text-muted-foreground">Today</p>
        <p className="mt-2 font-display text-4xl font-bold tabular-nums" suppressHydrationWarning>
          {formatTimer(seconds)}
        </p>
        <div className="mt-4 flex gap-2">
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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <Stat label="This week" value={hhmm(totalWeekMinutes)} />
        <Stat label="Billable" value={hhmm(billableMinutes)} />
        <Stat label="Today" value={hhmm(todayMinutes)} />
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground">Recent entries</h2>
        <div className="mt-3 space-y-2">
          {timeEntries.slice(0, 8).map((e) => (
            <div key={e.id} className="flex items-center justify-between text-sm">
              <div>
                <p className="font-medium">{e.task}</p>
                <p className="text-xs text-muted-foreground">
                  {e.project} · {e.date}
                </p>
              </div>
              <span className="tabular-nums" suppressHydrationWarning>
                {hhmm(e.duration)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
