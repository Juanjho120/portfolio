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

export type AdminAnalyticsDashboard = {
  totalEvents: number;
  projectClicks: number;
  cvDownloads: number;
  externalClicks: number;
  topTarget: string | null;
  latestEventAt: string | null;
  eventCounts: AnalyticsCount[];
  localeCounts: AnalyticsCount[];
  targetCounts: AnalyticsCount[];
  recentEvents: AdminAnalyticsEvent[];
};

type AdminAnalyticsResult =
  | { ok: true; dashboard: AdminAnalyticsDashboard }
  | { ok: false; reason: "missing_config" | "invalid_table" | "request_failed"; status?: number; error?: string };

const DEFAULT_ANALYTICS_TABLE = "portfolio_analytics_events";
const TABLE_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/;
const DEFAULT_EVENT_LIMIT = 500;

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

function createDashboard(events: AdminAnalyticsEvent[]): AdminAnalyticsDashboard {
  const projectEvents = events.filter(
    (event) => event.event_name === "Project Demo Click" || event.event_name === "Project GitHub Click",
  );

  const targetCounts = countBy(projectEvents, (event) => event.target);

  return {
    totalEvents: events.length,
    projectClicks: projectEvents.length,
    cvDownloads: events.filter((event) => event.event_name === "CV Download Click").length,
    externalClicks: events.filter(
      (event) => event.event_name === "External Contact Click" || event.event_name === "External Profile Click",
    ).length,
    topTarget: targetCounts[0]?.label ?? null,
    latestEventAt: events[0]?.created_at ?? null,
    eventCounts: countBy(events, (event) => event.event_name),
    localeCounts: countBy(events, (event) => event.locale),
    targetCounts,
    recentEvents: events.slice(0, 25),
  };
}

export async function getAdminAnalyticsDashboard(): Promise<AdminAnalyticsResult> {
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
      dashboard: createDashboard(events),
    };
  } catch (error) {
    return {
      ok: false,
      reason: "request_failed",
      error: error instanceof Error ? error.message : "Unknown admin analytics error",
    };
  }
}
