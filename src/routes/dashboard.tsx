import { Outlet, createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [{ title: "Dashboard — Hivedesk" }],
  }),
  component: DashboardLayout,
});

function DashboardLayout() {
  const { user, signOut, ready } = useAuth();
  const navigate = useNavigate();
  const { location } = useRouterState();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard" || location.pathname === "/dashboard/";
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { to: "/dashboard", label: "Overview" },
    { to: "/dashboard/projects", label: "Projects" },
    { to: "/dashboard/time", label: "Time" },
    { to: "/dashboard/invoices", label: "Invoices" },
    { to: "/dashboard/clients", label: "Clients" },
    { to: "/dashboard/expenses", label: "Expenses" },
    { to: "/dashboard/reports", label: "Reports" },
    { to: "/dashboard/settings", label: "Settings" },
  ];

  useEffect(() => {
    if (ready && !user) {
      navigate({ to: "/login" });
    }
  }, [ready, user, navigate]);

  if (!ready || !user) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60 bg-card px-5 py-3">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between">
          <Link to="/" className="transition-opacity hover:opacity-70">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "relative text-sm font-medium transition-colors",
                  isActive(link.to)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {isActive(link.to) && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-mint-signal" />
                )}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm md:inline-block" suppressHydrationWarning>
              {user.name}
            </span>
            <button
              onClick={signOut}
              className="rounded-lg border border-border bg-card p-2 text-sm text-foreground hover:bg-muted"
              aria-label="Sign out"
              suppressHydrationWarning
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10">
        <Outlet />
      </main>
    </div>
  );
}
