import Image from "next/image";
import type { CSSProperties } from "react";

import {
  desktopPcbTraces,
  mobilePcbTraces,
  pcbChips,
  pcbNodes,
} from "@/data/pcb-background";

type PcbCssProperties = CSSProperties & Record<`--${string}`, string>;

const DESKTOP_VIEWBOX_WIDTH = 1200;
const DESKTOP_VIEWBOX_HEIGHT = 800;

function cssVars(values: Record<string, string>): PcbCssProperties {
  return values as PcbCssProperties;
}

function isNodeNearChipEntry(nodeX: number, nodeY: number) {
  return pcbChips.some((chip) => {
    const chipX = (chip.desktop.x / 100) * DESKTOP_VIEWBOX_WIDTH;
    const chipY = (chip.desktop.y / 100) * DESKTOP_VIEWBOX_HEIGHT;
    const exclusionRadius = chip.desktop.size / 2 + 12;

    return Math.hypot(nodeX - chipX, nodeY - chipY) <= exclusionRadius;
  });
}

export function AnimatedPcbBackground() {
  const visiblePcbNodes = pcbNodes.filter((node) => !isNodeNearChipEntry(node.x, node.y));

  return (
    <div aria-hidden="true" className="pcb-background">
      <div className="pcb-background__grid" />
      <div className="pcb-background__readability" />

      <svg
        className="pcb-background__traces pcb-background__traces--desktop"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <g>
          {desktopPcbTraces.map((trace) => (
            <path
              key={`desktop-base-${trace.id}`}
              className="pcb-trace pcb-trace--base"
              d={trace.d}
              pathLength={100}
              style={cssVars({
                "--pcb-trace-opacity": String(trace.opacity ?? 0.72),
              })}
            />
          ))}
        </g>

        <g>
          {desktopPcbTraces.map((trace) => (
            <path
              key={`desktop-energy-${trace.id}`}
              className="pcb-trace pcb-trace--energy"
              d={trace.d}
              pathLength={100}
              style={cssVars({
                "--pcb-trace-delay": `${trace.delay}s`,
                "--pcb-trace-duration": `${trace.duration}s`,
              })}
            />
          ))}
        </g>

        <g>
          {visiblePcbNodes.map((node) => (
            <g key={node.id} className="pcb-via" transform={`translate(${node.x} ${node.y})`}>
              <circle className="pcb-via__halo" r={(node.r ?? 3) + 5.6} />
              <circle className="pcb-via__ring" r={(node.r ?? 3) + 2.8} />
              <circle className="pcb-via__copper" r={(node.r ?? 3) + 1.1} />
              <circle className="pcb-via__hole" r={Math.max(1.4, (node.r ?? 3) * 0.48)} />
            </g>
          ))}
        </g>
      </svg>

      <svg
        className="pcb-background__traces pcb-background__traces--mobile"
        viewBox="0 0 1000 760"
        preserveAspectRatio="none"
      >
        <g>
          {mobilePcbTraces.map((trace) => (
            <path
              key={`mobile-base-${trace.id}`}
              className="pcb-trace pcb-trace--base"
              d={trace.d}
              pathLength={100}
              style={cssVars({
                "--pcb-trace-opacity": String(trace.opacity ?? 0.68),
              })}
            />
          ))}
        </g>

        <g>
          {mobilePcbTraces.map((trace) => (
            <path
              key={`mobile-energy-${trace.id}`}
              className="pcb-trace pcb-trace--energy"
              d={trace.d}
              pathLength={100}
              style={cssVars({
                "--pcb-trace-delay": `${trace.delay}s`,
                "--pcb-trace-duration": `${trace.duration}s`,
              })}
            />
          ))}
        </g>
      </svg>

      <div className="pcb-background__chips">
        {pcbChips.map((chip) => (
          <div
            key={chip.id}
            className={`pcb-chip pcb-chip--${chip.id} ${
              chip.mobile ? "pcb-chip--mobile-visible" : "pcb-chip--desktop-only"
            }`}
            style={cssVars({
              "--pcb-chip-x": `${chip.desktop.x}%`,
              "--pcb-chip-y": `${chip.desktop.y}%`,
              "--pcb-chip-size": `${chip.desktop.size}px`,
              "--pcb-chip-mobile-x": `${chip.mobile?.x ?? chip.desktop.x}%`,
              "--pcb-chip-mobile-y": `${chip.mobile?.y ?? chip.desktop.y}%`,
              "--pcb-chip-mobile-size": `${chip.mobile?.size ?? chip.desktop.size}px`,
              "--pcb-chip-accent": chip.accent,
              "--pcb-chip-rgb": chip.accentRgb,
              "--pcb-chip-delay": `${chip.energyDelay}s`,
            })}
          >
            <div className="pcb-chip__core">
              <Image
                src={chip.iconSrc}
                alt=""
                width={56}
                height={56}
                className={`pcb-chip__icon ${chip.id === "ai" ? "pcb-chip__icon--ai" : ""}`.trim()}
              />
              <span className="pcb-chip__label">{chip.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
