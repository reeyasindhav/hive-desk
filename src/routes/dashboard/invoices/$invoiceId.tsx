import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { currency } from "@/lib/mock-data";
import { invoices, clients, type Invoice } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/invoices/$invoiceId")({
  head: () => ({
    meta: [{ title: "Invoice — Hivedesk Dashboard" }],
  }),
  component: InvoiceDetailPage,
});

function InvoiceDetailPage() {
  const { invoiceId } = Route.useParams();
  const invoice = invoices.find((inv) => inv.id === invoiceId);

  if (!invoice) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Invoice not found.</p>
        <Link to="/dashboard/invoices" className="mt-4 text-sm text-mint-signal hover:underline">
          ← Back to invoices
        </Link>
      </div>
    );
  }

  const client = clients.find((c) => c.name === invoice.client);

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-start justify-between">
        <Link
          to="/dashboard/invoices"
          className="text-xs text-muted-foreground hover:text-mint-signal"
        >
          ← Invoices
        </Link>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-medium",
            invoice.status === "Paid" && "bg-mint-signal/15 text-mint-signal",
            invoice.status === "Sent" && "bg-amber-signal/15 text-amber-signal",
            invoice.status === "Overdue" && "bg-rose-signal/15 text-rose-signal",
            invoice.status === "Draft" && "bg-muted text-muted-foreground",
          )}
        >
          {invoice.status}
        </span>
      </div>

      <div className="flex justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Invoice</p>
          <p className="mt-1 text-2xl font-bold" suppressHydrationWarning>
            {invoice.id}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="mt-1 font-display text-2xl font-bold" suppressHydrationWarning>
            {currency(invoice.amount)}
          </p>
        </div>
      </div>

      <div className="grid gap-8">
        <div>
          <h2 className="text-xs font-medium text-muted-foreground">Bill to</h2>
          <p className="mt-1 font-semibold">{invoice.client}</p>
          {client && (
            <>
              <p className="text-sm text-muted-foreground">{client.contact}</p>
              <p className="text-sm text-muted-foreground">{client.email}</p>
              <p className="text-sm text-muted-foreground">{client.location}</p>
            </>
          )}
        </div>

        <div>
          <h2 className="text-xs font-medium text-muted-foreground">Line items</h2>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <p className="flex-1">Description</p>
              <p className="w-16 text-center">Hours</p>
              <p className="w-20 text-right">Rate</p>
              <p className="w-20 text-right">Amount</p>
            </div>
            {invoice.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between border-b border-border/40 pb-2 text-sm"
              >
                <p className="flex-1">{item.label}</p>
                <p className="w-16 text-center tabular-nums">{item.hours}</p>
                <p className="w-20 text-right" suppressHydrationWarning>
                  {currency(item.rate)}/hr
                </p>
                <p className="w-20 text-right font-medium" suppressHydrationWarning>
                  {currency(item.hours * item.rate)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border/60 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span suppressHydrationWarning>{currency(invoice.amount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (0%)</span>
            <span>$0</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-border pt-2 text-lg font-bold">
            <span>Due</span>
            <span suppressHydrationWarning>{currency(invoice.amount)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Issued:</span> {invoice.issued}
        </div>
        <div>
          <span className="font-medium text-foreground">Due:</span> {invoice.due}
        </div>
      </div>

      <div className="flex gap-2 border-t border-border/60 pt-4">
        <button
          className={cn(
            "rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted",
            invoice.status === "Paid" && "cursor-not-allowed opacity-50",
          )}
        >
          {invoice.status === "Paid" ? "Paid" : "Send for payment"}
        </button>
        <button className="rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
          Download PDF
        </button>
      </div>
    </div>
  );
}
