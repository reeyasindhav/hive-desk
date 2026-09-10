import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/settings")({
  head: () => ({
    meta: [{ title: "Settings — Hivedesk Dashboard" }],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"profile" | "billing" | "preferences">("profile");

  if (!user) return null;

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your account and preferences.</p>
      </div>

      <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-card p-1.5">
        <Tab
          value="profile"
          label="Profile"
          isActive={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        />
        <Tab
          value="billing"
          label="Billing"
          isActive={activeTab === "billing"}
          onClick={() => setActiveTab("billing")}
        />
        <Tab
          value="preferences"
          label="Preferences"
          isActive={activeTab === "preferences"}
          onClick={() => setActiveTab("preferences")}
        />
      </div>

      {activeTab === "profile" && <ProfileTab user={user} />}
      {activeTab === "billing" && <BillingTab />}
      {activeTab === "preferences" && <PreferencesTab />}
    </div>
  );
}

function Tab({
  value,
  label,
  isActive,
  onClick,
}: {
  value: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex-1 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap",
        isActive ? "bg-ink text-ink-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function ProfileTab({ user }: { user: { name: string; email: string; role: string } }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" defaultValue={user.name} />
        <Field label="Email" defaultValue={user.email} />
        <Field label="Role" defaultValue={user.role} />
        <Field label="Hourly rate" defaultValue="$95/hr" />
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground">Bio</label>
        <textarea
          defaultValue="Independent designer focused on brand identity and digital experiences."
          className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
          rows={4}
        />
      </div>
      <button className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-ink-foreground">
        Save changes
      </button>
    </div>
  );
}

function BillingTab() {
  return (
    <div className="space-y-4">
      <Field label="Business name" placeholder="Your business name" />
      <Field label="Business address" placeholder="123 Studio St, Portland, OR" />
      <Field label="Payment method" placeholder="Visa ending in 4242" />
      <Field label="Tax ID" placeholder="12-3456789" />
      <button className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-ink-foreground">
        Save billing info
      </button>
    </div>
  );
}

function PreferencesTab() {
  return (
    <div className="space-y-4">
      <Toggle label="Email notifications" defaultChecked />
      <Toggle label="Desktop notifications" defaultChecked />
      <Toggle label="Time tracking reminders" />
      <Toggle label="Dark mode" />
      <Toggle label="Weekly report emails" defaultChecked />
    </div>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 block w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-mint-signal"
      />
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:bg-muted/50 hover:shadow-sm">
      <span className="text-sm font-medium">{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="size-4 cursor-pointer" />
    </label>
  );
}
