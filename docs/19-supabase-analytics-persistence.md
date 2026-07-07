# Phase 7C - Supabase Analytics Persistence

## Objective

Persist portfolio custom events in Supabase so the portfolio can later power a private analytics dashboard without relying only on Vercel Analytics.

## Implemented Files

```txt
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
→ Supabase REST insert using Content-Profile: portfolio
→ portfolio.portfolio_analytics_events
```

## Supabase Project

The active analytics persistence target is the Supabase project used for the portfolio lab environment.

```txt
project: portfolio-lab
schema: portfolio
table: portfolio_analytics_events
full name: portfolio.portfolio_analytics_events
```

## Supabase Table

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
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANALYTICS_SCHEMA=portfolio
SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events
```

`SUPABASE_SERVICE_ROLE_KEY` must remain server-only and must never use a `NEXT_PUBLIC_` prefix.

## Custom Schema Support

The code uses a separate schema and table name instead of hardcoding `public`.

Writes use:

```txt
Content-Profile: portfolio
```

Reads from the admin dashboard use:

```txt
Accept-Profile: portfolio
```

The REST path remains table-only:

```txt
/rest/v1/portfolio_analytics_events
```

Do not configure `SUPABASE_ANALYTICS_TABLE` as `portfolio.portfolio_analytics_events`. Keep the schema and table separated:

```env
SUPABASE_ANALYTICS_SCHEMA=portfolio
SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events
```

## Privacy Rules

The persistence layer intentionally avoids storing:

- IP addresses
- Exact geolocation
- User identity
- Fingerprinting identifiers

Stored data is limited to interaction-level portfolio events, locale, path, referrer, user agent and compact metadata.

## Production Validation

Production validation was completed after:

1. Creating the `portfolio.portfolio_analytics_events` table in Supabase.
2. Exposing the `portfolio` schema in Supabase Data API settings.
3. Configuring the environment variables in Vercel.
4. Redeploying the production deployment.
5. Triggering portfolio interactions from production.
6. Confirming rows were inserted into `portfolio.portfolio_analytics_events`.
7. Confirming `/admin/analytics` reads from the new table.

Validated interactions:

- Project demo clicks
- CV download clicks
- External profile/contact clicks

## Status

Completed.
