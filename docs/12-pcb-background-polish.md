# Phase 5.3 - PCB Background Polish

## Status

Completed.

## Goal

Polish the animated PCB background introduced in Phase 5.2 so it feels closer to the approved concept preview without changing the overall portfolio content.

## User feedback addressed

- The background density, chip sizes, path visibility, energy visibility, color palette, and mobile behavior were acceptable.
- The chips did not visibly illuminate when the energy reached them.
- The PCB paths did not feel physically connected to the chips.
- The chip pins looked like small white dots instead of real microchip legs.
- The final visual needed to feel closer to the PCB storyboard preview.

## Implementation notes

### Chip illumination

Chip illumination is now more noticeable and synchronized with the same energy cycle used by the animated traces.

The animation affects:

- the chip wrapper glow,
- the chip core border,
- the chip core internal bloom,
- the technology logo glow,
- and the chip pins.

This makes each chip visibly react when the energy pulse reaches it.

### PCB path alignment

Desktop paths were redrawn to terminate directly under the corresponding chip positions. This creates the impression that traces connect into the microchip bodies and their pins.

The layout keeps the existing chip scale and distribution but improves the visual relationship between:

- Java and React,
- React and Spring Boot,
- Java, Angular and AI,
- Angular and Chroma,
- Chroma, Datadog and Docker,
- Spring Boot, PostgreSQL and Docker,
- React and PostgreSQL,
- AI and Datadog.

### Microchip pins

The previous dot-like top and bottom decoration was replaced with proper chip-leg styling on all four sides:

- left pins,
- right pins,
- top pins,
- bottom pins.

Pins also glow when the chip is energized.

### Mobile

The mobile layout remains simplified and keeps the same set of visible chips introduced in Phase 5.2:

- Java,
- React,
- Spring Boot,
- PostgreSQL,
- AI.

Mobile chip pins are slightly smaller so the background remains decorative and does not compete with content.

### Accessibility and performance

The background remains decorative and non-interactive:

```txt
aria-hidden="true"
pointer-events: none
```

The implementation continues to respect reduced motion preferences:

```css
@media (prefers-reduced-motion: reduce)
```

## Files changed

```txt
app/globals.css
data/pcb-background.ts
docs/01-roadmap.md
docs/12-pcb-background-polish.md
README.md
```
