import { createFileRoute, Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { hhmm } from "@/lib/mock-data";
import {
  clients,
  projects,
  tasks,
  timeEntries,
  type Project,
  type Task,
  type TimeEntry,
} from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard/projects/$projectId")({
  head: () => ({
    meta: [{ title: "Project — Hivedesk Dashboard" }],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { projectId } = Route.useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Project not found.</p>
        <Link to="/dashboard/projects" className="mt-4 text-sm text-mint-signal hover:underline">
          ← Back to projects
        </Link>
      </div>
    );
  }

  const accentMap = {
    amber: "bg-amber-signal",
    sky: "bg-sky-signal",
    mint: "bg-mint-signal",
    rose: "bg-rose-signal",
  };

  const projectTasks = tasks.filter((t) => t.client === project.client);
  const projectEntries = timeEntries.filter((e) => e.project === project.name);
  const totalMinutes = projectEntries.reduce((sum, e) => sum + e.duration, 0);
  const billableMinutes = projectEntries
    .filter((e) => e.billable)
    .reduce((sum, e) => sum + e.duration, 0);
  const remainingTasks = projectTasks.filter((t) => t.status !== "done");
  const remainingHours = remainingTasks.reduce((sum, t) => sum + t.hours, 0);
  const client = clients.find((c) => c.name === project.client);

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between">
        <div>
          <Link
            to="/dashboard/projects"
            className="text-xs text-muted-foreground hover:text-mint-signal"
          >
            ← Projects
          </Link>
          <h1 className="mt-2 text-3xl font-bold">{project.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
        </div>
        <span className={cn("size-3 rounded-full", accentMap[project.accent])} />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Progress" value={`${project.progress}%`} />
        <Stat label="Total time" value={hhmm(totalMinutes)} />
        <Stat label="Billable" value={hhmm(billableMinutes)} />
        <Stat label="Deadline" value={project.due} />
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground">Progress</h2>
        <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={cn("h-full rounded-full", accentMap[project.accent])}
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xs text-muted-foreground">Work done</p>
            <p className="mt-1 font-display text-lg font-bold tabular-nums">{hhmm(totalMinutes)}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Work remaining</p>
            <p className="mt-1 font-display text-lg font-bold tabular-nums">
              {hhmm(remainingHours * 60)}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,0.4fr)]">
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Tasks</h2>
          <div className="mt-3 space-y-2">
            {projectTasks.map((t) => (
              <TaskRow key={t.id} task={t} accent={project.accent} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Time entries</h2>
          <div className="mt-3 space-y-2">
            {projectEntries.length > 0 ? (
              projectEntries.map((e) => <TimeEntryRow key={e.id} entry={e} />)
            ) : (
              <p className="text-sm text-muted-foreground">No time entries recorded.</p>
            )}
            {projectEntries.length > 0 && (
              <div className="border-t border-border/60 pt-3">
                <div className="flex justify-between text-sm font-semibold">
                  <span>Total</span>
                  <span suppressHydrationWarning>{hhmm(totalMinutes)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {client && client.note && (
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Client notes</h2>
          <p className="mt-2 rounded-xl border border-border bg-card p-4 text-sm transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
            {client.note}
          </p>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-xl font-bold tabular-nums" suppressHydrationWarning>
        {value}
      </p>
    </div>
  );
}

function TaskRow({ task, accent }: { task: Task; accent: "amber" | "sky" | "mint" | "rose" }) {
  const statusColors = {
    backlog: "bg-muted",
    today: "bg-sky-signal",
    progress: "bg-amber-signal",
    review: "bg-rose-signal",
    done: "bg-mint-signal",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">{task.title}</p>
        <span className="text-xs text-muted-foreground">{hhmm(task.hours * 60)}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className={cn("h-2 w-2 rounded-full", statusColors[task.status])} />
        <span className="text-xs text-muted-foreground capitalize">{task.status}</span>
        <span
          className={cn(
            "text-xs font-medium",
            task.priority === "High" && "text-rose-signal",
            task.priority === "Medium" && "text-amber-signal",
            task.priority === "Low" && "text-muted-foreground",
          )}
        >
          {task.priority}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Due {task.due}</p>
    </div>
  );
}

function TimeEntryRow({ entry }: { entry: TimeEntry }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <div>
        <p className="font-medium">{entry.task}</p>
        <p className="text-xs text-muted-foreground">
          {entry.date} {entry.billable ? "· Billable" : "· Non-billable"}
        </p>
      </div>
      <span className="tabular-nums" suppressHydrationWarning>
        {hhmm(entry.duration)}
      </span>
    </div>
  );
}
