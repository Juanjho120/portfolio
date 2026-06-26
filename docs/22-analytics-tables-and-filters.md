# Phase 8B - Analytics Tables and Filters

## Objective
Improve the private admin analytics dashboard so persisted Supabase events can be explored without manually querying the database.

## Scope
This phase keeps `/admin/analytics` read-only and server-rendered. It does not add charts, exports or a new authentication strategy. Those remain candidates for later dashboard polish/hardening phases.

## Changes

- Added filters for:
  - date range: all time, last 7 days, last 30 days and last 90 days
  - event type
  - locale
  - target
  - free-text search across event name, locale, target, path and metadata
- Applied filters before calculating metric cards and count breakdowns.
- Expanded the latest-events table to show the last 50 matching events.
- Added an empty state when filters return no events.
- Kept Supabase reads server-side through `lib/admin-analytics.ts`.
- Kept the service role key out of the browser.

## Implementation

The dashboard still fetches a bounded Supabase event sample server-side and then applies dashboard filters in memory. This keeps the implementation simple for the current event volume and avoids exposing any Supabase credentials or query logic to the browser.

Relevant files:

```txt
app/admin/analytics/page.tsx
lib/admin-analytics.ts
```

## Validation

Recommended checks:

```bash
npm run lint
npm run build
```

Production smoke test after deploy:

```txt
/admin/analytics
/admin/analytics?range=7d
/admin/analytics?eventName=CV+Download+Click
/admin/analytics?locale=en
/admin/analytics?search=tamias
```

## Notes

The dashboard remains read-only. Any future admin route should continue to avoid exposing `SUPABASE_SERVICE_ROLE_KEY` or any server-only key to client components.
