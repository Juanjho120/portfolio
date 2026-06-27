# Background Contrast Correction

## Objective
Darken the global PCB background so foreground text remains readable on the public portfolio and the admin analytics dashboard.

## Scope
This correction intentionally changes only global background/PCB opacity styling and documentation. It does not change chip size, chip position, PCB routing geometry, analytics logic or dashboard data loading.

## Changes
- Replaced the bright readability veil with a dark opacity layer inside the decorative background.
- Lowered global background radial glow intensity.
- Reduced grid, trace, via and energy glow intensity.
- Kept chip dimensions and data-driven placement unchanged.
- Preserved `prefers-reduced-motion` behavior.

## Files
- `app/globals.css`
- `docs/01-roadmap.md`
- `docs/24-background-contrast-correction.md`
- `README.md`
