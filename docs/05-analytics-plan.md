# Analytics Plan

The portfolio tracks two levels of analytics.

## General Analytics

Use Vercel Analytics for:

- Page views
- Visitors
- General traffic metrics

## Custom Events

Use Vercel custom events for lightweight interaction tracking and Supabase persistence for long-term custom reporting.

Tracked custom events:

- `Project Demo Click`
- `Project GitHub Click`
- `CV Download Click`
- `External Contact Click`
- `External Profile Click`

Each event includes:

- `locale`
- `target`

The client-side tracking layer calls Vercel Analytics first, then optionally posts the same compact event payload to `/api/analytics/events` when Supabase persistence is enabled.

## Supabase Persistence

The persistence endpoint is:

```txt
/api/analytics/events
```

The endpoint is disabled by default and only writes to Supabase when these environment variables are configured:

```txt
NEXT_PUBLIC_ANALYTICS_PERSISTENCE_ENABLED=true
SUPABASE_ANALYTICS_ENABLED=true
SUPABASE_URL=<supabase-project-url>
SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role-key>
SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-only and must never be exposed with a `NEXT_PUBLIC_` prefix.

## Supabase Table

Table name:

```txt
portfolio_analytics_events
```

SQL setup:

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

## Project Click Event

When a user clicks a project card image or live demo button, track:

- Event name: `Project Demo Click`
- `locale`
- `target`: project slug plus source, for example `tamias:image` or `tamias:button`

## CV Download Event

When a user clicks the CV link, track:

- Event name: `CV Download Click`
- `locale`
- `target`: source area, for example `hero` or `footer`

## Future Admin Dashboard

Route:

- `/admin/analytics`

Metrics:

- Total visits
- Total project clicks
- Clicks by project
- Clicks by locale
- Most clicked project
- Latest events
- CV downloads
- External profile clicks

## Privacy Notes

Do not store sensitive personal information.

Avoid storing:

- IP addresses
- Full fingerprinting data
- Exact geolocation

The goal is to understand project interest, not to track users invasively.
