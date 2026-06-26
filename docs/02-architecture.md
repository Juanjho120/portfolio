# Architecture

The portfolio is a single Next.js application.

There is no separate backend service for the initial version.

Next.js will handle:

- Static pages
- Locale-based rendering
- Project rendering
- Internal API routes
- Event tracking endpoint

Supabase will be used for custom analytics events.

Vercel will host the application and provide automatic deployments from GitHub.

## High-level Architecture

```text
User
 ↓
juantzun.dev
 ↓
Next.js / Vercel
 ↓
/es or /en
 ↓
Project Cards
 ↓
External project subdomains
```

## Internationalization Flow

```text
Request /es or /en
 ↓
Validate locale
 ↓
Load dictionary from /i18n/messages
 ↓
Render static portfolio page
```

The root route redirects to the default locale:

```text
/ → /en
```

## Custom Analytics Flow

```text
User click
 ↓
Next.js API Route
 ↓
Supabase
 ↓
Admin Analytics Dashboard
```

When custom analytics is implemented, events should include the current locale when available.

## Current Folder Structure

```text
portfolio/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── admin/
│   │   └── analytics/
│   │       └── page.tsx
│   └── api/
│       └── track-click/
│           └── route.ts
├── components/
│   ├── Header.tsx
│   ├── LanguageSwitcher.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   └── Footer.tsx
├── data/
│   └── projects.ts
├── i18n/
│   ├── config.ts
│   ├── dictionaries.ts
│   └── messages/
│       ├── es.json
│       └── en.json
├── lib/
│   ├── supabase.ts
│   └── analytics.ts
├── public/
│   ├── images/
│   │   └── projects/
│   └── cv/
│       └── Juan_Tzun_CV.pdf
├── docs/
├── .env.local
├── package.json
├── next.config.ts
└── README.md
```

Some future folders, such as `lib`, `app/api`, and `app/admin`, are documented as target structure and will be created when those phases are implemented.

## Project Data Strategy

Technical metadata lives in:

```txt
data/projects.ts
```

This includes:

- Slug
- Title
- Stack
- Live demo URL
- Optional GitHub URL
- Internal status key

Translated copy lives in:

```txt
i18n/messages/es.json
i18n/messages/en.json
```

This includes:

- Page copy
- Navigation labels
- Project descriptions
- Project highlights
- Status labels
- Footer copy

This keeps project URLs and stacks stable while allowing the visible copy to change by locale.

## Design Principles

- Keep the portfolio simple, modern, and professional.
- Use static data first.
- Avoid unnecessary backend services.
- Use Next.js API routes only for small server-side needs.
- Keep project metadata centralized in `data/projects.ts`.
- Keep translated UI text in JSON dictionaries.
- Treat each project as a product case study.
