import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start for free — Hivedesk" },
      {
        name: "description",
        content:
          "Start your free Hivedesk workspace. No credit card required. Built for freelancers who want to focus on the work.",
      },
      { property: "og:title", content: "Start for free — Hivedesk" },
      {
        property: "og:description",
        content: "No credit card required. Start building your rhythm today.",
      },
    ],
  }),
  component: Signup,
});

function Signup() {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
      signIn(email.trim(), name.trim() || undefined);
      navigate({ to: "/" });
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Get started"
        title="Build your rhythm. For free."
        lede="Start your workspace today. No credit card required, and you can upgrade as your practice grows."
      />

      <section className="mx-auto max-w-md px-5 py-16">
        <Reveal>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Full name
              </label>
              <input
                id="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-mint-signal"
                placeholder="Alex Moreno"
              />
            </div>
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
              Start for free
              <ArrowRight className="ml-2 inline-block size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </Reveal>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have a workspace?{" "}
          <Link to="/login" className="text-foreground hover:text-mint-signal">
            Sign in
          </Link>
        </p>
      </section>
    </MarketingLayout>
  );
}
