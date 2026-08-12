# Analytics Plan

The portfolio tracks two levels of analytics.

## General Analytics

Use Vercel Analytics for:

- Page views
- Visitors
- General traffic metrics

Status: Implemented through `@vercel/analytics` in the root layout.

## Custom Events

Use Vercel custom events for lightweight interaction tracking and Supabase persistence for long-term custom reporting.

Tracked custom events:

- `Project Demo Click`
- `CV Download Click`
- `External Contact Click`
- `External Profile Click`

Each event includes:

- `locale`
- `target`

The client-side tracking layer calls Vercel Analytics first, then optionally posts the same compact event payload to `/api/analytics/events` when Supabase persistence is enabled.

Status: Implemented and validated in production.

## Supabase Persistence

The persistence endpoint is:

```txt
/api/analytics/events
```

The endpoint writes analytics events into the Supabase `portfolio-lab` project, under this database object:

```txt
schema: portfolio
table: portfolio_analytics_events
full name: portfolio.portfolio_analytics_events
```

The endpoint only writes to Supabase when these environment variables are configured:

```env
NEXT_PUBLIC_ANALYTICS_PERSISTENCE_ENABLED=true
SUPABASE_ANALYTICS_ENABLED=true
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANALYTICS_SCHEMA=portfolio
SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events
```

`SUPABASE_SERVICE_ROLE_KEY` must stay server-only and must never be exposed with a `NEXT_PUBLIC_` prefix.

Status: Implemented and validated in production.

## Supabase Table

Schema:

```txt
portfolio
```

Table name:

```txt
portfolio_analytics_events
```

Full table name:

```txt
portfolio.portfolio_analytics_events
```

SQL setup:

```sql
create extension if not exists pgcrypto;

create schema if not exists portfolio;

create table if not exists portfolio.portfolio_analytics_events (
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
  on portfolio.portfolio_analytics_events (created_at desc);

create index if not exists idx_portfolio_analytics_events_event_name
  on portfolio.portfolio_analytics_events (event_name);

create index if not exists idx_portfolio_analytics_events_locale
  on portfolio.portfolio_analytics_events (locale);

create index if not exists idx_portfolio_analytics_events_target
  on portfolio.portfolio_analytics_events (target);

alter table portfolio.portfolio_analytics_events enable row level security;

revoke all on schema portfolio from anon, authenticated;
revoke all on all tables in schema portfolio from anon, authenticated;

grant usage on schema portfolio to service_role;
grant select, insert on table portfolio.portfolio_analytics_events to service_role;

notify pgrst, 'reload schema';
```

Supabase must expose the `portfolio` schema through the Data API settings so PostgREST can accept requests using `Content-Profile` and `Accept-Profile`.

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

## Production Validation

Production validation completed after configuring Supabase environment variables in Vercel and redeploying.

Validated behavior:

- Custom click events call `/api/analytics/events`.
- The endpoint persists rows into `portfolio.portfolio_analytics_events`.
- The admin dashboard reads rows from `portfolio.portfolio_analytics_events`.
- Events include locale and target information.
- No IP address, exact geolocation, user identity or browser fingerprint is stored.

## Admin Dashboard Route

Route:

```txt
/admin/analytics
```

Metrics:

- Total events
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
