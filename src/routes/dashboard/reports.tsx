import { createFileRoute } from "@tanstack/react-router";
import { currency, hhmm, weekHours, revenueByMonth, timeEntries } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/reports")({
  head: () => ({
    meta: [{ title: "Reports — Hivedesk Dashboard" }],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const totalWeekMinutes = weekHours.reduce((s, d) => s + Math.round(d.hours * 60), 0);
  const billableMinutes = timeEntries
    .filter((e) => e.billable)
    .reduce((sum, e) => sum + e.duration, 0);
  const totalRevenue = revenueByMonth.reduce((sum, m) => sum + m.revenue, 0);
  const avgHourly = billableMinutes > 0 ? totalRevenue / (billableMinutes / 60) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">Monthly and weekly summaries.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="This week" value={hhmm(totalWeekMinutes)} />
        <Stat label="Billable hours" value={hhmm(billableMinutes)} />
        <Stat label="Total revenue" value={currency(totalRevenue)} />
        <Stat label="Avg hourly rate" value={currency(avgHourly)} />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">Revenue by month</h2>
        <div className="space-y-2">
          {revenueByMonth.map((m) => (
            <div key={m.month} className="flex items-center gap-3">
              <span className="w-8 text-xs text-muted-foreground">{m.month}</span>
              <div className="relative flex-1 h-8 rounded-lg bg-muted">
                <div
                  className="absolute inset-y-2 left-0 rounded bg-mint-signal"
                  style={{ width: `${(m.revenue / totalRevenue) * 100}%` }}
                />
              </div>
              <span className="w-24 text-right text-sm tabular-nums" suppressHydrationWarning>
                {currency(m.revenue)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">Hours per day</h2>
        <div className="space-y-2">
          {weekHours.map((d) => (
            <div key={d.day} className="flex items-center gap-3">
              <span className="w-10 text-xs text-muted-foreground">{d.day}</span>
              <div className="relative flex-1 h-6 rounded-lg bg-muted">
                <div
                  className="absolute inset-y-0.5 left-0 rounded bg-amber-signal"
                  style={{ width: `${(d.hours / 8) * 100}%` }}
                />
              </div>
              <span className="w-16 text-right text-sm tabular-nums">
                {hhmm(Math.round(d.hours * 60))}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-medium text-muted-foreground">Recent time entries</h2>
        <div className="space-y-2">
          {timeEntries.map((e) => (
            <div key={e.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{e.task}</span>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold" suppressHydrationWarning>
        {value}
      </p>
    </div>
  );
}
