# Phase 8C - Admin Access Hardening

## Objective

Harden access to the private admin analytics dashboard before moving to SEO and public polish work.

The dashboard remains a read-only internal route, but `/admin/*` must not be casually accessible in production.

## Route Protected

```txt
/admin/*
```

## Protection Strategy

The project uses Next.js middleware with Basic Auth for the admin area.

Environment variables:

```env
ADMIN_ANALYTICS_BASIC_AUTH_ENABLED=true
ADMIN_ANALYTICS_BASIC_AUTH_USER=<admin-user>
ADMIN_ANALYTICS_BASIC_AUTH_PASSWORD=<strong-password>
```

Local development can keep `ADMIN_ANALYTICS_BASIC_AUTH_ENABLED=false` to avoid the browser auth prompt.

In Vercel production, if `ADMIN_ANALYTICS_BASIC_AUTH_ENABLED` is not explicitly set, middleware enables Basic Auth by default. This avoids accidentally exposing `/admin/analytics` because of a missing flag.

## Hardening Details

- Admin responses use `Cache-Control: no-store`.
- Admin responses use `X-Robots-Tag: noindex, nofollow, noarchive`.
- Admin responses use `X-Frame-Options: DENY`.
- Admin responses use `X-Content-Type-Options: nosniff`.
- Admin responses use `Referrer-Policy: no-referrer`.
- Malformed Basic Auth headers fail closed.
- Missing production credentials return a generic `404` instead of exposing dashboard details.
- Credential checks avoid direct string equality comparisons.
- The Supabase service role key remains server-only and is never exposed to the browser.

## Files

```txt
middleware.ts
app/admin/analytics/page.tsx
.env.example
docs/01-roadmap.md
docs/23-admin-access-hardening.md
README.md
```

## Validation

Run:

```bash
npm run lint
npm run build
```

Production validation:

1. Set `ADMIN_ANALYTICS_BASIC_AUTH_ENABLED=true` in Vercel.
2. Set `ADMIN_ANALYTICS_BASIC_AUTH_USER`.
3. Set `ADMIN_ANALYTICS_BASIC_AUTH_PASSWORD`.
4. Redeploy.
5. Open `/admin/analytics`.
6. Confirm the browser asks for credentials.
7. Confirm wrong credentials are rejected.
8. Confirm valid credentials load the dashboard.
