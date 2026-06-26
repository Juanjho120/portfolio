# Phase 5.1 - Tech Stack Badges

Status: Completed

## Goal

Improve the project cards by rendering technology badges with a small visual mark before the technology name.

The goal is to make the stack section easier to scan while keeping the portfolio lightweight, static and easy to maintain.

## Implementation

Technology badge icons are stored under:

```txt
public/images/tech
```

The mapping between the displayed stack name and its icon is centralized in:

```txt
data/tech-icons.ts
```

Project cards continue to read stack values from:

```txt
data/projects.ts
```

If a stack item does not have a configured icon, the badge still renders correctly as text-only.

## Current icon coverage

Configured icons:

- Angular
- Spring Boot
- PostgreSQL
- AWS S3
- Spring AI
- Chroma
- OpenAI
- Docker
- Ollama
- RAG
- Spring Batch
- Spring Cloud
- Datadog
- React
- GitHub API
- MCP

## Accessibility

The icon inside each badge is decorative because the technology name is rendered as visible text right next to it. For that reason, the image uses an empty alt value and `aria-hidden="true"`.

## Maintenance notes

When adding a new technology to a project stack:

1. Add the stack label to `data/projects.ts`.
2. If the technology needs an icon, add the SVG under `public/images/tech`.
3. Register the mapping in `data/tech-icons.ts`.
4. Run `npm run lint` and `npm run build`.
