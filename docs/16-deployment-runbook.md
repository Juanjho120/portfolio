# Phase 6 - Deployment Runbook

## Objective

Deploy the portfolio to Vercel and connect the production domain `juantzun.dev` through Cloudflare DNS.

This phase focuses only on production deployment readiness. Analytics, SEO expansion, Open Graph image generation, sitemap, and robots.txt are intentionally left for later phases.

## Current Deployment Decisions

```txt
Hosting: Vercel
DNS: Cloudflare
Repository: Juanjho120/portfolio
Production branch: main
Primary domain: juantzun.dev
Default locale: /en
Root behavior: / redirects to /en
```

## Preflight Checklist

Run locally before connecting or redeploying production:

```bash
npm run lint
npm run build
git status
```

Expected state:

```txt
lint passes
build passes
working tree is clean
latest commit is pushed to GitHub main
```

## Vercel Import Steps

1. Open Vercel.
2. Import the GitHub repository `Juanjho120/portfolio`.
3. Select the Next.js framework preset.
4. Confirm the production branch is `main`.
5. Use the default Vercel output detection.
6. Use `npm install` as install command if Vercel asks for it.
7. Use `npm run build` as build command if Vercel asks for it.
8. Do not add environment variables for the current version.
9. Trigger the first deployment.

## Initial Vercel Smoke Test

Before adding the custom domain, validate the temporary Vercel URL:

```txt
/ redirects to /en
/en loads
/es loads
language switcher works
CV download opens
project images render
tech icons render
animated PCB background is decorative only
mobile view is usable
```

## Custom Domain Steps

1. Add `juantzun.dev` in the Vercel project domain settings.
2. Add `www.juantzun.dev` in the Vercel project domain settings.
3. Copy the DNS records Vercel requests.
4. Add those records in Cloudflare DNS.
5. Wait for Vercel verification.
6. Configure the canonical domain as `juantzun.dev`.
7. Confirm `www.juantzun.dev` redirects or aliases correctly according to the chosen Vercel setting.

## Cloudflare Checklist

If the domain is not already active in Cloudflare:

```txt
add the domain to Cloudflare
copy Cloudflare nameservers
update nameservers at the registrar
wait until Cloudflare marks the zone active
```

For DNS records:

```txt
use Vercel-provided records
avoid hardcoded DNS targets unless Vercel currently shows them
keep proxy/settings simple during initial verification
```

## Production Validation Checklist

After Vercel verifies the domain, test:

```txt
https://juantzun.dev
https://juantzun.dev/en
https://juantzun.dev/es
https://www.juantzun.dev
https://juantzun.dev/cv/Juan_Tzun_CV.pdf
```

Functional checks:

```txt
root redirects to /en
English content renders
Spanish content renders
language switcher keeps correct locale
project cards open live demo URLs
external links open correctly
CV opens correctly
PCB background does not block clicks
layout works on desktop
layout works on mobile
```

Browser checks:

```txt
Chrome desktop
Chrome mobile emulator
one real mobile device if available
```

## Rollback

If production breaks after a deployment:

1. Open Vercel deployment history.
2. Find the last known good deployment.
3. Promote or roll back to that deployment.
4. Fix the issue in Git.
5. Push a new commit to `main`.

## Phase Completion Criteria

Phase 6 is complete when:

```txt
Vercel project is connected to GitHub
main deploys successfully
juantzun.dev is verified and serving the portfolio
www.juantzun.dev behavior is configured
post-deployment checklist passes
roadmap is updated from In Progress to Completed
```
