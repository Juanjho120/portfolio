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

- Add final CV PDF.
- Add real project screenshots or representative images.
- Replace current visual placeholders when each project has a good image.
- Consider adding a profile photo only if it improves the page.

Status: Pending

## Phase 6 - Deployment

- Deploy portfolio to Vercel.
- Configure `juantzun.dev`.
- Configure preview deployments.
- Configure production branch as `main`.
- Configure Cloudflare DNS records.

Status: Pending

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
