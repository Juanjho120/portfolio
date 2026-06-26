import { ProjectCard } from "@/components/ProjectCard";
import type { Project, ProjectSlug, ProjectStatus } from "@/data/projects";

type ProjectGridProps = {
  projects: Project[];
  projectTexts: Record<ProjectSlug, { description: string; highlights: string[]; imageAlt: string }>;
  copy: {
    eyebrow: string;
    title: string;
    description: string;
  };
  cardLabels: {
    liveDemo: string;
    github: string;
    openDemoAriaPrefix: string;
    status: Record<ProjectStatus, string>;
  };
};

export function ProjectGrid({ projects, projectTexts, copy, cardLabels }: ProjectGridProps) {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
          {copy.eyebrow}
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          {copy.title}
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          {copy.description}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            projectText={projectTexts[project.slug]}
            labels={cardLabels}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
