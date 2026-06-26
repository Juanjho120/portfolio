# English/Spanish i18n Foundation

## Goal

Add a simple bilingual foundation for the portfolio without introducing a separate i18n library yet.

The portfolio currently needs static Spanish and English content, so a lightweight dictionary-based approach is enough.

## Locale Routes

Supported routes:

```txt
/es
/en
```

Default route:

```txt
/ → /es
```

## Files Added

```txt
i18n/config.ts
i18n/dictionaries.ts
i18n/messages/es.json
i18n/messages/en.json
components/LanguageSwitcher.tsx
app/[locale]/layout.tsx
app/[locale]/page.tsx
```

## Files Updated

```txt
app/page.tsx
app/layout.tsx
components/Header.tsx
components/ProjectCard.tsx
components/ProjectGrid.tsx
components/Footer.tsx
data/projects.ts
README.md
docs/00-project-context.md
docs/01-roadmap.md
docs/02-architecture.md
docs/03-projects-catalog.md
docs/05-analytics-plan.md
docs/06-landing-page-mvp.md
```

## Design Decision

This phase intentionally avoids adding a dependency such as `next-intl`.

Reasons:

- The portfolio currently has a small amount of static copy.
- Locale routing can be handled directly with the App Router.
- JSON dictionaries are enough for the current scope.
- The project stays simple and cheap to maintain.
- A library can still be introduced later if the portfolio grows into many pages, blog posts, case studies, or complex localized formatting.

## Data Split

Technical project metadata stays in:

```txt
data/projects.ts
```

Translated content lives in:

```txt
i18n/messages/es.json
i18n/messages/en.json
```

This avoids duplicating URLs and stacks in each language.

## Current Translation Scope

The dictionaries include:

- Metadata title and description.
- Header labels.
- Language switcher labels.
- Hero copy.
- Hero stats.
- Project grid copy.
- Project card labels.
- Project status labels.
- Project descriptions.
- Project highlights.
- Footer labels.

## Future Notes

When analytics is implemented, event payloads should include the current locale.

Suggested values:

```txt
es
en
```

This will allow the private analytics dashboard to show which language version receives more clicks.
