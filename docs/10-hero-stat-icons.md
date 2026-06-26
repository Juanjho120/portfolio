# Hero Stat Icons

This phase adds dedicated icon assets for the hero technology stats.

## Decision

Hero stat icons live in:

```txt
public/images/hero-stats/
```

Project card stack icons continue to live in:

```txt
public/images/tech/
```

This separation is intentional. The hero stats use logo-only transparent SVGs so the badge background controls the visual style. The project stack badges keep their existing icon set and must not be overwritten by hero-specific assets.

## Files

- `app/[locale]/page.tsx`
- `data/hero-stat-icons.ts`
- `public/images/hero-stats/java.svg`
- `public/images/hero-stats/angular.svg`
- `public/images/hero-stats/react.svg`
- `public/images/hero-stats/ai.svg`
