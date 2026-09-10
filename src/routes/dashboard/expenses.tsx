import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { currency } from "@/lib/mock-data";
import { useTimer } from "@/lib/timer";

export const Route = createFileRoute("/dashboard/expenses")({
  head: () => ({
    meta: [{ title: "Expenses — Hivedesk Dashboard" }],
  }),
  component: ExpensesPage,
});

type Expense = {
  id: string;
  label: string;
  amount: number;
  category: "software" | "travel" | "hardware" | "services" | "other";
  date: string;
  recurring?: boolean;
};

const EXPENSE_CATEGORIES = [
  { value: "software", label: "Software" },
  { value: "travel", label: "Travel" },
  { value: "hardware", label: "Hardware" },
  { value: "services", label: "Services" },
  { value: "other", label: "Other" },
] as const;

const categoryColors = {
  software: "bg-sky-signal",
  travel: "bg-mint-signal",
  hardware: "bg-amber-signal",
  services: "bg-purple-signal",
  other: "bg-muted-foreground",
};

const categoryBackgrounds = {
  software: "bg-sky-signal/15 text-sky-signal",
  travel: "bg-mint-signal/15 text-mint-signal",
  hardware: "bg-amber-signal/15 text-amber-signal",
  services: "bg-purple-signal/15 text-purple-signal",
  other: "bg-muted text-muted-foreground",
};

const initialExpenses: Expense[] = [
  {
    id: "e1",
    label: "Figma subscription",
    amount: 12,
    category: "software",
    date: "2026-09-01",
    recurring: true,
  },
  {
    id: "e2",
    label: "Client lunch — Lumen Studio",
    amount: 34.5,
    category: "travel",
    date: "2026-09-03",
  },
  { id: "e3", label: "MacBook Pro repair", amount: 299, category: "hardware", date: "2026-08-28" },
  {
    id: "e4",
    label: "Notion workspace",
    amount: 8,
    category: "software",
    date: "2026-09-01",
    recurring: true,
  },
  {
    id: "e5",
    label: "Contractor — backend setup",
    amount: 450,
    category: "services",
    date: "2026-08-22",
  },
];

function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Expense["category"]>("software");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonth = expenses
    .filter((e) => e.date.startsWith("2026-09"))
    .reduce((sum, e) => sum + e.amount, 0);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label || !amount) return;
    const newExpense: Expense = {
      id: "e" + Date.now(),
      label,
      amount: parseFloat(amount),
      category,
      date,
    };
    setExpenses([newExpense, ...expenses]);
    setLabel("");
    setAmount("");
    setCategory("software");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Expenses</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your business expenses alongside income.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Stat label="Total" value={currency(total)} />
        <Stat label="This month" value={currency(thisMonth)} />
        <Stat label="Entries" value={expenses.length.toString()} />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.65fr)_minmax(0,0.35fr)]">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Recent expenses</h2>
          <div className="mt-4 space-y-2">
            {expenses.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className={cn("size-2 rounded-full", categoryColors[e.category])} />
                  <div>
                    <p className="text-sm font-medium">{e.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.date} {e.recurring ? "· Recurring" : ""}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-medium tabular-nums" suppressHydrationWarning>
                  {currency(e.amount)}
                </span>
              </div>
            ))}
            {expenses.length === 0 && (
              <p className="text-sm text-muted-foreground">No expenses recorded yet.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Add expense</h2>
          <form onSubmit={handleAdd} className="mt-4 space-y-4">
            <div>
              <label htmlFor="label" className="block text-xs font-medium text-muted-foreground">
                Label
              </label>
              <input
                id="label"
                type="text"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
                placeholder="e.g. Figma subscription"
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-xs font-medium text-muted-foreground">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                required
                min="0"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
                placeholder="0.00"
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-muted-foreground">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Expense["category"])}
                className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
              >
                {EXPENSE_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date" className="block text-xs font-medium text-muted-foreground">
                Date
              </label>
              <input
                id="date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-ink px-5 py-3 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
            >
              Add expense
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center transition-colors hover:bg-muted/50">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold tabular-nums" suppressHydrationWarning>
        {value}
      </p>
    </div>
  );
}
