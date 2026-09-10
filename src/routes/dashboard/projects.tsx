import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/projects")({
  head: () => ({
    meta: [{ title: "Projects — Hivedesk Dashboard" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { location } = useRouterState();
  const isDetailPage =
    location.pathname.startsWith("/dashboard/projects/") &&
    location.pathname !== "/dashboard/projects/";

  if (isDetailPage) {
    return <Outlet />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {projects.length} active projects across {new Set(projects.map((p) => p.client)).size}{" "}
          clients
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const accentMap = {
    amber: "bg-amber-signal",
    sky: "bg-sky-signal",
    mint: "bg-mint-signal",
    rose: "bg-rose-signal",
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{project.name}</p>
        <span className="text-xs text-muted-foreground">{project.progress}%</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{project.client}</p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full", accentMap[project.accent])}
          style={{ width: `${project.progress}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{project.due}</p>
      <Link
        to="/dashboard/projects/$projectId"
        params={{ projectId: project.id }}
        className="mt-3 block text-xs font-medium text-mint-signal hover:underline"
      >
        Open project
      </Link>
    </div>
  );
}
