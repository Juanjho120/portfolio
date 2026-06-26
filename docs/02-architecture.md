# Architecture

The portfolio is a single Next.js application.

There is no separate backend service for the initial version.

Next.js will handle:

- Static pages
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
Project Cards
  ↓
External project subdomains
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

## Suggested Folder Structure

```text
portfolio/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── admin/
│   │   └── analytics/
│   │       └── page.tsx
│   └── api/
│       └── track-click/
│           └── route.ts
├── components/
│   ├── Header.tsx
│   ├── ProjectCard.tsx
│   ├── ProjectGrid.tsx
│   └── Footer.tsx
├── data/
│   └── projects.ts
├── lib/
│   ├── supabase.ts
│   └── analytics.ts
├── public/
│   ├── images/
│   │   ├── tamias.png
│   │   ├── knowledgehub.png
│   │   └── mcp.png
│   └── cv/
│       └── Juan_Tzun_CV.pdf
├── docs/
├── .env.local
├── package.json
├── next.config.ts
└── README.md
```

## Design Principles

- Keep the portfolio simple, modern, and professional.
- Use static data first.
- Avoid unnecessary backend services.
- Use Next.js API routes only for small server-side needs.
- Keep project metadata centralized in `data/projects.ts`.
- Treat each project as a product case study.
