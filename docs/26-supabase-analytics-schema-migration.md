# Supabase Analytics Schema Migration

## Objective

Move portfolio analytics persistence from the default `public` schema into a dedicated `portfolio` schema inside the Supabase `portfolio-lab` project.

The existing analytics data did not need to be preserved, so the new table can start clean.

## Final Target

```txt
Supabase project: portfolio-lab
Schema: portfolio
Table: portfolio_analytics_events
Full table: portfolio.portfolio_analytics_events
```

## Environment Variables

Vercel must use the Supabase credentials from the `portfolio-lab` project.

```env
NEXT_PUBLIC_ANALYTICS_PERSISTENCE_ENABLED=true
SUPABASE_ANALYTICS_ENABLED=true
SUPABASE_URL=https://<portfolio-lab-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<portfolio-lab-server-side-secret-or-service-role-key>
SUPABASE_ANALYTICS_SCHEMA=portfolio
SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events
```

Important rules:

- `SUPABASE_SERVICE_ROLE_KEY` must never use a `NEXT_PUBLIC_` prefix.
- `SUPABASE_ANALYTICS_TABLE` must not include the schema name.
- Use `SUPABASE_ANALYTICS_SCHEMA=portfolio` and `SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events` separately.

## SQL Setup

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

## Supabase Dashboard Step

The `portfolio` schema must be exposed through the Supabase Data API settings.

Expected setup:

```txt
Project Settings / Data API / API Settings
→ Exposed schemas
→ portfolio
```

If the schema is not exposed, requests that use `Content-Profile: portfolio` or `Accept-Profile: portfolio` may fail.

## Application Behavior

Event inserts use the Supabase REST API with:

```txt
Content-Profile: portfolio
```

Admin dashboard reads use:

```txt
Accept-Profile: portfolio
```

Both operations keep the REST path table-only:

```txt
/rest/v1/portfolio_analytics_events
```

## Validation

After deployment:

1. Click a tracked element on `https://juantzun.dev`.
2. Confirm Vercel logs show `POST /api/analytics/events` with a successful status.
3. Confirm a row appears in `portfolio.portfolio_analytics_events`.
4. Open `/admin/analytics`.
5. Confirm the dashboard reads the clean table from the `portfolio` schema.

## Status

Completed and validated in production.
