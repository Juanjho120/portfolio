export type TechIcon = {
  src: string;
  label: string;
};

export const techIcons: Record<string, TechIcon> = {
  Java: {
    src: "/images/tech/java.svg",
    label: "Java",
  },
  Angular: {
    src: "/images/tech/angular.svg",
    label: "Angular",
  },
  "Spring Boot": {
    src: "/images/tech/spring-boot.svg",
    label: "Spring Boot",
  },
  PostgreSQL: {
    src: "/images/tech/postgresql.svg",
    label: "PostgreSQL",
  },
  "AWS S3": {
    src: "/images/tech/aws-s3.svg",
    label: "AWS S3",
  },
  "Spring AI": {
    src: "/images/tech/spring-ai.svg",
    label: "Spring AI",
  },
  Chroma: {
    src: "/images/tech/chroma.svg",
    label: "Chroma",
  },
  OpenAI: {
    src: "/images/tech/openai.svg",
    label: "OpenAI",
  },
  Docker: {
    src: "/images/tech/docker.svg",
    label: "Docker",
  },
  Ollama: {
    src: "/images/tech/ollama.svg",
    label: "Ollama",
  },
  RAG: {
    src: "/images/tech/rag.svg",
    label: "RAG",
  },
  "Spring Batch": {
    src: "/images/tech/spring-batch.svg",
    label: "Spring Batch",
  },
  "Spring Cloud": {
    src: "/images/tech/spring-cloud.svg",
    label: "Spring Cloud",
  },
  Datadog: {
    src: "/images/tech/datadog.svg",
    label: "Datadog",
  },
  React: {
    src: "/images/tech/react.svg",
    label: "React",
  },
  "GitHub API": {
    src: "/images/tech/github-api.svg",
    label: "GitHub API",
  },
  MCP: {
    src: "/images/tech/mcp.svg",
    label: "MCP",
  },
  AI: {
    src: "/images/tech/ai.svg",
    label: "AI",
  },
  IA: {
    src: "/images/tech/ai.svg",
    label: "IA",
  },
};

export function getTechIcon(tech: string): TechIcon | undefined {
  return techIcons[tech];
}
