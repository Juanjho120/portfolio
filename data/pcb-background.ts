export type PcbChip = {
  id: string;
  label: string;
  iconSrc: string;
  accent: string;
  accentRgb: string;
  desktop: {
    x: number;
    y: number;
    size: number;
  };
  mobile?: {
    x: number;
    y: number;
    size: number;
  };
  energyDelay: number;
};

export type PcbTrace = {
  id: string;
  d: string;
  delay: number;
  duration: number;
  opacity?: number;
};

export type PcbNode = {
  id: string;
  x: number;
  y: number;
  r?: number;
};

const animationCycleSeconds = 14;

export const pcbChips: PcbChip[] = [
  {
    id: "java",
    label: "Java",
    iconSrc: "/images/hero-stats/java.svg",
    accent: "#f97316",
    accentRgb: "249 115 22",
    desktop: { x: 9, y: 19, size: 78 },
    mobile: { x: 16, y: 18, size: 46 },
    energyDelay: 0,
  },
  {
    id: "react",
    label: "React",
    iconSrc: "/images/tech/react.svg",
    accent: "#22d3ee",
    accentRgb: "34 211 238",
    desktop: { x: 46, y: 14, size: 84 },
    mobile: { x: 72, y: 18, size: 48 },
    energyDelay: 1.2,
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    iconSrc: "/images/tech/spring-boot.svg",
    accent: "#6db33f",
    accentRgb: "109 179 63",
    desktop: { x: 78, y: 17, size: 76 },
    mobile: { x: 18, y: 76, size: 46 },
    energyDelay: 2.45,
  },
  {
    id: "angular",
    label: "Angular",
    iconSrc: "/images/tech/angular.svg",
    accent: "#dd0031",
    accentRgb: "221 0 49",
    desktop: { x: 13, y: 46, size: 68 },
    energyDelay: 3.55,
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    iconSrc: "/images/tech/postgresql.svg",
    accent: "#336791",
    accentRgb: "51 103 145",
    desktop: { x: 88, y: 45, size: 72 },
    mobile: { x: 78, y: 72, size: 48 },
    energyDelay: 5.05,
  },
  {
    id: "ai",
    label: "AI",
    iconSrc: "/images/tech/ai.svg",
    accent: "#8b5cf6",
    accentRgb: "139 92 246",
    desktop: { x: 24, y: 72, size: 66 },
    mobile: { x: 50, y: 50, size: 50 },
    energyDelay: 6.15,
  },
  {
    id: "chroma",
    label: "Chroma",
    iconSrc: "/images/tech/chroma.svg",
    accent: "#facc15",
    accentRgb: "250 204 21",
    desktop: { x: 48, y: 76, size: 62 },
    energyDelay: 7.35,
  },
  {
    id: "datadog",
    label: "Datadog",
    iconSrc: "/images/tech/datadog.svg",
    accent: "#632ca6",
    accentRgb: "99 44 166",
    desktop: { x: 68, y: 70, size: 66 },
    energyDelay: 8.45,
  },
  {
    id: "docker",
    label: "Docker",
    iconSrc: "/images/tech/docker.svg",
    accent: "#1d9bf0",
    accentRgb: "29 155 240",
    desktop: { x: 87, y: 76, size: 68 },
    energyDelay: 9.45,
  },
];

export const desktopPcbTraces: PcbTrace[] = [
  {
    id: "java-react",
    d: "M108 152 L228 152 L268 112 L552 112",
    delay: 0,
    duration: animationCycleSeconds,
  },
  {
    id: "react-spring",
    d: "M552 112 L680 112 L720 152 L820 152 L856 136 L936 136",
    delay: 1.1,
    duration: animationCycleSeconds,
  },
  {
    id: "java-angular-ai",
    d: "M108 152 L108 248 L148 288 L148 368 L220 368 L260 408 L260 548 L288 576",
    delay: 2.9,
    duration: animationCycleSeconds,
  },
  {
    id: "angular-chroma",
    d: "M156 368 L276 368 L316 408 L316 568 L356 608 L576 608",
    delay: 3.45,
    duration: animationCycleSeconds,
  },
  {
    id: "chroma-datadog-docker",
    d: "M576 608 L676 608 L724 560 L816 560 L892 560 L940 608 L1044 608",
    delay: 7.05,
    duration: animationCycleSeconds,
  },
  {
    id: "spring-postgres-docker",
    d: "M936 136 L1016 136 L1056 176 L1056 360 L1056 460 L1016 500 L1016 580 L1044 608",
    delay: 2.35,
    duration: animationCycleSeconds,
  },
  {
    id: "react-postgres",
    d: "M552 112 L552 228 L592 268 L760 268 L800 308 L1056 308 L1056 360",
    delay: 4.2,
    duration: animationCycleSeconds,
  },
  {
    id: "ai-datadog",
    d: "M288 576 L420 576 L468 624 L676 624 L740 560 L816 560",
    delay: 6.05,
    duration: animationCycleSeconds,
  },
  {
    id: "java-upper-bus",
    d: "M36 82 L156 82 L196 42 L338 42 L378 82 L472 82",
    delay: 9.15,
    duration: animationCycleSeconds,
    opacity: 0.52,
  },
  {
    id: "react-top-data-bus",
    d: "M430 58 L522 58 L562 98 L638 98 L678 58 L790 58",
    delay: 10.1,
    duration: animationCycleSeconds,
    opacity: 0.54,
  },
  {
    id: "spring-right-bus",
    d: "M860 62 L964 62 L1004 102 L1136 102",
    delay: 10.85,
    duration: animationCycleSeconds,
    opacity: 0.5,
  },
  {
    id: "angular-left-bus",
    d: "M34 330 L86 330 L126 370 L156 370 L198 412 L252 412",
    delay: 11.35,
    duration: animationCycleSeconds,
    opacity: 0.5,
  },
  {
    id: "postgres-right-bus",
    d: "M1056 360 L1110 360 L1150 400 L1150 492 L1110 532 L1056 532",
    delay: 5.0,
    duration: animationCycleSeconds,
    opacity: 0.56,
  },
  {
    id: "ai-lower-left-bus",
    d: "M64 708 L206 708 L246 668 L396 668 L436 628 L520 628",
    delay: 12.05,
    duration: animationCycleSeconds,
    opacity: 0.52,
  },
  {
    id: "bottom-power-bus",
    d: "M420 720 L552 720 L592 680 L748 680 L788 720 L1118 720",
    delay: 12.75,
    duration: animationCycleSeconds,
    opacity: 0.54,
  },
  {
    id: "center-spine-diagonal",
    d: "M552 112 L552 226 L612 286 L612 396 L552 456 L552 548 L612 608",
    delay: 13.2,
    duration: animationCycleSeconds,
    opacity: 0.5,
  },
  {
    id: "chroma-side-branch",
    d: "M576 608 L576 522 L616 482 L740 482 L780 522 L816 560",
    delay: 7.5,
    duration: animationCycleSeconds,
    opacity: 0.5,
  },
];

export const mobilePcbTraces: PcbTrace[] = [
  {
    id: "mobile-java-react",
    d: "M160 137 L330 137 L370 97 L620 97 L720 137",
    delay: 0,
    duration: animationCycleSeconds,
  },
  {
    id: "mobile-java-ai",
    d: "M160 137 L160 270 L205 315 L455 315 L500 360 L500 380",
    delay: 1.45,
    duration: animationCycleSeconds,
  },
  {
    id: "mobile-ai-postgres",
    d: "M500 380 L620 380 L665 425 L665 502 L710 547 L780 547",
    delay: 3.25,
    duration: animationCycleSeconds,
  },
  {
    id: "mobile-ai-spring",
    d: "M500 380 L360 380 L315 425 L225 425 L180 470 L180 578",
    delay: 4.9,
    duration: animationCycleSeconds,
  },
  {
    id: "mobile-lower-bus",
    d: "M92 650 L250 650 L290 610 L480 610 L520 650 L880 650",
    delay: 6.8,
    duration: animationCycleSeconds,
    opacity: 0.5,
  },
  {
    id: "mobile-top-bus",
    d: "M82 82 L240 82 L280 42 L520 42 L560 82 L920 82",
    delay: 8.5,
    duration: animationCycleSeconds,
    opacity: 0.5,
  },
  {
    id: "mobile-center-branch",
    d: "M500 380 L500 260 L548 212 L720 212",
    delay: 9.8,
    duration: animationCycleSeconds,
    opacity: 0.46,
  },
];

export const pcbNodes: PcbNode[] = [
  { id: "java-pad", x: 108, y: 152, r: 4.2 },
  { id: "react-pad", x: 552, y: 112, r: 4.4 },
  { id: "spring-pad", x: 936, y: 136, r: 4.2 },
  { id: "angular-pad", x: 156, y: 368, r: 4 },
  { id: "postgres-pad", x: 1056, y: 360, r: 4.2 },
  { id: "ai-pad", x: 288, y: 576, r: 4 },
  { id: "chroma-pad", x: 576, y: 608, r: 3.8 },
  { id: "datadog-pad", x: 816, y: 560, r: 4 },
  { id: "docker-pad", x: 1044, y: 608, r: 4.2 },
  { id: "n1", x: 228, y: 152, r: 3.2 },
  { id: "n2", x: 268, y: 112, r: 3.2 },
  { id: "n3", x: 720, y: 152, r: 3.1 },
  { id: "n4", x: 856, y: 136, r: 3.1 },
  { id: "n5", x: 148, y: 288, r: 3.1 },
  { id: "n6", x: 260, y: 408, r: 3.1 },
  { id: "n7", x: 356, y: 608, r: 3.2 },
  { id: "n8", x: 724, y: 560, r: 3.2 },
  { id: "n9", x: 940, y: 608, r: 3.2 },
  { id: "n10", x: 1056, y: 176, r: 3.1 },
  { id: "n11", x: 1016, y: 500, r: 3.1 },
  { id: "n12", x: 592, y: 268, r: 3.2 },
  { id: "n13", x: 800, y: 308, r: 3.2 },
  { id: "n14", x: 468, y: 624, r: 3.1 },
  { id: "n15", x: 740, y: 560, r: 3.1 },
  { id: "n16", x: 196, y: 42, r: 2.8 },
  { id: "n17", x: 378, y: 82, r: 2.8 },
  { id: "n18", x: 562, y: 98, r: 2.8 },
  { id: "n19", x: 678, y: 58, r: 2.8 },
  { id: "n20", x: 1004, y: 102, r: 2.8 },
  { id: "n21", x: 126, y: 370, r: 2.8 },
  { id: "n22", x: 1150, y: 400, r: 2.8 },
  { id: "n23", x: 246, y: 668, r: 2.8 },
  { id: "n24", x: 592, y: 680, r: 2.8 },
  { id: "n25", x: 788, y: 720, r: 2.8 },
  { id: "n26", x: 612, y: 286, r: 2.8 },
  { id: "n27", x: 552, y: 456, r: 2.8 },
  { id: "n28", x: 616, y: 482, r: 2.8 },
  { id: "n29", x: 780, y: 522, r: 2.8 },
];
