# Deployment and Domains

## Main Portfolio

Domain:

- https://juantzun.dev

Hosting:

- Vercel

Repository:

- https://github.com/Juanjho120/portfolio

## Project Subdomains

- https://tamias.juantzun.dev
- https://knowledgehub.juantzun.dev
- https://elections.juantzun.dev
- https://devflow.juantzun.dev
- https://mcp.juantzun.dev
- https://performancelab.juantzun.dev
- https://proteus.juantzun.dev

Only the root domain `juantzun.dev` needs to be purchased.

Subdomains are configured through DNS records.

## Recommended DNS Provider

Use Cloudflare for DNS management.

Benefits:

- Easy subdomain management
- Fast DNS
- Good developer experience
- SSL support
- Security features

## Deployment Strategy

Each push to `main` should trigger a new deployment.

Initial deployment flow:

```text
GitHub
  ↓
Vercel
  ↓
juantzun.dev
```

## Future CI/CD

Vercel already provides automatic deployment from GitHub.

GitHub Actions can be added later for:

- Lint
- Build validation
- Tests
- Type checking
- Deployment checks
