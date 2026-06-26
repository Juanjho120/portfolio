export type HeroStatIcon = {
  src: string;
  label: string;
};

const heroStatIcons: Record<string, HeroStatIcon> = {
  Java: {
    src: "/images/hero-stats/java.svg",
    label: "Java logo",
  },
  Angular: {
    src: "/images/hero-stats/angular.svg",
    label: "Angular logo",
  },
  React: {
    src: "/images/hero-stats/react.svg",
    label: "React logo",
  },
  AI: {
    src: "/images/hero-stats/ai.svg",
    label: "AI logo",
  },
  IA: {
    src: "/images/hero-stats/ai.svg",
    label: "IA logo",
  },
};

export function getHeroStatIcon(stat: string): HeroStatIcon | undefined {
  return heroStatIcons[stat];
}
