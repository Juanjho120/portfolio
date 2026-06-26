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

export const pcbChips: PcbChip[] = [
  {
    id: "java",
    label: "Java",
    iconSrc: "/images/hero-stats/java.svg",
    accent: "#f97316",
    accentRgb: "249 115 22",
    desktop: { x: 9, y: 19, size: 78 },
    mobile: { x: 16, y: 18, size: 46 },
    energyDelay: 0.4,
  },
  {
    id: "react",
    label: "React",
    iconSrc: "/images/tech/react.svg",
    accent: "#22d3ee",
    accentRgb: "34 211 238",
    desktop: { x: 46, y: 14, size: 84 },
    mobile: { x: 72, y: 18, size: 48 },
    energyDelay: 1.9,
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    iconSrc: "/images/tech/spring-boot.svg",
    accent: "#6db33f",
    accentRgb: "109 179 63",
    desktop: { x: 78, y: 17, size: 76 },
    mobile: { x: 18, y: 76, size: 46 },
    energyDelay: 3.3,
  },
  {
    id: "angular",
    label: "Angular",
    iconSrc: "/images/tech/angular.svg",
    accent: "#dd0031",
    accentRgb: "221 0 49",
    desktop: { x: 13, y: 46, size: 68 },
    energyDelay: 4.8,
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    iconSrc: "/images/tech/postgresql.svg",
    accent: "#336791",
    accentRgb: "51 103 145",
    desktop: { x: 88, y: 45, size: 72 },
    mobile: { x: 78, y: 72, size: 48 },
    energyDelay: 6.1,
  },
  {
    id: "ai",
    label: "AI",
    iconSrc: "/images/tech/ai.svg",
    accent: "#8b5cf6",
    accentRgb: "139 92 246",
    desktop: { x: 24, y: 72, size: 66 },
    mobile: { x: 50, y: 50, size: 50 },
    energyDelay: 7.6,
  },
  {
    id: "chroma",
    label: "Chroma",
    iconSrc: "/images/tech/chroma.svg",
    accent: "#facc15",
    accentRgb: "250 204 21",
    desktop: { x: 48, y: 76, size: 62 },
    energyDelay: 9.1,
  },
  {
    id: "datadog",
    label: "Datadog",
    iconSrc: "/images/tech/datadog.svg",
    accent: "#632ca6",
    accentRgb: "99 44 166",
    desktop: { x: 68, y: 70, size: 66 },
    energyDelay: 10.4,
  },
  {
    id: "docker",
    label: "Docker",
    iconSrc: "/images/tech/docker.svg",
    accent: "#1d9bf0",
    accentRgb: "29 155 240",
    desktop: { x: 87, y: 76, size: 68 },
    energyDelay: 11.9,
  },
];

export const desktopPcbTraces: PcbTrace[] = [
  {
    id: "java-react",
    d: "M70 150 H190 V96 H400 H540",
    delay: 0,
    duration: 7.4,
  },
  {
    id: "react-spring",
    d: "M600 110 H760 V136 H940",
    delay: 1.2,
    duration: 6.8,
  },
  {
    id: "java-angular-ai",
    d: "M112 190 V300 H172 V420 H292 V576",
    delay: 2.1,
    duration: 8.6,
  },
  {
    id: "angular-chroma",
    d: "M160 370 H310 V604 H520",
    delay: 3.4,
    duration: 7.1,
  },
  {
    id: "chroma-datadog-docker",
    d: "M560 612 H724 V560 H830 V612 H1010",
    delay: 4.6,
    duration: 8.2,
  },
  {
    id: "spring-postgres-docker",
    d: "M960 162 H1072 V322 H1012 V416 H1080 V612 H1010",
    delay: 5.7,
    duration: 9.1,
  },
  {
    id: "react-postgres",
    d: "M590 145 V248 H740 V302 H900 V360 H1045",
    delay: 6.3,
    duration: 7.8,
  },
  {
    id: "ai-datadog",
    d: "M300 590 H440 V650 H720",
    delay: 8.1,
    duration: 6.2,
  },
  {
    id: "top-left-bus",
    d: "M36 80 H150 V52 H286 V80 H360",
    delay: 9.4,
    duration: 9.6,
    opacity: 0.55,
  },
  {
    id: "top-right-bus",
    d: "M805 64 H940 V88 H1128",
    delay: 10.9,
    duration: 7.8,
    opacity: 0.55,
  },
  {
    id: "bottom-bus",
    d: "M64 690 H230 V660 H410 V690 H590 V660 H780 V688 H1120",
    delay: 12.2,
    duration: 11.4,
    opacity: 0.5,
  },
  {
    id: "center-spine",
    d: "M520 104 V238 H612 V354 H520 V484 H610 V606",
    delay: 13.1,
    duration: 9.2,
    opacity: 0.6,
  },
];

export const mobilePcbTraces: PcbTrace[] = [
  {
    id: "mobile-java-react",
    d: "M150 145 H420 V132 H720",
    delay: 0,
    duration: 6.8,
  },
  {
    id: "mobile-java-ai",
    d: "M145 170 V300 H470 V405",
    delay: 1.7,
    duration: 7.4,
  },
  {
    id: "mobile-ai-postgres",
    d: "M500 410 H720 V560 H830",
    delay: 3.4,
    duration: 7,
  },
  {
    id: "mobile-ai-spring",
    d: "M465 405 H210 V570",
    delay: 5.1,
    duration: 6.6,
  },
  {
    id: "mobile-lower-bus",
    d: "M100 650 H290 V610 H520 V650 H880",
    delay: 6.8,
    duration: 8.8,
  },
  {
    id: "mobile-top-bus",
    d: "M82 82 H240 V54 H520 V82 H920",
    delay: 8.5,
    duration: 8.2,
    opacity: 0.55,
  },
];

export const pcbNodes: PcbNode[] = [
  { id: "n1", x: 190, y: 96 },
  { id: "n2", x: 760, y: 136 },
  { id: "n3", x: 172, y: 420 },
  { id: "n4", x: 724, y: 560 },
  { id: "n5", x: 1072, y: 322 },
  { id: "n6", x: 740, y: 302 },
  { id: "n7", x: 410, y: 690 },
  { id: "n8", x: 610, y: 606 },
  { id: "n9", x: 1128, y: 88 },
  { id: "n10", x: 36, y: 80 },
  { id: "n11", x: 520, y: 354 },
  { id: "n12", x: 1120, y: 688 },
];
