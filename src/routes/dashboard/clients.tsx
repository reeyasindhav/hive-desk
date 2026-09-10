import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { currency } from "@/lib/mock-data";
import { clients, type Client } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/clients")({
  head: () => ({
    meta: [{ title: "Clients — Hivedesk Dashboard" }],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  const { location } = useRouterState();
  const isDetailPage = location.pathname.startsWith("/dashboard/clients/");

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Clients</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {clients.length} clients ·{" "}
          {clients.filter((c) => c.status === "Active" || c.status === "Retainer").length} active
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((c) => (
          <ClientCard key={c.id} client={c} />
        ))}
      </div>
    </div>
  );
}

function ClientCard({ client }: { client: Client }) {
  const statusColors = {
    Active: "bg-mint-signal",
    Retainer: "bg-sky-signal",
    Paused: "bg-muted-foreground",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={client.avatar}
            alt={client.contact}
            className="size-10 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-semibold">{client.name}</p>
            <p className="text-xs text-muted-foreground">{client.contact}</p>
          </div>
        </div>
        <span className={cn("size-2 rounded-full", statusColors[client.status])} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-center">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Rate</p>
          <p className="mt-1 font-display text-lg font-bold" suppressHydrationWarning>
            ${client.rate}/hr
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Outstanding</p>
          <p className="mt-1 font-display text-lg font-bold" suppressHydrationWarning>
            {currency(client.outstanding)}
          </p>
        </div>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">{client.note}</p>

      <Link
        to="/dashboard/clients/$clientId"
        params={{ clientId: client.id }}
        className="mt-3 block text-xs font-medium text-mint-signal hover:underline"
      >
        Open client →
      </Link>
    </div>
  );
}
