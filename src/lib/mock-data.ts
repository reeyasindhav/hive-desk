export type Client = {
  id: string;
  name: string;
  contact: string;
  email: string;
  avatar: string;
  status: "Active" | "Retainer" | "Paused";
  since: string;
  rate: number;
  billed: number;
  outstanding: number;
  projects: string[];
  note: string;
  location: string;
};

export type Project = {
  id: string;
  name: string;
  client: string;
  progress: number;
  due: string;
  accent: "amber" | "sky" | "mint" | "rose";
};

export type Task = {
  id: string;
  title: string;
  client: string;
  status: "backlog" | "today" | "progress" | "review" | "done";
  hours: number;
  priority: "Low" | "Medium" | "High";
  due: string;
};

export type Invoice = {
  id: string;
  client: string;
  issued: string;
  due: string;
  amount: number;
  status: "Paid" | "Sent" | "Draft" | "Overdue";
  items: { label: string; hours: number; rate: number }[];
};

export type TimeEntry = {
  id: string;
  project: string;
  client: string;
  task: string;
  date: string;
  duration: number; // minutes
  billable: boolean;
};

export const clients: Client[] = [
  {
    id: "moss",
    name: "Moss & Co.",
    contact: "Priya Raman",
    email: "priya@mossand.co",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=60",
    status: "Retainer",
    since: "Mar 2024",
    rate: 95,
    billed: 42800,
    outstanding: 3200,
    projects: ["Moss & Co. campaign", "Quarterly brand audit"],
    note: "Prefers Monday check-ins. Invoices go to accounts@mossand.co.",
    location: "Lisbon, PT",
  },
  {
    id: "lumen",
    name: "Lumen Studio",
    contact: "Daniel Okafor",
    email: "dan@lumenstudio.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=60",
    status: "Active",
    since: "Jan 2025",
    rate: 110,
    billed: 18450,
    outstanding: 5400,
    projects: ["Lumen Studio website"],
    note: "Scope creep risk — log every change request in the tracker.",
    location: "Berlin, DE",
  },
  {
    id: "northstar",
    name: "Northstar Co.",
    contact: "Amelia Frost",
    email: "amelia@northstar.co",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
    status: "Active",
    since: "Aug 2025",
    rate: 120,
    billed: 9600,
    outstanding: 0,
    projects: ["Northstar brand refresh"],
    note: "Brand refresh ships before their Q1 investor update.",
    location: "Toronto, CA",
  },
  {
    id: "fieldnote",
    name: "Fieldnote",
    contact: "Ravi Menon",
    email: "ravi@fieldnote.app",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=60",
    status: "Paused",
    since: "Nov 2024",
    rate: 90,
    billed: 12200,
    outstanding: 0,
    projects: ["Fieldnote mobile app"],
    note: "Paused until their seed round closes. Revisit in six weeks.",
    location: "Bengaluru, IN",
  },
  {
    id: "forma",
    name: "Forma",
    contact: "Sofia Lindqvist",
    email: "sofia@forma.design",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=60",
    status: "Retainer",
    since: "Jun 2023",
    rate: 105,
    billed: 61300,
    outstanding: 2100,
    projects: ["Forma design system"],
    note: "Longest running retainer. Renews every January.",
    location: "Stockholm, SE",
  },
];

export const projects: Project[] = [
  { id: "p1", name: "Lumen Studio website", client: "Lumen Studio", progress: 72, due: "Due in 5 days", accent: "amber" },
  { id: "p2", name: "Northstar brand refresh", client: "Northstar Co.", progress: 38, due: "Due in 12 days", accent: "sky" },
  { id: "p3", name: "Moss & Co. campaign", client: "Moss & Co.", progress: 91, due: "Due tomorrow", accent: "mint" },
  { id: "p4", name: "Forma design system", client: "Forma", progress: 54, due: "Due in 3 weeks", accent: "rose" },
];

export const tasks: Task[] = [
  { id: "t1", title: "Audit legacy component library", client: "Forma", status: "backlog", hours: 6, priority: "Medium", due: "Sep 22" },
  { id: "t2", title: "Draft Q4 retainer proposal", client: "Moss & Co.", status: "backlog", hours: 2, priority: "Low", due: "Sep 25" },
  { id: "t3", title: "Homepage hero explorations", client: "Lumen Studio", status: "today", hours: 4, priority: "High", due: "Sep 9" },
  { id: "t4", title: "Log billable hours for August", client: "Moss & Co.", status: "today", hours: 1, priority: "Medium", due: "Sep 9" },
  { id: "t5", title: "Wordmark refinement pass", client: "Northstar Co.", status: "progress", hours: 5, priority: "High", due: "Sep 11" },
  { id: "t6", title: "Pricing page copy + layout", client: "Lumen Studio", status: "progress", hours: 3, priority: "Medium", due: "Sep 12" },
  { id: "t7", title: "Campaign motion boards", client: "Moss & Co.", status: "review", hours: 7, priority: "High", due: "Sep 10" },
  { id: "t8", title: "Type scale documentation", client: "Forma", status: "review", hours: 2, priority: "Low", due: "Sep 14" },
  { id: "t9", title: "Deliver August invoice pack", client: "All clients", status: "done", hours: 1, priority: "Medium", due: "Sep 2" },
  { id: "t10", title: "Kickoff workshop notes", client: "Northstar Co.", status: "done", hours: 3, priority: "Low", due: "Aug 28" },
];

export const columns = [
  { id: "backlog", label: "Backlog" },
  { id: "today", label: "Today" },
  { id: "progress", label: "In progress" },
  { id: "review", label: "Client review" },
  { id: "done", label: "Done" },
] as const;

export const invoices: Invoice[] = [
  {
    id: "HD-2026-041",
    client: "Lumen Studio",
    issued: "Sep 1, 2026",
    due: "Sep 15, 2026",
    amount: 5400,
    status: "Sent",
    items: [
      { label: "Website design — sprint 3", hours: 28, rate: 110 },
      { label: "Prototype review sessions", hours: 12, rate: 110 },
      { label: "Asset handoff", hours: 9, rate: 110 },
    ],
  },
  {
    id: "HD-2026-040",
    client: "Moss & Co.",
    issued: "Aug 28, 2026",
    due: "Sep 11, 2026",
    amount: 3200,
    status: "Overdue",
    items: [
      { label: "Campaign art direction", hours: 22, rate: 95 },
      { label: "Motion boards", hours: 12, rate: 95 },
    ],
  },
  {
    id: "HD-2026-039",
    client: "Forma",
    issued: "Aug 20, 2026",
    due: "Sep 3, 2026",
    amount: 2100,
    status: "Paid",
    items: [{ label: "Design system retainer — August", hours: 20, rate: 105 }],
  },
  {
    id: "HD-2026-038",
    client: "Northstar Co.",
    issued: "Aug 12, 2026",
    due: "Aug 26, 2026",
    amount: 4800,
    status: "Paid",
    items: [{ label: "Brand discovery + workshop", hours: 40, rate: 120 }],
  },
  {
    id: "HD-2026-042",
    client: "Fieldnote",
    issued: "—",
    due: "—",
    amount: 1800,
    status: "Draft",
    items: [{ label: "Mobile app audit", hours: 20, rate: 90 }],
  },
];

export const timeEntries: TimeEntry[] = [
  { id: "e1", project: "Lumen Studio website", client: "Lumen Studio", task: "Homepage hero explorations", date: "Today", duration: 144, billable: true },
  { id: "e2", project: "Moss & Co. campaign", client: "Moss & Co.", task: "Motion boards", date: "Today", duration: 95, billable: true },
  { id: "e3", project: "Forma design system", client: "Forma", task: "Type scale documentation", date: "Yesterday", duration: 210, billable: true },
  { id: "e4", project: "Northstar brand refresh", client: "Northstar Co.", task: "Wordmark refinement", date: "Yesterday", duration: 165, billable: true },
  { id: "e5", project: "Internal", client: "Hivedesk", task: "Admin + invoicing", date: "Mon", duration: 45, billable: false },
  { id: "e6", project: "Lumen Studio website", client: "Lumen Studio", task: "Pricing page copy", date: "Mon", duration: 120, billable: true },
];

export const weekHours = [
  { day: "Mon", hours: 5.4 },
  { day: "Tue", hours: 6.8 },
  { day: "Wed", hours: 4.2 },
  { day: "Thu", hours: 7.1 },
  { day: "Fri", hours: 3.6 },
  { day: "Sat", hours: 1.2 },
  { day: "Sun", hours: 0 },
];

export const revenueByMonth = [
  { month: "Apr", revenue: 7400 },
  { month: "May", revenue: 9100 },
  { month: "Jun", revenue: 8200 },
  { month: "Jul", revenue: 11300 },
  { month: "Aug", revenue: 12600 },
  { month: "Sep", revenue: 9800 },
];

export const accentVar: Record<Project["accent"], string> = {
  amber: "var(--amber-signal)",
  sky: "var(--sky-signal)",
  mint: "var(--mint-signal)",
  rose: "var(--rose-signal)",
};

export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const hhmm = (minutes: number) => `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, "0")}m`;
