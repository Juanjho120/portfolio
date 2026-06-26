# Phase 7A - Vercel Analytics Foundation

## Objective

Add Vercel Analytics as the first analytics layer for the portfolio.

This phase only covers general traffic analytics. It does not add custom event persistence yet.

## Scope

Included:

- Install `@vercel/analytics`.
- Add the Analytics component to the root layout.
- Collect general pageview analytics across the portfolio.
- Keep analytics active globally for `/`, `/en` and `/es`.
- Document validation steps.

Not included yet:

- Project card click tracking.
- CV download tracking.
- External profile click tracking.
- Supabase persistence.
- Private analytics dashboard.

Those items belong to Phase 7B, Phase 7C and Phase 8.

## Files

```txt
package.json
app/layout.tsx
README.md
docs/01-roadmap.md
docs/17-vercel-analytics-foundation.md
```

## Implementation

The root layout imports the Analytics component from Vercel:

```tsx
import { Analytics } from "@vercel/analytics/next";
```

The component is rendered once in `app/layout.tsx` so it applies to the whole App Router tree:

```tsx
<Analytics />
```

## Dependency

The project now depends on:

```txt
@vercel/analytics
```

After copying this phase, run:

```bash
npm install
```

This updates `package-lock.json` locally.

## Validation

Run:

```bash
npm run lint
npm run build
```

Then deploy to Vercel and validate:

```txt
https://juantzun.dev
https://juantzun.dev/en
https://juantzun.dev/es
```

Analytics events should appear in the Vercel dashboard after production traffic starts reaching the deployed site.

## Notes

Vercel Analytics is intentionally separated from custom analytics.

Vercel Analytics gives general traffic metrics. Custom business events, such as project clicks and CV downloads, will be tracked in later phases.
