import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { useAuth } from "@/lib/auth";

const nav = [
  { to: "/why", label: "Why Hivedesk" },
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
        <Link to="/" className="transition-opacity hover:opacity-70">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-sm text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-foreground after:transition-all after:duration-300 hover:after:w-full"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <Link
              to="/dashboard"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
            >
              Open dashboard
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
              >
                Start for free
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="animate-rise border-t border-border/60 bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-sm">
                {item.label}
              </Link>
            ))}
            <Link to={user ? "/dashboard" : "/login"} onClick={() => setOpen(false)} className="text-sm">
              {user ? "Open dashboard" : "Sign in"}
            </Link>
            <Link
              to={user ? "/dashboard" : "/signup"}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-ink px-4 py-2 text-center text-sm font-medium text-ink-foreground"
            >
              Start for free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
