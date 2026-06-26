# Landing Page MVP

## Goal

Build the first professional landing page for `juantzun.dev` using static project data and reusable UI components.

## Scope

This phase adds:

- A responsive header.
- A hero section with professional positioning.
- Contact actions.
- CV download entry point.
- Project metadata centralized in `data/projects.ts`.
- Reusable project cards.
- Responsive project grid.
- Footer with contact links.

## Components

- `components/Header.tsx`
- `components/ProjectCard.tsx`
- `components/ProjectGrid.tsx`
- `components/Footer.tsx`

## Data Source

Project information is stored in:

```txt
data/projects.ts
```

The portfolio intentionally starts with static data to keep the initial version simple, cheap to run, and easy to deploy.

## Images and CV

Prepared folders:

```txt
public/images/projects/
public/cv/
```

The CV button expects this file when ready:

```txt
public/cv/Juan_Tzun_CV.pdf
```

Project cards currently use a clean visual placeholder. Real screenshots can be added later without changing the project catalog shape.

## Next Steps

Recommended follow-up phases:

1. Add real project screenshots.
2. Add the final CV PDF.
3. Add Vercel Analytics.
4. Add Supabase click tracking.
5. Replace placeholders with case-study style project detail pages if needed.
