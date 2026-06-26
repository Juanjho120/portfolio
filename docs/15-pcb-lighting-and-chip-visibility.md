# Phase 5.6 - PCB Lighting and Chip Visibility

## Objective
Apply a small correction pass over the Phase 5.5 PCB background to improve chip readability and visual polish without changing the routing geometry.

## Changes
- Strengthened the chip illumination state so the glow is visible on the chip body, border, icon and pins.
- Kept the chip core background opaque during the glow state so it no longer appears to disappear.
- Reduced the overall brightness of the portfolio background and readability veil.
- Increased the AI chip logo size to make it visually consistent with the other chips.
- Stopped rendering PCB vias close to chip-entry pins so traces enter the chip cleanly.

## Files
- `components/AnimatedPcbBackground.tsx`
- `app/globals.css`
- `docs/01-roadmap.md`
- `docs/15-pcb-lighting-and-chip-visibility.md`
- `README.md`
