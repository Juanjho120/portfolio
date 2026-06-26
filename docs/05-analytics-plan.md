# Analytics Plan

The portfolio will track two levels of analytics.

## General Analytics

Use Vercel Analytics for:

- Page views
- Visitors
- General traffic metrics

## Custom Events

Use Vercel custom events first for lightweight interaction tracking. Supabase persistence will be added later for long-term custom reporting and the private analytics dashboard.

Initial Vercel custom events:

- `Project Demo Click`
- `Project GitHub Click`
- `CV Download Click`
- `External Contact Click`
- `External Profile Click`

Each event should include:

- `locale`
- `target`

## Supabase Table

Table name:

```text
portfolio_events
```

Suggested columns:

```sql
id uuid primary key default gen_random_uuid(),
event_type text not null,
project_slug text null,
destination_url text null,
locale text null,
user_agent text null,
created_at timestamptz not null default now()
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
