import { cn } from "@/lib/utils";

export function Logo({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "grid size-7 place-items-center rounded-full",
          invert ? "bg-cream text-ink" : "bg-ink text-ink-foreground",
        )}
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3.2 18.4 7v8L12 18.8 5.6 15V7L12 3.2Z" />
          <circle cx="12" cy="11" r="2.1" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className={cn("text-[17px] font-semibold tracking-tight", invert && "text-cream")}>hivedesk</span>
    </span>
  );
}
