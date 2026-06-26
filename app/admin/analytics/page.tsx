import type { Metadata } from "next";

import { getAdminAnalyticsDashboard, type AnalyticsCount, type AdminAnalyticsEvent } from "@/lib/admin-analytics";

export const metadata: Metadata = {
  title: "Admin Analytics | Juan Tzun Portfolio",
  description: "Private analytics dashboard for Juan Tzun Portfolio interactions.",
};

export const dynamic = "force-dynamic";

type MetricCardProps = {
  label: string;
  value: string | number;
  description: string;
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatDate(value: string | null) {
  if (!value) {
    return "No events yet";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <p className="text-sm font-medium text-cyan-200/80">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
    </div>
  );
}

function CountList({ title, items, emptyText }: { title: string; items: AnalyticsCount[]; emptyText: string }) {
  return (
    <section className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {items.length > 0 ? (
        <div className="mt-5 space-y-3">
          {items.slice(0, 8).map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-900/80 px-4 py-3">
              <span className="truncate text-sm font-medium text-slate-200">{item.label}</span>
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                {formatNumber(item.count)}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-5 text-sm text-slate-400">{emptyText}</p>
      )}
    </section>
  );
}

function RecentEventsTable({ events }: { events: AdminAnalyticsEvent[] }) {
  return (
    <section className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Latest events</h2>
          <p className="mt-1 text-sm text-slate-400">Most recent persisted portfolio interactions.</p>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-200/70">Last 25</p>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2 text-left text-sm">
          <thead className="text-xs uppercase tracking-[0.18em] text-slate-500">
            <tr>
              <th className="px-4 py-2 font-semibold">Event</th>
              <th className="px-4 py-2 font-semibold">Target</th>
              <th className="px-4 py-2 font-semibold">Locale</th>
              <th className="px-4 py-2 font-semibold">Path</th>
              <th className="px-4 py-2 font-semibold">Created</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="bg-slate-900/80 text-slate-200">
                <td className="rounded-l-2xl px-4 py-3 font-medium">{event.event_name}</td>
                <td className="px-4 py-3 text-slate-300">{event.target ?? "—"}</td>
                <td className="px-4 py-3 text-slate-300">{event.locale ?? "—"}</td>
                <td className="max-w-[16rem] truncate px-4 py-3 text-slate-300">{event.path ?? "—"}</td>
                <td className="rounded-r-2xl px-4 py-3 text-slate-400">{formatDate(event.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ConfigurationMessage({ reason }: { reason: string }) {
  return (
    <main className="relative z-10 min-h-screen px-6 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-4xl rounded-3xl border border-amber-300/30 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">Admin Analytics</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">Dashboard not ready</h1>
        <p className="mt-4 leading-7 text-slate-300">
          The admin dashboard route is available, but it could not read analytics data yet.
        </p>
        <p className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 font-mono text-sm text-amber-100">Reason: {reason}</p>
        <p className="mt-5 leading-7 text-slate-400">
          Check `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANALYTICS_TABLE`, and the optional
          basic-auth environment variables before enabling this route in production.
        </p>
      </div>
    </main>
  );
}

export default async function AdminAnalyticsPage() {
  const result = await getAdminAnalyticsDashboard();

  if (!result.ok) {
    return <ConfigurationMessage reason={result.reason} />;
  }

  const { dashboard } = result;

  return (
    <main className="relative z-10 min-h-screen px-6 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">Portfolio Admin</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Analytics Dashboard</h1>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            Production custom-event metrics persisted in Supabase for portfolio project clicks, CV downloads,
            external profile clicks and locale usage.
          </p>
          <p className="mt-3 text-sm text-slate-500">Latest event: {formatDate(dashboard.latestEventAt)}</p>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total events"
            value={formatNumber(dashboard.totalEvents)}
            description="Recent persisted events loaded from Supabase."
          />
          <MetricCard
            label="Project clicks"
            value={formatNumber(dashboard.projectClicks)}
            description="Live Demo and project GitHub interactions."
          />
          <MetricCard
            label="CV downloads"
            value={formatNumber(dashboard.cvDownloads)}
            description="Clicks on the portfolio CV download/open links."
          />
          <MetricCard
            label="Top target"
            value={dashboard.topTarget ?? "—"}
            description="Most clicked project target in the current sample."
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <CountList title="Events by type" items={dashboard.eventCounts} emptyText="No event type data yet." />
          <CountList title="Events by locale" items={dashboard.localeCounts} emptyText="No locale data yet." />
          <CountList title="Top project targets" items={dashboard.targetCounts} emptyText="No project click data yet." />
        </section>

        <div className="mt-6">
          <RecentEventsTable events={dashboard.recentEvents} />
        </div>
      </div>
    </main>
  );
}
