export type ProjectStatus = "Activo" | "En desarrollo" | "Planeado";

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  liveDemoUrl: string;
  githubUrl?: string;
  highlights: string[];
  status: ProjectStatus;
};

export const projects: Project[] = [
  {
    slug: "tamias",
    title: "TAMIAS",
    description:
      "Plataforma de administración operativa para alojamientos pequeños: reservas, mantenimiento, compras, inventario, documentos y asistente IA.",
    stack: [
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "AWS S3",
      "Spring AI",
      "Chroma",
      "OpenAI",
      "Docker",
    ],
    liveDemoUrl: "https://tamias.juantzun.dev",
    highlights: ["Operación de alojamientos", "IA con RAG", "Archivos privados en S3"],
    status: "En desarrollo",
  },
  {
    slug: "knowledgehub",
    title: "KnowledgeHub AI",
    description:
      "Sistema documental con IA, permisos, búsqueda semántica, RAG y chatbot sobre documentos empresariales.",
    stack: [
      "Angular",
      "Spring Boot",
      "PostgreSQL",
      "Docker",
      "Spring AI",
      "Ollama",
      "Chroma",
      "RAG",
      "OpenAI",
      "AWS S3",
    ],
    liveDemoUrl: "https://knowledgehub.juantzun.dev",
    highlights: ["Gestión documental", "Permisos", "Chatbot sobre archivos"],
    status: "Planeado",
  },
  {
    slug: "elections",
    title: "Election Analytics Platform",
    description:
      "Plataforma para procesar y visualizar datos electorales masivos con pipelines batch, dashboards y monitoreo.",
    stack: ["Spring Batch", "Spring Cloud", "PostgreSQL", "Angular", "Docker", "Datadog"],
    liveDemoUrl: "https://elections.juantzun.dev",
    highlights: ["Procesamiento masivo", "Dashboards", "Observabilidad"],
    status: "Planeado",
  },
  {
    slug: "devflow",
    title: "DevFlow",
    description:
      "Plataforma para visibilidad de deploys, pipelines, errores, incidentes y métricas de equipos de desarrollo.",
    stack: ["React", "Spring Boot", "PostgreSQL", "GitHub API", "Docker"],
    liveDemoUrl: "https://devflow.juantzun.dev",
    highlights: ["Deploy visibility", "Incidentes", "Métricas técnicas"],
    status: "Planeado",
  },
  {
    slug: "mcp",
    title: "MCP Agent Marketplace",
    description:
      "Agentes IA conectados a herramientas reales mediante MCP, pensados para automatizar flujos técnicos y operativos.",
    stack: ["Spring AI", "OpenAI", "MCP", "Ollama", "Docker", "Angular"],
    liveDemoUrl: "https://mcp.juantzun.dev",
    highlights: ["MCP real", "Agentes IA", "Herramientas conectadas"],
    status: "Planeado",
  },
  {
    slug: "performancelab",
    title: "SQL Performance Lab",
    description:
      "Laboratorio para análisis de queries SQL, planes de ejecución, recomendaciones de índices y comparación de rendimiento.",
    stack: ["Spring Boot", "PostgreSQL", "OpenAI", "Angular"],
    liveDemoUrl: "https://performancelab.juantzun.dev",
    highlights: ["Query analysis", "Índices", "Performance tuning"],
    status: "Planeado",
  },
  {
    slug: "proteus",
    title: "Proteus 2.0",
    description:
      "ERP moderno basado en un sistema real: inventario, facturación, créditos, permisos, reportes, auditoría y asistente IA.",
    stack: ["Angular", "Spring Boot", "PostgreSQL", "Docker", "OpenAI"],
    liveDemoUrl: "https://proteus.juantzun.dev",
    highlights: ["ERP", "Auditoría", "AI assistant"],
    status: "Planeado",
  },
];
