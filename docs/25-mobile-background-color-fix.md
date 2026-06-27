# Mobile Background Color Fix

## Objective

Keep the mobile portfolio background visually aligned with the current desktop/browser background color.

## Problem

The mobile media query applied a dark readability overlay that made the page look almost fully dark on phones, even though the desktop background already had the desired balanced PCB color.

## Changes

- Reused the balanced desktop PCB background palette for mobile.
- Replaced the mobile-only dark overlay with the same light readability veil used by desktop.
- Restored mobile PCB path visibility without changing route geometry.
- Preserved chip sizes, chip positions and page layout.

## Files

- `app/globals.css`
