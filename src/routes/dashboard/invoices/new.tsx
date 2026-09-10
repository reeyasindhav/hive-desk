import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { currency, hhmm } from "@/lib/mock-data";
import { timeEntries, clients } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard/invoices/new")({
  head: () => ({
    meta: [{ title: "Create invoice — Hivedesk Dashboard" }],
  }),
  component: CreateInvoicePage,
});

function CreateInvoicePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const billableEntries = timeEntries.filter((e) => e.billable);
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  const [clientName, setClientName] = useState("");
  const [dueDate, setDueDate] = useState("");

  if (!user) {
    navigate({ to: "/login" });
    return null;
  }

  const totalAmount = billableEntries
    .filter((e) => selectedEntries.has(e.id))
    .reduce(
      (sum, e) => sum + (e.duration / 60) * (clients.find((c) => c.name === e.client)?.rate || 0),
      0,
    );

  const handleSubmit = () => {
    alert("Invoice created (mock). Total: " + currency(totalAmount));
    navigate({ to: "/dashboard/invoices" });
  };

  const handleSelect = (id: string) => {
    const updated = new Set(selectedEntries);
    if (updated.has(id)) {
      updated.delete(id);
    } else {
      updated.add(id);
    }
    setSelectedEntries(updated);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <Link
          to="/dashboard/invoices"
          className="text-xs text-muted-foreground hover:text-mint-signal"
        >
          ← Invoices
        </Link>
        <h1 className="mt-2 text-3xl font-bold">Create invoice</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select billable time entries to include in this invoice.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">Client</label>
          <select
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
          >
            <option value="">Select a client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name} — ${c.rate}/hr
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground">Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
          />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground">Billable time entries</h2>
        <div className="mt-3 space-y-1">
          {billableEntries.map((entry) => (
            <label
              key={entry.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
            >
              <input
                type="checkbox"
                checked={selectedEntries.has(entry.id)}
                onChange={() => handleSelect(entry.id)}
                className="size-4 cursor-pointer rounded border-border"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{entry.task}</p>
                <p className="text-xs text-muted-foreground">
                  {entry.project} · {entry.date}
                </p>
              </div>
              <span className="tabular-nums text-sm" suppressHydrationWarning>
                {hhmm(entry.duration)}
              </span>
            </label>
          ))}
          {billableEntries.length === 0 && (
            <p className="text-sm text-muted-foreground">No billable time entries found.</p>
          )}
        </div>
      </div>

      {selectedEntries.size > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold tabular-nums" suppressHydrationWarning>
              {currency(totalAmount)}
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {selectedEntries.size} {selectedEntries.size === 1 ? "entry" : "entries"} selected
          </p>
        </div>
      )}

      <div className="flex justify-end gap-2 border-t border-border/60 pt-4">
        <Link
          to="/dashboard/invoices"
          className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
        >
          Cancel
        </Link>
        <button
          onClick={handleSubmit}
          disabled={selectedEntries.size === 0 || !clientName || !dueDate}
          className={cn(
            "rounded-lg bg-ink px-4 py-2 text-sm font-medium text-ink-foreground",
            "disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          Generate invoice
        </button>
      </div>
    </div>
  );
}
