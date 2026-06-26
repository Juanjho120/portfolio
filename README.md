# Juan Tzun Portfolio

Professional portfolio for [juantzun.dev](https://juantzun.dev).

This project is the central entry point for my software engineering work. It presents selected projects as product-like case studies with live demos, technical stacks, architecture decisions, and future analytics.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Vercel
- Supabase for custom analytics persistence
- Vercel Analytics for general metrics

## Main Goal

Showcase full-stack projects focused on:

- Java and Spring Boot backends
- Angular and React frontends
- PostgreSQL data modeling and performance
- Docker-based deployments
- AI features with RAG, OpenAI, Spring AI, Chroma and MCP
- Real operational use cases

## Languages

The portfolio supports Spanish and English routes:

```txt
/es
/en
```

The root route redirects to the default locale:

```txt
/ → /en
```

Visible copy is managed through JSON dictionaries:

```txt
i18n/messages/es.json
i18n/messages/en.json
```

## Visual Assets

Project visuals are stored in `public/images/projects`.

Technology icons are stored in:

```txt
public/images/tech
public/images/hero-stats
```

The CV is available at `public/cv/Juan_Tzun_CV.pdf` and served as `/cv/Juan_Tzun_CV.pdf`.

## Animated Background

The portfolio includes a decorative animated PCB-style background.

It is implemented with:

```txt
components/AnimatedPcbBackground.tsx
data/pcb-background.ts
```

The background uses CSS animations, SVG paths, responsive chip positioning, PCB-style vias, audited 45-degree routed traces, synchronized chip glow states, chip-entry trace cleanup, and respects `prefers-reduced-motion`.

## Deployment

The portfolio is deployed on Vercel from the `main` branch.

Deployment status:

```txt
Completed
```

Main production domain:

```txt
https://juantzun.dev
```

Deployment documentation:

```txt
docs/04-deployment-and-domains.md
docs/16-deployment-runbook.md
```

## Analytics

The portfolio uses Vercel Analytics for general traffic metrics and a Supabase-ready custom event persistence layer for portfolio interactions.

It is implemented with:

```txt
@vercel/analytics
app/layout.tsx
components/TrackedLink.tsx
lib/analytics.ts
lib/supabase-analytics.ts
app/api/analytics/events/route.ts
```

Currently tracked custom interactions:

```txt
Project Demo Click
Project GitHub Click
CV Download Click
External Contact Click
External Profile Click
```

Each event includes the current locale and a target identifier. Supabase persistence is handled by `/api/analytics/events` and remains feature-flagged through environment variables until production Supabase credentials are configured.

## Initial Projects

- TAMIAS
- KnowledgeHub AI
- Election Analytics Platform
- DevFlow
- MCP Agent Marketplace
- SQL Performance Lab
- Proteus 2.0

## Local Development

```bash
npm run dev
```

Open the app at:

```txt
http://localhost:3000
```

Recommended routes for testing:

```txt
http://localhost:3000/es
http://localhost:3000/en
```

## Useful Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Documentation

Project documentation lives in `/docs`.

Recommended reading order:

1. `docs/00-project-context.md`
2. `docs/01-roadmap.md`
3. `docs/02-architecture.md`
4. `docs/03-projects-catalog.md`
5. `docs/04-deployment-and-domains.md`
6. `docs/05-analytics-plan.md`
7. `docs/06-landing-page-mvp.md`
8. `docs/07-i18n-foundation.md`
9. `docs/08-visual-assets-and-cv.md`
10. `docs/09-tech-stack-badges.md`
11. `docs/10-hero-stat-icons.md`
12. `docs/11-animated-pcb-background.md`
13. `docs/12-pcb-background-polish.md`
14. `docs/13-pcb-background-sync-and-routing.md`
15. `docs/14-pcb-routing-geometry-correction.md`
16. `docs/15-pcb-lighting-and-chip-visibility.md`
17. `docs/16-deployment-runbook.md`
18. `docs/17-vercel-analytics-foundation.md`
19. `docs/18-custom-event-tracking-foundation.md`
20. `docs/19-supabase-analytics-persistence.md`
