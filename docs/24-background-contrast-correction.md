# Background Contrast Correction

## Objective

Balance the PCB background contrast so portfolio text stays readable without making the circuit paths disappear.

## Decision

The previous correction over-darkened the PCB layer. This pass keeps the background darker than the original bright state, but restores enough trace, via and energy visibility for the PCB concept to remain visible.

## Changes

- Keeps chip size, chip position and routing geometry unchanged.
- Restores PCB path visibility.
- Keeps the global background slightly darker and less washed out than the original version.
- Uses a lighter readability veil instead of a fully dark overlay.
- Keeps energy glow visible but controlled.
- Keeps mobile background visible without overwhelming text.

## Files

- `app/globals.css`
