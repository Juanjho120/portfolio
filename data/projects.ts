export type ProjectStatus = "active" | "inDevelopment" | "planned";

export type ProjectSlug =
  | "tamias"
  | "knowledgehub"
  | "elections"
  | "devflow"
  | "mcp"
  | "performancelab"
  | "proteus";

export type Project = {
  slug: ProjectSlug;
  title: string;
  stack: string[];
  liveDemoUrl: string;
  githubUrl?: string;
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    slug: "tamias",
    title: "TAMIAS",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "AWS S3", "Spring AI", "Chroma", "OpenAI", "Docker"],
    liveDemoUrl: "https://tamias.juantzun.dev",
    status: "inDevelopment",
  },
  {
    slug: "knowledgehub",
    title: "KnowledgeHub AI",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Docker", "Spring AI", "Ollama", "Chroma", "RAG", "OpenAI", "AWS S3"],
    liveDemoUrl: "https://knowledgehub.juantzun.dev",
    status: "planned",
  },
  {
    slug: "elections",
    title: "Election Analytics Platform",
    stack: ["Spring Batch", "Spring Cloud", "PostgreSQL", "Angular", "Docker", "Datadog"],
    liveDemoUrl: "https://elections.juantzun.dev",
    status: "planned",
  },
  {
    slug: "devflow",
    title: "DevFlow",
    stack: ["React", "Spring Boot", "PostgreSQL", "GitHub API", "Docker"],
    liveDemoUrl: "https://devflow.juantzun.dev",
    status: "planned",
  },
  {
    slug: "mcp",
    title: "MCP Agent Marketplace",
    stack: ["Spring AI", "OpenAI", "MCP", "Ollama", "Docker", "Angular"],
    liveDemoUrl: "https://mcp.juantzun.dev",
    status: "planned",
  },
  {
    slug: "performancelab",
    title: "SQL Performance Lab",
    stack: ["Spring Boot", "PostgreSQL", "OpenAI", "Angular"],
    liveDemoUrl: "https://performancelab.juantzun.dev",
    status: "planned",
  },
  {
    slug: "proteus",
    title: "Proteus 2.0",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Docker", "OpenAI"],
    liveDemoUrl: "https://proteus.juantzun.dev",
    status: "planned",
  },
];
