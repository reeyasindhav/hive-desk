import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-5 py-8 text-sm text-muted-foreground md:flex-row md:justify-between">
        <Link to="/">
          <Logo />
        </Link>
        <p>© 2026 Hivedesk. Made for independent work.</p>
        <div className="flex gap-5">
          <Link to="/pricing" className="transition-colors hover:text-foreground">
            Pricing
          </Link>
          <Link to="/why" className="transition-colors hover:text-foreground">
            Why Hivedesk
          </Link>
          <Link to="/login" className="transition-colors hover:text-foreground">
            Sign in
          </Link>
        </div>
      </div>
    </footer>
  );
}
