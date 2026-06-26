# Analytics Plan

The portfolio will track two levels of analytics.

## General Analytics

Use Vercel Analytics for:

- Page views
- Visitors
- Performance insights

## Custom Events

Use Supabase to track custom portfolio events.

Initial events:

- `portfolio_visit`
- `project_click`
- `cv_download`
- `github_click`
- `linkedin_click`
- `email_click`

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

When a user clicks a project card, save:

- Event type: `project_click`
- Project slug
- Destination URL
- Current locale when available
- Timestamp
- User agent

## CV Download Event

When a user clicks the CV link, save:

- Event type: `cv_download`
- Current locale when available
- Timestamp
- User agent

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
