# TRP Booking Project Card

## Objective

Add TRP Booking to the portfolio project grid as a real product card positioned immediately after TAMIAS.

## Source Repository

```txt
https://github.com/Juanjho120/trp-booking
```

The repository remains private from the portfolio UI perspective. The project card links only to the live demo because the portfolio project repositories are not intended to be exposed as card actions.

## Live Demo

```txt
https://trp-booking.juantzun.dev/
```

## Card Placement

The project is inserted immediately after TAMIAS in `data/projects.ts` so the portfolio order becomes:

```txt
1. TAMIAS
2. TRP Booking
3. KnowledgeHub AI
4. Election Analytics Platform
5. DevFlow
6. MCP Agent Marketplace
7. SQL Performance Lab
8. Proteus 2.0
```

## Card Scope

The card presents TRP Booking as a direct booking website and booking engine for Tu Refugio Perfecto. The portfolio copy focuses on the public reservation flow, payment flow, Airbnb iCal synchronization, bilingual transactional emails, and the minimal admin surface required by the booking experience.

## Stack

The portfolio card lists the technologies currently relevant to the TRP Booking implementation:

```txt
Next.js
TypeScript
React
Prisma
Supabase
Auth.js
Cloudinary
Resend
Tailwind CSS
Vercel
Tilopay
```

## Card Actions

Visible project card actions are intentionally limited to:

```txt
Live Demo
```

GitHub buttons are not rendered for project cards because portfolio projects are treated as private implementation work.

## Files Updated

```txt
data/projects.ts
data/tech-icons.ts
i18n/messages/en.json
i18n/messages/es.json
public/images/projects/trp-booking.png
public/images/tech/nextjs.svg
public/images/tech/typescript.svg
public/images/tech/prisma.svg
public/images/tech/supabase.svg
public/images/tech/authjs.svg
public/images/tech/cloudinary.svg
public/images/tech/resend.svg
public/images/tech/tailwind-css.svg
public/images/tech/vercel.svg
public/images/tech/tilopay.svg
docs/03-projects-catalog.md
docs/27-trp-booking-project-card.md
README.md
```
