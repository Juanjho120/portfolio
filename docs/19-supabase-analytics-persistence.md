# Phase 7C - Supabase Analytics Persistence

## Objective

Add a server-side persistence layer for custom portfolio analytics events so the project can store long-term interaction data in Supabase.

This phase builds on:

- Phase 7A: Vercel Analytics foundation
- Phase 7B: Custom event tracking foundation

## Scope

Included:

- Add a client helper that keeps Vercel Analytics tracking and optionally mirrors events to `/api/analytics/events`.
- Add a Next.js Route Handler at `/api/analytics/events`.
- Persist sanitized events to Supabase through the Data REST API from server-side code.
- Add environment variable documentation through `.env.example`.
- Document the Supabase SQL table.
- Keep persistence disabled by default until Supabase production credentials are configured.

Not included yet:

- Private analytics dashboard.
- Admin authentication.
- Aggregated analytics queries.
- Session tracking or user identity.

Those items belong to Phase 8.

## Files

```txt
.env.example
app/api/analytics/events/route.ts
components/TrackedLink.tsx
lib/analytics.ts
lib/supabase-analytics.ts
README.md
docs/01-roadmap.md
docs/05-analytics-plan.md
docs/19-supabase-analytics-persistence.md
```

## Event Flow

```txt
TrackedLink click
  -> trackPortfolioEvent()
    -> Vercel Analytics track()
    -> optional POST /api/analytics/events
      -> validate event name
      -> sanitize payload
      -> persist to Supabase REST API
```

The persistence call uses `navigator.sendBeacon()` when available so navigation, external links and downloads are not blocked.

## Feature Flags

Persistence is disabled by default. Enable it only after the Supabase table and Vercel environment variables are ready.

```txt
NEXT_PUBLIC_ANALYTICS_PERSISTENCE_ENABLED=true
SUPABASE_ANALYTICS_ENABLED=true
SUPABASE_URL=<supabase-project-url>
SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role-key>
SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events
```

Important:

```txt
SUPABASE_SERVICE_ROLE_KEY must never be exposed as NEXT_PUBLIC_*
```

## Supabase SQL

Run this in the Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.portfolio_analytics_events (
  id uuid primary key default gen_random_uuid(),
  event_name text not null,
  locale text null,
  target text null,
  path text null,
  referrer text null,
  user_agent text null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_portfolio_analytics_events_created_at
  on public.portfolio_analytics_events (created_at desc);

create index if not exists idx_portfolio_analytics_events_event_name
  on public.portfolio_analytics_events (event_name);

create index if not exists idx_portfolio_analytics_events_locale
  on public.portfolio_analytics_events (locale);

create index if not exists idx_portfolio_analytics_events_target
  on public.portfolio_analytics_events (target);

alter table public.portfolio_analytics_events enable row level security;

grant insert on table public.portfolio_analytics_events to service_role;
grant select on table public.portfolio_analytics_events to service_role;
```

The endpoint writes through server-side code using the service role key, so no public insert policy is required.

## Allowed Events

```txt
Project Demo Click
Project GitHub Click
CV Download Click
External Contact Click
External Profile Click
```

## Stored Fields

```txt
event_name
locale
target
path
referrer
user_agent
metadata
created_at
```

## Privacy Notes

This phase intentionally avoids storing:

- IP addresses
- Exact geolocation
- User identity
- Fingerprinting IDs

The goal is portfolio interaction analysis, not invasive visitor tracking.

## Validation

Local validation:

```bash
npm run lint
npm run build
```

Production validation after configuring Supabase variables in Vercel:

```txt
1. Open /en and /es.
2. Click a project card image.
3. Click a project Live Demo button.
4. Click CV from hero or footer.
5. Confirm new rows in public.portfolio_analytics_events.
6. Confirm navigation/download behavior remains normal.
```
