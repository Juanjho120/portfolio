# Phase 7C - Supabase Analytics Persistence

## Objective

Persist portfolio custom events in Supabase so the portfolio can later power a private analytics dashboard without relying only on Vercel Analytics.

## Implemented Files

```txt
.env.example
app/api/analytics/events/route.ts
components/TrackedLink.tsx
lib/analytics.ts
lib/supabase-analytics.ts
docs/05-analytics-plan.md
docs/19-supabase-analytics-persistence.md
README.md
```

## Runtime Flow

```txt
TrackedLink click
→ trackPortfolioEvent()
→ Vercel Analytics custom event
→ POST /api/analytics/events when persistence is enabled
→ Supabase REST insert
→ public.portfolio_analytics_events
```

## Supabase Table

The table is named:

```txt
portfolio_analytics_events
```

Columns:

```txt
id uuid primary key
event_name text
locale text
target text
path text
referrer text
user_agent text
metadata jsonb
created_at timestamptz
```

## Environment Variables

Client-side feature flag:

```env
NEXT_PUBLIC_ANALYTICS_PERSISTENCE_ENABLED=true
```

Server-side persistence configuration:

```env
SUPABASE_ANALYTICS_ENABLED=true
SUPABASE_URL=<supabase-project-url>
SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role-key>
SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events
```

`SUPABASE_SERVICE_ROLE_KEY` must remain server-only and must never use a `NEXT_PUBLIC_` prefix.

## Privacy Rules

The persistence layer intentionally avoids storing:

- IP addresses
- Exact geolocation
- User identity
- Fingerprinting identifiers

Stored data is limited to interaction-level portfolio events, locale, path, referrer, user agent and compact metadata.

## Production Validation

Production validation was completed after:

1. Creating the `portfolio_analytics_events` table in Supabase.
2. Configuring the environment variables in Vercel.
3. Redeploying the production deployment.
4. Triggering portfolio interactions from production.
5. Confirming rows were inserted into Supabase.

Validated interactions:

- Project demo clicks
- CV download clicks
- External profile/contact clicks

## Status

Completed.
