import { createFileRoute } from "@tanstack/react-router";
import { MarketingLayout, PageHero } from "@/components/marketing-layout";
import { Reveal } from "@/components/reveal";

const posts = [
  {
    title: "How to price freelance work without undercutting yourself",
    date: "Sep 2, 2026",
    readTime: "5 min read",
    excerpt:
      "Most freelancers price based on hours instead of value. Here's a simple framework to shift that mindset and raise your rates.",
  },
  {
    title: "A calmer way to run a solo studio",
    date: "Aug 19, 2026",
    readTime: "4 min read",
    excerpt:
      "Tools that promise more features often deliver more noise. We explore what happens when you optimize for focus instead.",
  },
  {
    title: "Time tracking is not about guilt",
    date: "Aug 4, 2026",
    readTime: "6 min read",
    excerpt:
      "If you think time tracking is about watching every minute, you're using it wrong. Here's how to use it as a feedback signal instead.",
  },
] as const;

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Hivedesk" },
      {
        name: "description",
        content:
          "Guides and essays on freelance work, time tracking, pricing, and running a calmer studio.",
      },
      { property: "og:title", content: "Blog — Hivedesk" },
      {
        property: "og:description",
        content:
          "Guides and essays on freelance work, time tracking, pricing, and running a calmer studio.",
      },
    ],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <MarketingLayout>
      <PageHero
        eyebrow="Blog"
        title="Guides for independent work."
        lede="Essays on pricing, focus, time tracking, and running a calmer studio."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <Reveal>
          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.title}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </section>
    </MarketingLayout>
  );
}
