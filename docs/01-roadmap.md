# Portfolio Roadmap

## Phase 1 - Base Setup

- Create Next.js project.
- Configure TypeScript.
- Configure Tailwind CSS.
- Configure import alias `@/*`.
- Add AGENTS.md.
- Push initial setup to GitHub.

Status: Completed

## Phase 2 - Documentation Foundation

- Add `/docs` folder.
- Document project context.
- Document architecture.
- Document project catalog.
- Document deployment and domains.
- Document analytics plan.

Status: Completed

## Phase 3 - Landing Page MVP

- Build header section.
- Add professional summary.
- Add contact links.
- Add CV download button.
- Add project cards.
- Add responsive layout.
- Replace default README with a portfolio-specific README.

Status: Completed

## Phase 4 - English/Spanish i18n Foundation

- Add locale routes for `/es` and `/en`.
- Redirect `/` to the default locale `/en`.
- Add JSON dictionaries for Spanish and English.
- Add an internal dictionary loader.
- Add a language switcher.
- Move visible UI copy out of page/components and into dictionaries.
- Keep technical project metadata centralized in `data/projects.ts`.
- Move translated project descriptions and highlights into dictionaries.
- Add locale-aware metadata.
- Update documentation for the bilingual structure.

Status: Completed

## Phase 5 - Visual Assets and CV

- Add the final CV PDF under `public/cv/Juan_Tzun_CV.pdf`.
- Add representative project visuals under `public/images/projects`.
- Render project visuals in each project card.
- Keep project images clickable so they open each live demo.
- Add translated image alt text for accessibility.
- Document the visual asset naming and replacement strategy.

Status: Completed

## Phase 5.1 - Tech Stack Badges

- Add local SVG icons for the technologies used in the project cards.
- Add a centralized technology icon mapping.
- Render technology badges with icon plus technology name.
- Keep badges readable in light and dark mode.
- Keep unknown technologies working as text-only badges.

Status: Completed

## Phase 5.2 - Animated PCB Background

- Add a global animated PCB-style background.
- Use responsive desktop and mobile PCB layouts.
- Represent key technologies as microchip components.
- Animate energy pulses through PCB paths.
- Illuminate chips when the energy reaches them.
- Respect `prefers-reduced-motion` for accessibility.
- Keep the background decorative with `aria-hidden` and `pointer-events: none`.

Status: Completed

## Phase 5.3 - PCB Background Polish

- Make chip illumination more visible when energy reaches each chip.
- Redraw PCB paths so they visually connect to chip positions.
- Replace dot-like decorations with proper microchip pins.
- Keep the approved background density, chip size, path visibility, colors and mobile behavior.
- Document the polish decisions.

Status: Completed

## Phase 5.4 - PCB Background Sync and Routing

- Sync chip glow more closely with energy pulse arrival.
- Replace 90-degree-looking PCB route breaks with 45-degree transitions.
- Make chip backgrounds more opaque so traces do not show through.
- Restyle random PCB nodes as proper vias.
- Add more PCB paths and auxiliary buses.
- Keep chip size, background color and mobile density stable.

Status: Completed

## Phase 5.5 - PCB Routing Geometry Correction

- Audit the PCB geometry from the ZIP state.
- Remove crossed traces and decorative T-junction routing.
- Redraw traces with 45-degree chamfers.
- Connect traces to chip edge pads instead of chip centers.
- Render vias as PCB-style pads with ring/copper/drill-hole structure.
- Improve chip glow timing against energy-pulse travel.

Status: Completed

## Phase 5.6 - PCB Lighting and Chip Visibility

- Make chip illumination more explicit when energy arrives.
- Reduce overall portfolio background brightness.
- Increase the AI chip logo size to match the other chips.
- Remove PCB via holes from chip-entry pins so traces enter chips cleanly.
- Keep the corrected routing geometry from Phase 5.5 intact.

Status: Completed

## Phase 6 - Deployment

- Deploy portfolio to Vercel.
- Configure `juantzun.dev`.
- Configure `www.juantzun.dev`.
- Configure preview deployments.
- Configure production branch as `main`.
- Configure Cloudflare DNS records.
- Validate `/`, `/en`, `/es`, CV route, project links, desktop, mobile and accessibility behavior.
- Document rollback and smoke-test process.

Status: In Progress

## Phase 7 - Analytics

- Add Vercel Analytics.
- Add Supabase custom event tracking.
- Track project card clicks.
- Track CV downloads.
- Track external profile clicks.
- Store event locale when available.

Status: Pending

## Phase 8 - Admin Analytics Dashboard

- Create private `/admin/analytics` page.
- Show total visits.
- Show project clicks.
- Show most clicked project.
- Show latest events.
- Show metrics by locale.

Status: Pending

## Phase 9 - SEO and Polish

- Add Open Graph image.
- Add favicon.
- Add sitemap.
- Add robots.txt.
- Improve accessibility.
- Optimize images.
- Review bilingual metadata.

Status: Pending
