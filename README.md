# Juan Tzun Portfolio

Professional portfolio for [juantzun.dev](https://juantzun.dev).

This project is the central entry point for my software engineering work. It presents selected projects as product-like case studies with live demos, technical stacks, architecture decisions, and future analytics.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Vercel
- Supabase for custom analytics later
- Vercel Analytics for general metrics later

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

The CV is available at `public/cv/Juan_Tzun_CV.pdf` and served as `/cv/Juan_Tzun_CV.pdf`.

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
