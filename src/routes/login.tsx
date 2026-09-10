import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Hivedesk" },
      {
        name: "description",
        content:
          "Sign in to your Hivedesk workspace to access projects, time tracking, clients and invoices.",
      },
      { property: "og:title", content: "Sign in — Hivedesk" },
      { property: "og:description", content: "Access your freelance workspace in seconds." },
    ],
  }),
  component: Login,
});

function Login() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  if (user) {
    navigate({ to: "/" });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      signIn(email.trim());
      navigate({ to: "/" });
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Welcome back"
        title="Sign in to your workspace."
        lede="Enter your email to access your projects, time tracking, clients and invoices."
      />

      <section className="mx-auto max-w-md px-5 py-16">
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-mint-signal"
                placeholder="you@studio.com"
              />
            </div>
            {error && <p className="text-sm text-rose-signal">{error}</p>}
            <button
              type="submit"
              className="group w-full rounded-xl bg-ink px-5 py-3 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
            >
              Sign in
              <ArrowRight className="ml-2 inline-block size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </Reveal>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          New to Hivedesk?{" "}
          <Link to="/signup" className="text-foreground hover:text-mint-signal">
            Start for free
          </Link>
        </p>
      </section>
    </MarketingLayout>
  );
}
