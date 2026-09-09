import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="border-b border-border/60 px-5 py-20 text-center">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow animate-fade">{eyebrow}</p>
        <h1 className="animate-rise mt-4 text-5xl leading-[1.05] font-bold md:text-6xl">{title}</h1>
        <p className="animate-rise mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground [animation-delay:120ms]">
          {lede}
        </p>
      </div>
    </section>
  );
}
