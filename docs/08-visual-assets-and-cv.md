# Phase 5 - Visual Assets and CV

## Goal

Give the landing page a more professional visual layer without adding operational complexity or a separate backend.

This phase introduces representative project visuals, keeps the CV download path stable, and documents how assets should be named and replaced later.

## CV

The public CV lives at:

```txt
public/cv/Juan_Tzun_CV.pdf
```

The landing page links to it through:

```txt
/cv/Juan_Tzun_CV.pdf
```

The filename should remain stable so future analytics can track CV downloads without changing event logic.

## Project Images

Project images live under:

```txt
public/images/projects/
```

Current representative assets:

```txt
public/images/projects/tamias.svg
public/images/projects/knowledgehub.svg
public/images/projects/elections.svg
public/images/projects/devflow.svg
public/images/projects/mcp.svg
public/images/projects/performancelab.svg
public/images/projects/proteus.svg
```

The path for each image is stored in `data/projects.ts` as technical metadata.

Translated image alt text is stored in:

```txt
i18n/messages/en.json
i18n/messages/es.json
```

## Replacement Strategy

When real screenshots are available, replace the representative SVGs with production-quality images using the same filenames or update `imageSrc` in `data/projects.ts`.

Recommended formats:

- `.webp` for real screenshots.
- `.png` only when transparency or exact UI rendering is needed.
- `.svg` for lightweight conceptual visuals or placeholders.

Recommended dimensions:

```txt
1200x750
```

This keeps the current `16:10` project card ratio consistent.

## UX Decisions

- The image area is clickable and opens the live demo in a new tab.
- The status badge remains over the image.
- The project number and title remain over the image for quick scanning.
- Project descriptions and highlights remain below the image for readability.
- No profile photo is added in this phase.

## Future Analytics Notes

When custom tracking is implemented, these interactions should be tracked:

- Project image clicks.
- Live Demo button clicks.
- GitHub button clicks, when available.
- CV download clicks.
- Current locale for each event.
