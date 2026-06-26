# Phase 7D - Analytics Closeout

## Objective

Close the Analytics phase after validating the full event pipeline in production.

## Final Analytics Pipeline

The final Phase 7 analytics architecture is:

```txt
User interaction
→ TrackedLink
→ trackPortfolioEvent()
→ Vercel Analytics custom event
→ /api/analytics/events
→ Supabase REST API
→ portfolio_analytics_events
```

## Completed Scope

Phase 7 delivered:

- Vercel Analytics foundation for general metrics.
- Custom event tracking for portfolio interactions.
- Supabase persistence for long-term event storage.
- Production validation that custom events generate rows in Supabase.
- Privacy-conscious event storage without IP, fingerprinting or exact geolocation.

## Production Validation

Production validation confirmed that clicking tracked portfolio interactions creates rows in:

```txt
public.portfolio_analytics_events
```

Validated event types:

```txt
Project Demo Click
Project GitHub Click
CV Download Click
External Contact Click
External Profile Click
```

Each persisted event may include:

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

## Environment Variables

Production persistence depends on these variables in Vercel:

```env
NEXT_PUBLIC_ANALYTICS_PERSISTENCE_ENABLED=true
SUPABASE_ANALYTICS_ENABLED=true
SUPABASE_URL=<supabase-project-url>
SUPABASE_SERVICE_ROLE_KEY=<server-only-service-role-key>
SUPABASE_ANALYTICS_TABLE=portfolio_analytics_events
```

## Next Phase

The next formal phase is:

```txt
Phase 8 - Admin Analytics Dashboard
```

The dashboard will read from Supabase and show portfolio metrics such as:

- Total events
- Project clicks
- CV downloads
- Events by locale
- Most clicked project
- Latest events

## Status

Completed.
