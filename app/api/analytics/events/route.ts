import { NextResponse, type NextRequest } from "next/server";

import { persistSupabaseAnalyticsEvent } from "@/lib/supabase-analytics";

type AnalyticsPayload = {
  eventName?: unknown;
  properties?: unknown;
  path?: unknown;
  referrer?: unknown;
};

type TrackingPropertyValue = string | number | boolean;

const ALLOWED_EVENTS = new Set([
  "Project Demo Click",
  "Project GitHub Click",
  "CV Download Click",
  "External Contact Click",
  "External Profile Click",
]);

function isSupabasePersistenceEnabled() {
  return process.env.SUPABASE_ANALYTICS_ENABLED === "true";
}

function sanitizeText(value: unknown, maxLength: number) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim().slice(0, maxLength)
    : null;
}

function sanitizeTrackingProperties(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {} as Record<string, TrackingPropertyValue>;
  }

  return Object.entries(value).reduce<Record<string, TrackingPropertyValue>>((properties, [key, rawValue]) => {
    if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(key)) {
      return properties;
    }

    if (typeof rawValue === "string") {
      properties[key] = rawValue.slice(0, 240);
    }

    if (typeof rawValue === "number" && Number.isFinite(rawValue)) {
      properties[key] = rawValue;
    }

    if (typeof rawValue === "boolean") {
      properties[key] = rawValue;
    }

    return properties;
  }, {});
}

export async function POST(request: NextRequest) {
  if (!isSupabasePersistenceEnabled()) {
    return NextResponse.json({ ok: true, persisted: false, reason: "disabled" }, { status: 202 });
  }

  let payload: AnalyticsPayload;

  try {
    payload = (await request.json()) as AnalyticsPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid analytics payload" }, { status: 400 });
  }

  const eventName = sanitizeText(payload.eventName, 80);

  if (!eventName || !ALLOWED_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: false, error: "Unsupported analytics event" }, { status: 400 });
  }

  const properties = sanitizeTrackingProperties(payload.properties);
  const locale = typeof properties.locale === "string" ? properties.locale.slice(0, 16) : null;
  const target = typeof properties.target === "string" ? properties.target.slice(0, 240) : null;

  const result = await persistSupabaseAnalyticsEvent({
    event_name: eventName,
    locale,
    target,
    path: sanitizeText(payload.path, 500),
    referrer: sanitizeText(payload.referrer, 500),
    user_agent: sanitizeText(request.headers.get("user-agent"), 500),
    metadata: properties,
  });

  if (!result.ok) {
    const status = result.reason === "missing_config" || result.reason === "invalid_table" ? 202 : 502;

    return NextResponse.json(
      { ok: false, persisted: false, reason: result.reason },
      { status },
    );
  }

  return NextResponse.json({ ok: true, persisted: true }, { status: 202 });
}
