type SupabaseAnalyticsRecord = {
  event_name: string;
  locale: string | null;
  target: string | null;
  path: string | null;
  referrer: string | null;
  user_agent: string | null;
  metadata: Record<string, string | number | boolean>;
};

type PersistAnalyticsResult =
  | { ok: true }
  | { ok: false; reason: "missing_config" | "invalid_table" | "request_failed"; status?: number; error?: string };

const DEFAULT_ANALYTICS_TABLE = "portfolio_analytics_events";
const TABLE_NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]*$/;

function getSupabaseAnalyticsConfig() {
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

export async function persistSupabaseAnalyticsEvent(
  record: SupabaseAnalyticsRecord,
): Promise<PersistAnalyticsResult> {
  const config = getSupabaseAnalyticsConfig();

  if (!config.configured) {
    return { ok: false, reason: "missing_config" };
  }

  if (!config.valid) {
    return { ok: false, reason: "invalid_table" };
  }

  try {
    const response = await fetch(`${config.supabaseUrl}/rest/v1/${config.tableName}`, {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(record),
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

    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: "request_failed",
      error: error instanceof Error ? error.message : "Unknown Supabase analytics error",
    };
  }
}
