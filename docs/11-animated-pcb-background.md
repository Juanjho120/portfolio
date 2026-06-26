# Phase 5.2 - Animated PCB Background

## Goal

Add a premium animated PCB-style background to the portfolio without turning it into a distracting visual layer.

The background should communicate the technical stack behind the portfolio: Java, React, Spring Boot, Angular, PostgreSQL, AI, Chroma, Datadog and Docker.

## Implementation

The background is implemented with:

- `components/AnimatedPcbBackground.tsx`
- `data/pcb-background.ts`
- CSS animations in `app/globals.css`

No external animation library is used.

## Design Rules

- The background is decorative only.
- The center area stays calmer to preserve readability.
- Desktop uses the full technology network.
- Mobile uses a simplified version with fewer chips.
- PCB traces use teal/cyan energy paths.
- Chips use colors aligned with each technology.
- When energy reaches a chip, the chip briefly lights up.
- The layer uses `pointer-events: none`.
- The layer uses `aria-hidden="true"`.

## Responsive Behavior

### Desktop

Desktop shows the full network:

- Java
- React
- Spring Boot
- Angular
- PostgreSQL
- AI
- Chroma
- Datadog
- Docker

### Mobile

Mobile keeps only the most important decorative chips:

- Java
- React
- Spring Boot
- PostgreSQL
- AI

Mobile hides chip labels and reduces PCB density.

## Accessibility

The background respects `prefers-reduced-motion`.

When reduced motion is enabled:

- Energy path animation is disabled.
- Chip pulse animation is disabled.
- The PCB remains as a static decorative background.

## Performance Notes

The animation is CSS-driven and uses SVG paths, not videos or GIFs.

The background is mounted once in `app/layout.tsx`, behind all page content.
