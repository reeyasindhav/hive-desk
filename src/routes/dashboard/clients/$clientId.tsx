import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import {
  clients,
  currency,
  hhmm,
  invoices,
  projects,
  timeEntries,
  tasks,
  type Client,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/clients/$clientId")({
  head: () => ({
    meta: [{ title: "Client — Hivedesk Dashboard" }],
  }),
  component: ClientDetailPage,
});

function ClientDetailPage() {
  const { clientId } = Route.useParams();
  const client = clients.find((c) => c.id === clientId);

  if (!client) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Client not found.</p>
        <Link to="/dashboard/clients" className="mt-4 text-sm text-mint-signal hover:underline">
          ← Back to clients
        </Link>
      </div>
    );
  }

  const clientInvoices = invoices.filter((inv) => inv.client === client.name);
  const clientTimeEntries = timeEntries.filter((e) => e.client === client.name);
  const clientTasks = tasks.filter((t) => t.client === client.name);
  const totalBillable = clientTimeEntries
    .filter((e) => e.billable)
    .reduce((sum, e) => sum + e.duration, 0);
  const totalOutstanding = clientInvoices
    .filter((inv) => inv.status !== "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/clients"
            className="text-xs text-muted-foreground hover:text-mint-signal"
          >
            ← Clients
          </Link>
          <img
            src={client.avatar}
            alt={client.contact}
            className="size-14 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <h1 className="text-2xl font-bold">{client.name}</h1>
            <p className="text-sm text-muted-foreground">{client.contact}</p>
          </div>
        </div>
        <span
          className={cn("size-3 rounded-full", {
            "bg-mint-signal": client.status === "Active",
            "bg-sky-signal": client.status === "Retainer",
            "bg-muted-foreground": client.status === "Paused",
          })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Rate" value={`$${client.rate}/hr`} />
        <Stat label="Active projects" value={client.projects.length.toString()} />
        <Stat label="Outstanding" value={currency(totalOutstanding)} />
        <Stat label="Billable time" value={hhmm(totalBillable)} />
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground">About</h2>
        <p className="mt-2 text-sm text-muted-foreground">{client.note}</p>
        <div className="mt-3 grid grid-cols-2 gap-4 text-xs text-muted-foreground sm:grid-cols-4">
          <div>
            <span className="font-medium text-foreground">Status:</span> {client.status}
          </div>
          <div>
            <span className="font-medium text-foreground">Since:</span> {client.since}
          </div>
          <div>
            <span className="font-medium text-foreground">Billed</span>
            <span className="text-foreground" suppressHydrationWarning>
              : {currency(client.billed)}
            </span>
          </div>
          <div>
            <span className="font-medium text-foreground">Location:</span> {client.location}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground">Projects</h2>
        <div className="mt-3 space-y-2">
          {projects
            .filter((p) => p.client === client.name)
            .map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.due}</p>
                </div>
                <span className="text-xs text-muted-foreground">{p.progress}%</span>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground">Invoices</h2>
        <div className="mt-3 space-y-2">
          {clientInvoices.length > 0 ? (
            clientInvoices.map((inv) => (
              <Link
                key={inv.id}
                to="/dashboard/invoices/$invoiceId"
                params={{ invoiceId: inv.id }}
                className="flex items-center justify-between rounded-lg border border-border bg-card p-3 text-sm no-underline transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
              >
                <span className="font-semibold">{inv.id}</span>
                <span className="text-muted-foreground">{inv.client}</span>
                <span className="tabular-nums" suppressHydrationWarning>
                  {currency(inv.amount)}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No invoices for this client yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold" suppressHydrationWarning>
        {value}
      </p>
    </div>
  );
}
