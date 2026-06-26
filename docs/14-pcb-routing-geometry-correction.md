# Phase 5.5 - PCB Routing Geometry Correction

This phase corrects the animated PCB background geometry using the ZIP state provided by Juan.

## Scope

The change focuses only on PCB routing correctness and visual synchronization:

- Redraw traces so routes use straight segments with 45-degree chamfers.
- Remove decorative route crossings.
- Avoid direct T-junctions and perpendicular branches.
- Route traces into chip edge pads instead of chip centers.
- Render vias as PCB-style pads with halo, ring, copper and drill hole.
- Make chip cores opaque enough to hide traces behind them.
- Keep chip sizes, mobile density and the approved dark background stable.
- Improve chip glow timing so it visually aligns better with energy arrival.

## Routing rules used

- Routes are polylines made from horizontal, vertical and diagonal 45-degree segments.
- Direction changes avoid direct 90-degree corners by using diagonal chamfers.
- Auxiliary buses stay on edges or clear lanes to avoid crossing active chip routes.
- Vias appear only at routed points, bends or pads rather than random decoration.

## Files

- `components/AnimatedPcbBackground.tsx`
- `data/pcb-background.ts`
- `app/globals.css`
