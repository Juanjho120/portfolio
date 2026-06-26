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
    energyDelay: 0.15,
  },
  {
    id: "react",
    label: "React",
    iconSrc: "/images/tech/react.svg",
    accent: "#22d3ee",
    accentRgb: "34 211 238",
    desktop: { x: 46, y: 14, size: 84 },
    mobile: { x: 72, y: 18, size: 48 },
    energyDelay: 1.55,
  },
  {
    id: "spring-boot",
    label: "Spring Boot",
    iconSrc: "/images/tech/spring-boot.svg",
    accent: "#6db33f",
    accentRgb: "109 179 63",
    desktop: { x: 78, y: 17, size: 76 },
    mobile: { x: 18, y: 76, size: 46 },
    energyDelay: 2.85,
  },
  {
    id: "angular",
    label: "Angular",
    iconSrc: "/images/tech/angular.svg",
    accent: "#dd0031",
    accentRgb: "221 0 49",
    desktop: { x: 13, y: 46, size: 68 },
    energyDelay: 4.15,
  },
  {
    id: "postgresql",
    label: "PostgreSQL",
    iconSrc: "/images/tech/postgresql.svg",
    accent: "#336791",
    accentRgb: "51 103 145",
    desktop: { x: 88, y: 45, size: 72 },
    mobile: { x: 78, y: 72, size: 48 },
    energyDelay: 5.45,
  },
  {
    id: "ai",
    label: "AI",
    iconSrc: "/images/tech/ai.svg",
    accent: "#8b5cf6",
    accentRgb: "139 92 246",
    desktop: { x: 24, y: 72, size: 66 },
    mobile: { x: 50, y: 50, size: 50 },
    energyDelay: 6.75,
  },
  {
    id: "chroma",
    label: "Chroma",
    iconSrc: "/images/tech/chroma.svg",
    accent: "#facc15",
    accentRgb: "250 204 21",
    desktop: { x: 48, y: 76, size: 62 },
    energyDelay: 8.05,
  },
  {
    id: "datadog",
    label: "Datadog",
    iconSrc: "/images/tech/datadog.svg",
    accent: "#632ca6",
    accentRgb: "99 44 166",
    desktop: { x: 68, y: 70, size: 66 },
    energyDelay: 9.35,
  },
  {
    id: "docker",
    label: "Docker",
    iconSrc: "/images/tech/docker.svg",
    accent: "#1d9bf0",
    accentRgb: "29 155 240",
    desktop: { x: 87, y: 76, size: 68 },
    energyDelay: 10.65,
  },
];

export const desktopPcbTraces: PcbTrace[] = [
  {
    id: "java-react",
    d: "M108 152 H270 V112 H552",
    delay: 0,
    duration: animationCycleSeconds,
  },
  {
    id: "react-spring",
    d: "M552 112 H720 V136 H936",
    delay: 1.35,
    duration: animationCycleSeconds,
  },
  {
    id: "java-angular-ai",
    d: "M108 152 V260 H156 V368 H230 V576 H288",
    delay: 3.85,
    duration: animationCycleSeconds,
  },
  {
    id: "angular-chroma",
    d: "M156 368 H360 V608 H576",
    delay: 4.05,
    duration: animationCycleSeconds,
  },
  {
    id: "chroma-datadog-docker",
    d: "M576 608 H700 V560 H816 H930 V608 H1044",
    delay: 7.85,
    duration: animationCycleSeconds,
  },
  {
    id: "spring-postgres-docker",
    d: "M936 136 H1044 V360 H1056 V608 H1044",
    delay: 2.65,
    duration: animationCycleSeconds,
  },
  {
    id: "react-postgres",
    d: "M552 112 V248 H760 V360 H1056",
    delay: 4.95,
    duration: animationCycleSeconds,
  },
  {
    id: "ai-datadog",
    d: "M288 576 H470 V672 H816 V560",
    delay: 6.55,
    duration: animationCycleSeconds,
  },
  {
    id: "top-left-bus",
    d: "M36 80 H150 V52 H286 V80 H360",
    delay: 9.4,
    duration: animationCycleSeconds,
    opacity: 0.46,
  },
  {
    id: "top-right-bus",
    d: "M805 64 H940 V88 H1128",
    delay: 10.9,
    duration: animationCycleSeconds,
    opacity: 0.46,
  },
  {
    id: "bottom-bus",
    d: "M64 690 H230 V660 H410 V690 H590 V660 H780 V688 H1120",
    delay: 12.2,
    duration: animationCycleSeconds,
    opacity: 0.44,
  },
  {
    id: "center-spine",
    d: "M520 112 V238 H612 V354 H520 V484 H610 V608",
    delay: 13.1,
    duration: animationCycleSeconds,
    opacity: 0.52,
  },
];

export const mobilePcbTraces: PcbTrace[] = [
  {
    id: "mobile-java-react",
    d: "M160 137 H420 V137 H720",
    delay: 0,
    duration: animationCycleSeconds,
  },
  {
    id: "mobile-java-ai",
    d: "M160 137 V295 H500 V380",
    delay: 1.7,
    duration: animationCycleSeconds,
  },
  {
    id: "mobile-ai-postgres",
    d: "M500 380 H700 V547 H780",
    delay: 3.4,
    duration: animationCycleSeconds,
  },
  {
    id: "mobile-ai-spring",
    d: "M500 380 H180 V578",
    delay: 5.1,
    duration: animationCycleSeconds,
  },
  {
    id: "mobile-lower-bus",
    d: "M100 650 H290 V610 H520 V650 H880",
    delay: 6.8,
    duration: animationCycleSeconds,
    opacity: 0.48,
  },
  {
    id: "mobile-top-bus",
    d: "M82 82 H240 V54 H520 V82 H920",
    delay: 8.5,
    duration: animationCycleSeconds,
    opacity: 0.48,
  },
];

export const pcbNodes: PcbNode[] = [
  { id: "java-pad", x: 108, y: 152, r: 3.6 },
  { id: "react-pad", x: 552, y: 112, r: 3.8 },
  { id: "spring-pad", x: 936, y: 136, r: 3.6 },
  { id: "angular-pad", x: 156, y: 368, r: 3.3 },
  { id: "postgres-pad", x: 1056, y: 360, r: 3.5 },
  { id: "ai-pad", x: 288, y: 576, r: 3.2 },
  { id: "chroma-pad", x: 576, y: 608, r: 3.1 },
  { id: "datadog-pad", x: 816, y: 560, r: 3.2 },
  { id: "docker-pad", x: 1044, y: 608, r: 3.3 },
  { id: "n1", x: 270, y: 112 },
  { id: "n2", x: 720, y: 136 },
  { id: "n3", x: 230, y: 576 },
  { id: "n4", x: 700, y: 560 },
  { id: "n5", x: 1044, y: 360 },
  { id: "n6", x: 760, y: 360 },
  { id: "n7", x: 410, y: 690 },
  { id: "n8", x: 610, y: 608 },
  { id: "n9", x: 1128, y: 88 },
  { id: "n10", x: 36, y: 80 },
  { id: "n11", x: 520, y: 354 },
  { id: "n12", x: 1120, y: 688 },
];
