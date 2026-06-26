# Phase 5.4 - PCB Background Sync and Routing

Status: Completed

## Goal

Refine the animated PCB background after visual testing so the animation feels closer to the approved concept preview.

## Changes

- Reworked the desktop PCB traces to use 45-degree routing transitions instead of hard 90-degree corner routing.
- Added more PCB traces and auxiliary buses to make the background feel more like a real board network.
- Adjusted chip energy delays so chip illumination is closer to the arrival of the energy pulse on the related trace.
- Removed the chip scale/pop effect so chip illumination reads as a glow instead of movement.
- Strengthened chip illumination through border glow, inner glow, icon glow and pin glow.
- Made chip backgrounds more opaque so traces behind the chips do not show through.
- Improved chip pins so they feel more like integrated-circuit legs.
- Restyled PCB nodes as vias with a darker center and cyan ring instead of simple white dots.
- Kept the existing chip size, background color and mobile density because those were already visually acceptable.

## Implementation Notes

The background still uses SVG paths plus CSS animations. No external animation library was added.

The current synchronization is CSS-timed rather than physically computed from path length. The chip glow delay values are tuned manually in `data/pcb-background.ts` to approximate the visual arrival of the energy pulse.

## Files

```txt
app/globals.css
data/pcb-background.ts
docs/13-pcb-background-sync-and-routing.md
```

## Validation

Recommended checks:

```bash
npm run lint
npm run build
npm run dev
```

Manual checks:

```txt
/en
/es
mobile viewport
desktop viewport
prefers-reduced-motion
```
