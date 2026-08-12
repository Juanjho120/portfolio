# Project Card Action Alignment

## Objective

Align project card actions so every `Live Demo` button stays at the bottom of the card instead of appearing immediately after the project description or variable-length content.

## Changes

- Keep `ProjectCard` as a full-height flex column.
- Move the action row to the bottom using `mt-auto`.
- Keep one visible action per card: `Live Demo`.
- Remove project-level GitHub buttons from the UI.
- Remove `githubUrl` from project metadata because the portfolio projects are private.
- Keep project image clicks and live demo button clicks tracked as `Project Demo Click`.

## Files Updated

```txt
components/ProjectCard.tsx
components/ProjectGrid.tsx
data/projects.ts
README.md
docs/01-roadmap.md
docs/05-analytics-plan.md
docs/18-custom-event-tracking-foundation.md
docs/27-trp-booking-project-card.md
docs/28-project-card-action-alignment.md
```

## Validation

Run:

```bash
npm run lint
npm run build
```

Visual checks:

```txt
/en
/es
```

Confirm that:

- All cards keep the `Live Demo` button aligned near the bottom.
- TRP Booking no longer shows a GitHub button.
- No project card shows a GitHub button.
- Project image clicks still open the live demo.
- Live Demo button clicks still open the live demo.
