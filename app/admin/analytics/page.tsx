import type { Metadata } from "next";
import Link from "next/link";

import {
  ADMIN_ANALYTICS_DATE_RANGES,
  getAdminAnalyticsDashboard,
  parseAdminAnalyticsFilters,
  type AdminAnalyticsDateRange,
  type AdminAnalyticsEvent,
  type AnalyticsCount,
} from "@/lib/admin-analytics";

export const metadata: Metadata = {
  title: "Admin Analytics | Juan Tzun Portfolio",
  description: "Private analytics dashboard for Juan Tzun Portfolio interactions.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

type AdminAnalyticsPageProps = {
  searchParams?: SearchParams;
};

type MetricCardProps = {
  label: string;
  value: string | number;
  description: string;
};

const DATE_RANGE_LABELS: Record<AdminAnalyticsDateRange, string> = {
  all: "All time",
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
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
          {items.slice(0, 10).map((item) => (
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

function SelectField({
  label,
  name,
  defaultValue,
  options,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: string[];
  placeholder: string;
}) {
  return (
    <label className="space-y-2 text-sm font-medium text-slate-300">
      <span>{label}</span>
      <select
        name={name}
        defaultValue={defaultValue ?? "all"}
        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/15"
      >
        <option value="all">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function AnalyticsFilters({
  filters,
  eventNames,
  locales,
  targets,
  activeFilterCount,
}: {
  filters: {
    dateRange: AdminAnalyticsDateRange;
    eventName?: string;
    locale?: string;
    target?: string;
    search?: string;
  };
  eventNames: string[];
  locales: string[];
  targets: string[];
  activeFilterCount: number;
}) {
  return (
    <section className="mt-10 rounded-3xl border border-slate-800/70 bg-slate-950/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Filters</h2>
          <p className="mt-1 text-sm text-slate-400">Narrow metrics and the latest-events table without exposing raw keys.</p>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-200/70">
          {activeFilterCount === 0 ? "No active filters" : `${activeFilterCount} active`}
        </p>
      </div>

      <form className="mt-5 grid gap-4 lg:grid-cols-5" method="get">
        <label className="space-y-2 text-sm font-medium text-slate-300">
          <span>Date range</span>
          <select
            name="range"
            defaultValue={filters.dateRange}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/15"
          >
            {ADMIN_ANALYTICS_DATE_RANGES.map((range) => (
              <option key={range} value={range}>
                {DATE_RANGE_LABELS[range]}
              </option>
            ))}
          </select>
        </label>

        <SelectField
          label="Event type"
          name="eventName"
          defaultValue={filters.eventName}
          options={eventNames}
          placeholder="All events"
        />

        <SelectField label="Locale" name="locale" defaultValue={filters.locale} options={locales} placeholder="All locales" />

        <SelectField label="Target" name="target" defaultValue={filters.target} options={targets} placeholder="All targets" />

        <label className="space-y-2 text-sm font-medium text-slate-300">
          <span>Search</span>
          <input
            name="search"
            type="search"
            defaultValue={filters.search ?? ""}
            placeholder="Project, path, metadata..."
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300/70 focus:ring-2 focus:ring-cyan-300/15"
          />
        </label>

        <div className="flex flex-col gap-3 lg:col-span-5 sm:flex-row sm:items-center sm:justify-end">
          <Link
            className="rounded-2xl border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
            href="/admin/analytics"
          >
            Clear filters
          </Link>
          <button
            className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:bg-cyan-200"
            type="submit"
          >
            Apply filters
          </button>
        </div>
      </form>
    </section>
  );
}

function RecentEventsTable({ events }: { events: AdminAnalyticsEvent[] }) {
  return (
    <section className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-5 shadow-2xl shadow-slate-950/30 backdrop-blur">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Latest events</h2>
          <p className="mt-1 text-sm text-slate-400">Most recent persisted portfolio interactions matching the filters.</p>
        </div>
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-cyan-200/70">Last 50</p>
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
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.id} className="bg-slate-900/80 text-slate-200">
                  <td className="rounded-l-2xl px-4 py-3 font-medium">{event.event_name}</td>
                  <td className="px-4 py-3 text-slate-300">{event.target ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-300">{event.locale ?? "—"}</td>
                  <td className="max-w-[16rem] truncate px-4 py-3 text-slate-300">{event.path ?? "—"}</td>
                  <td className="rounded-r-2xl px-4 py-3 text-slate-400">{formatDate(event.created_at)}</td>
                </tr>
              ))
            ) : (
              <tr className="bg-slate-900/80 text-slate-300">
                <td className="rounded-2xl px-4 py-5 text-center" colSpan={5}>
                  No events match the current filters.
                </td>
              </tr>
            )}
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

export default async function AdminAnalyticsPage({ searchParams }: AdminAnalyticsPageProps) {
  const filters = parseAdminAnalyticsFilters(await searchParams);
  const result = await getAdminAnalyticsDashboard(filters);

  if (!result.ok) {
    return <ConfigurationMessage reason={result.reason} />;
  }

  const { dashboard } = result;

  return (
    <main className="relative z-10 min-h-screen px-6 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl rounded-3xl border border-slate-800/80 bg-slate-950/88 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-100">Portfolio Admin</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Analytics Dashboard</h1>
          <p className="mt-5 text-lg leading-8 text-slate-200">
            Production custom-event metrics persisted in Supabase for portfolio project clicks, CV downloads,
            external profile clicks and locale usage.
          </p>
          <p className="mt-4 inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
            Latest matching event: {formatDate(dashboard.latestEventAt)} · Loaded sample: {formatNumber(dashboard.totalLoadedEvents)} events
          </p>
        </div>

        <AnalyticsFilters
          filters={dashboard.filters}
          eventNames={dashboard.filterOptions.eventNames}
          locales={dashboard.filterOptions.locales}
          targets={dashboard.filterOptions.targets}
          activeFilterCount={dashboard.activeFilterCount}
        />

        <section className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Matching events"
            value={formatNumber(dashboard.totalEvents)}
            description="Persisted events matching the current filters."
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
            description="Most clicked project target in the filtered sample."
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
