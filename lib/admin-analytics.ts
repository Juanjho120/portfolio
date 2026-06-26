export type AdminAnalyticsEvent = {
  id: string;
  event_name: string;
  locale: string | null;
  target: string | null;
  path: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export type AnalyticsCount = {
  label: string;
  count: number;
};

export const ADMIN_ANALYTICS_DATE_RANGES = ["all", "7d", "30d", "90d"] as const;

export type AdminAnalyticsDateRange = (typeof ADMIN_ANALYTICS_DATE_RANGES)[number];

export type AdminAnalyticsFilters = {
  dateRange: AdminAnalyticsDateRange;
  eventName?: string;
  locale?: string;
  target?: string;
  search?: string;
};

export type AdminAnalyticsFilterOptions = {
  eventNames: string[];
  locales: string[];
  targets: string[];
};

export type AdminAnalyticsDashboard = {
  totalEvents: number;
  totalLoadedEvents: number;
  projectClicks: number;
  cvDownloads: number;
  externalClicks: number;
  topTarget: string | null;
  latestEventAt: string | null;
  filters: AdminAnalyticsFilters;
  activeFilterCount: number;
  filterOptions: AdminAnalyticsFilterOptions;
  eventCounts: AnalyticsCount[];
  localeCounts: AnalyticsCount[];
  targetCounts: AnalyticsCount[];
  recentEvents: AdminAnalyticsEvent[];
};

type AdminAnalyticsResult =
  | { ok: true; dashboard: AdminAnalyticsDashboard }
  | { ok: false; reason: "missing_config" | "invalid_table" | "request_failed"; status?: number; error?: string };

type SearchParamsRecord = Record<string, string | string[] | undefined>;

const DEFAULT_ANALYTICS_TABLE = "portfolio_analytics_events";
const TABLE_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/;
const DEFAULT_EVENT_LIMIT = 2000;
const RECENT_EVENTS_LIMIT = 50;

function getSupabaseAdminAnalyticsConfig() {
  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const tableName = process.env.SUPABASE_ANALYTICS_TABLE ?? DEFAULT_ANALYTICS_TABLE;

  if (!supabaseUrl || !serviceRoleKey) {
    return { configured: false as const };
  }

  if (!TABLE_NAME_PATTERN.test(tableName)) {
    return { configured: true as const, valid: false as const };
  }

  return {
    configured: true as const,
    valid: true as const,
    supabaseUrl,
    serviceRoleKey,
    tableName,
  };
}

function getFirstParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function cleanFilterValue(value: string | string[] | undefined) {
  const rawValue = getFirstParam(value)?.trim();

  if (!rawValue || rawValue === "all") {
    return undefined;
  }

  return rawValue;
}

function parseDateRange(value: string | string[] | undefined): AdminAnalyticsDateRange {
  const rawValue = getFirstParam(value);

  if (ADMIN_ANALYTICS_DATE_RANGES.includes(rawValue as AdminAnalyticsDateRange)) {
    return rawValue as AdminAnalyticsDateRange;
  }

  return "all";
}

export function parseAdminAnalyticsFilters(searchParams?: SearchParamsRecord): AdminAnalyticsFilters {
  return {
    dateRange: parseDateRange(searchParams?.range),
    eventName: cleanFilterValue(searchParams?.eventName),
    locale: cleanFilterValue(searchParams?.locale),
    target: cleanFilterValue(searchParams?.target),
    search: cleanFilterValue(searchParams?.search),
  };
}

function sortCounts(counts: Map<string, number>) {
  return Array.from(counts.entries())
    .map(([label, count]) => ({ label, count }))
    .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));
}

function countBy(events: AdminAnalyticsEvent[], getLabel: (event: AdminAnalyticsEvent) => string | null) {
  const counts = new Map<string, number>();

  for (const event of events) {
    const label = getLabel(event) ?? "Unknown";
    counts.set(label, (counts.get(label) ?? 0) + 1);
  }

  return sortCounts(counts);
}

function uniqueSortedValues(events: AdminAnalyticsEvent[], getLabel: (event: AdminAnalyticsEvent) => string | null) {
  return Array.from(new Set(events.map(getLabel).filter((value): value is string => Boolean(value)))).sort((left, right) =>
    left.localeCompare(right),
  );
}

function getRangeStartDate(dateRange: AdminAnalyticsDateRange) {
  if (dateRange === "all") {
    return null;
  }

  const daysByRange: Record<Exclude<AdminAnalyticsDateRange, "all">, number> = {
    "7d": 7,
    "30d": 30,
    "90d": 90,
  };

  const date = new Date();
  date.setDate(date.getDate() - daysByRange[dateRange]);

  return date;
}

function matchesSearch(event: AdminAnalyticsEvent, search: string) {
  const normalizedSearch = search.toLowerCase();
  const metadataText = event.metadata ? JSON.stringify(event.metadata) : "";
  const searchableText = [event.event_name, event.target, event.locale, event.path, metadataText]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return searchableText.includes(normalizedSearch);
}

function eventMatchesFilters(event: AdminAnalyticsEvent, filters: AdminAnalyticsFilters) {
  const rangeStartDate = getRangeStartDate(filters.dateRange);

  if (rangeStartDate && new Date(event.created_at) < rangeStartDate) {
    return false;
  }

  if (filters.eventName && event.event_name !== filters.eventName) {
    return false;
  }

  if (filters.locale && event.locale !== filters.locale) {
    return false;
  }

  if (filters.target && event.target !== filters.target) {
    return false;
  }

  if (filters.search && !matchesSearch(event, filters.search)) {
    return false;
  }

  return true;
}

function countActiveFilters(filters: AdminAnalyticsFilters) {
  return [filters.dateRange !== "all", filters.eventName, filters.locale, filters.target, filters.search].filter(Boolean).length;
}

function createDashboard(events: AdminAnalyticsEvent[], filters: AdminAnalyticsFilters): AdminAnalyticsDashboard {
  const filteredEvents = events.filter((event) => eventMatchesFilters(event, filters));
  const projectEvents = filteredEvents.filter(
    (event) => event.event_name === "Project Demo Click" || event.event_name === "Project GitHub Click",
  );

  const targetCounts = countBy(projectEvents, (event) => event.target);

  return {
    totalEvents: filteredEvents.length,
    totalLoadedEvents: events.length,
    projectClicks: projectEvents.length,
    cvDownloads: filteredEvents.filter((event) => event.event_name === "CV Download Click").length,
    externalClicks: filteredEvents.filter(
      (event) => event.event_name === "External Contact Click" || event.event_name === "External Profile Click",
    ).length,
    topTarget: targetCounts[0]?.label ?? null,
    latestEventAt: filteredEvents[0]?.created_at ?? null,
    filters,
    activeFilterCount: countActiveFilters(filters),
    filterOptions: {
      eventNames: uniqueSortedValues(events, (event) => event.event_name),
      locales: uniqueSortedValues(events, (event) => event.locale),
      targets: uniqueSortedValues(events, (event) => event.target),
    },
    eventCounts: countBy(filteredEvents, (event) => event.event_name),
    localeCounts: countBy(filteredEvents, (event) => event.locale),
    targetCounts,
    recentEvents: filteredEvents.slice(0, RECENT_EVENTS_LIMIT),
  };
}

export async function getAdminAnalyticsDashboard(filters: AdminAnalyticsFilters): Promise<AdminAnalyticsResult> {
  const config = getSupabaseAdminAnalyticsConfig();

  if (!config.configured) {
    return { ok: false, reason: "missing_config" };
  }

  if (!config.valid) {
    return { ok: false, reason: "invalid_table" };
  }

  const query = new URLSearchParams({
    select: "id,event_name,locale,target,path,metadata,created_at",
    order: "created_at.desc",
    limit: String(DEFAULT_EVENT_LIMIT),
  });

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/${config.tableName}?${query.toString()}`, {
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.text().catch(() => undefined);

      return {
        ok: false,
        reason: "request_failed",
        status: response.status,
        error,
      };
    }

    const events = (await response.json()) as AdminAnalyticsEvent[];

    return {
      ok: true,
      dashboard: createDashboard(events, filters),
    };
  } catch (error) {
    return {
      ok: false,
      reason: "request_failed",
      error: error instanceof Error ? error.message : "Unknown admin analytics error",
    };
  }
}
