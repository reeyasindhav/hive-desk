import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { currency } from "@/lib/mock-data";
import { invoices } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/invoices")({
  head: () => ({
    meta: [{ title: "Invoices — Hivedesk Dashboard" }],
  }),
  component: InvoicesPage,
});

function InvoicesPage() {
  const { location } = useRouterState();
  const isDetailPage =
    location.pathname.startsWith("/dashboard/invoices/") &&
    location.pathname !== "/dashboard/invoices";

  if (isDetailPage) {
    return <Outlet />;
  }

  const totalOutstanding = invoices
    .filter((inv) => inv.status !== "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {invoices.filter((inv) => inv.status !== "Paid").length} unpaid invoices totaling{" "}
            <span suppressHydrationWarning>{currency(totalOutstanding)}</span>
          </p>
        </div>
        <Link
          to="/dashboard/invoices/new"
          className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-ink-foreground"
        >
          Create invoice
        </Link>
      </div>

      <div className="space-y-3">
        {invoices.map((inv) => (
          <Link
            key={inv.id}
            to="/dashboard/invoices/$invoiceId"
            params={{ invoiceId: inv.id }}
            className="block rounded-xl border border-border bg-card p-5 no-underline transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold">{inv.id}</p>
                <p className="mt-1 text-sm text-muted-foreground">{inv.client}</p>
              </div>
              <span
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-medium",
                  inv.status === "Paid" && "bg-mint-signal/15 text-mint-signal",
                  inv.status === "Sent" && "bg-amber-signal/15 text-amber-signal",
                  inv.status === "Overdue" && "bg-rose-signal/15 text-rose-signal",
                  inv.status === "Draft" && "bg-muted text-muted-foreground",
                )}
              >
                {inv.status}
              </span>
            </div>

            <div className="mt-4 space-y-1">
              {inv.items.map((item) => (
                <div key={item.label} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span suppressHydrationWarning>{currency(item.hours * item.rate)}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between border-t border-border/60 pt-3 text-sm font-semibold">
              <span>Total</span>
              <span suppressHydrationWarning>{currency(inv.amount)}</span>
            </div>

            <div className="mt-2 text-xs text-muted-foreground">
              Issued {inv.issued} · Due {inv.due}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
