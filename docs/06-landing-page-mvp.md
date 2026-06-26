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
- A professional README replacing the default `create-next-app` README.

## Components

- `components/Header.tsx`
- `components/ProjectCard.tsx`
- `components/ProjectGrid.tsx`
- `components/Footer.tsx`

## Data Source

Project information starts as static data to keep the initial version simple, cheap to run, and easy to deploy.

After the i18n foundation, project data is split into two responsibilities:

```txt
data/projects.ts
```

Stores technical metadata:

- Slug
- Title
- Stack
- Live demo URL
- Optional GitHub URL
- Status key

```txt
i18n/messages/es.json
i18n/messages/en.json
```

Stores visible copy:

- Project descriptions
- Project highlights
- Status labels
- UI labels

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

Project cards currently use a clean visual placeholder.

Real screenshots can be added later without changing the project catalog shape.

## Next Steps

Recommended follow-up phases:

1. Add real project screenshots.
2. Add the final CV PDF.
3. Deploy the portfolio to Vercel.
4. Add Vercel Analytics.
5. Add Supabase click tracking.
6. Replace placeholders with case-study style project detail pages if needed.
