# Phase 7B - Custom Event Tracking Foundation

## Objective

Add the first custom interaction tracking layer for the portfolio without introducing Supabase persistence yet.

This phase builds on Vercel Analytics from Phase 7A and uses client-side custom events for important user actions.

## Scope

Included:

- Add a reusable `TrackedLink` client component.
- Track project demo clicks from project image links and live demo buttons.
- Track project GitHub clicks when a GitHub URL exists.
- Track CV download clicks from the hero and footer.
- Track email/contact clicks from the hero and footer.
- Track GitHub profile clicks from the footer.
- Attach the active locale to each tracked event.
- Attach a compact target identifier to each tracked event.

Not included yet:

- Supabase persistence.
- Server-side analytics storage.
- Private analytics dashboard.
- Advanced attribution or user/session tracking.

Those items belong to Phase 7C and Phase 8.

## Files

```txt
components/TrackedLink.tsx
components/ProjectCard.tsx
components/ProjectGrid.tsx
components/Footer.tsx
app/[locale]/page.tsx
README.md
docs/01-roadmap.md
docs/05-analytics-plan.md
docs/18-custom-event-tracking-foundation.md
```

## Implementation

`components/TrackedLink.tsx` is a client component that wraps a regular anchor tag and calls Vercel Analytics `track()` before continuing normal navigation.

The component intentionally catches tracking errors so analytics can never block navigation, email links, external links or CV downloads.

## Events

```txt
Project Demo Click
Project GitHub Click
CV Download Click
External Contact Click
External Profile Click
```

## Event Properties

Each event uses a small property payload:

```txt
locale
target
```

Examples:

```txt
locale: en
target: tamias:image

locale: es
target: hero

locale: en
target: github:footer
```

This keeps the tracking payload compact while still preserving enough context for future reporting.

## Privacy Notes

This phase does not store IP addresses, exact location, user identity, fingerprints or custom session identifiers.

The goal is to measure portfolio interest, not to track individual visitors.

## Validation

Run locally:

```bash
npm run lint
npm run build
```

After deploying, validate these interactions:

```txt
- Project image click
- Project Live Demo button click
- Project GitHub button click when available
- Hero CV click
- Footer CV click
- Hero email/contact click
- Footer email/contact click
- Footer GitHub profile click
```

Vercel custom event visibility may depend on the Vercel plan and Web Analytics settings. The code should still be safe to deploy even if custom event reporting is not visible in the dashboard yet.
