# Phase 8A - Admin Analytics Dashboard Foundation

## Objective

Add the first private admin dashboard page for reviewing custom portfolio analytics stored in Supabase.

The goal of this phase is to create a useful read-only foundation without adding a separate backend or third-party dashboard dependency.

## Route

```txt
/admin/analytics
```

## Data Source

The dashboard reads from the same Supabase table used by Phase 7C:

```txt
portfolio_analytics_events
```

The route reads data server-side using:

```txt
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_ANALYTICS_TABLE
```

The service role key remains server-only and is never exposed to the browser.

## Metrics Included

The first version shows:

- Total recent events.
- Project clicks.
- CV download clicks.
- Top project target.
- Events by type.
- Events by locale.
- Top project targets.
- Latest 25 events.

The dashboard currently reads the latest 500 events and aggregates them in the Next.js server component.

## Access Protection

This phase adds optional Basic Auth middleware for `/admin/*` routes.

Environment variables:

```env
ADMIN_ANALYTICS_BASIC_AUTH_ENABLED=true
ADMIN_ANALYTICS_BASIC_AUTH_USER=<admin-user>
ADMIN_ANALYTICS_BASIC_AUTH_PASSWORD=<strong-password>
```

For local development, `ADMIN_ANALYTICS_BASIC_AUTH_ENABLED=false` can be used to avoid the browser auth prompt.

## Security Notes

- The dashboard is read-only.
- The dashboard does not expose the Supabase service role key.
- The dashboard does not add IP tracking or fingerprinting.
- Basic Auth is an initial lightweight protection mechanism.
- A stronger access model can be implemented later if the admin area grows.

## Files

```txt
app/admin/analytics/page.tsx
lib/admin-analytics.ts
middleware.ts
.env.example
```

## Validation

Run:

```bash
npm run lint
npm run build
```

Then test locally:

```txt
http://localhost:3000/admin/analytics
```

Production validation:

1. Configure the existing Supabase analytics variables in Vercel.
2. Configure Basic Auth variables in Vercel.
3. Redeploy.
4. Open `/admin/analytics`.
5. Confirm the browser asks for credentials when Basic Auth is enabled.
6. Confirm the dashboard loads Supabase analytics metrics.
