import { getTechIcon } from "@/data/tech-icons";
import type { Project, ProjectStatus } from "@/data/projects";

type ProjectCardLabels = {
  liveDemo: string;
  github: string;
  openDemoAriaPrefix: string;
  status: Record<ProjectStatus, string>;
};

type ProjectText = {
  description: string;
  highlights: string[];
  imageAlt: string;
};

type ProjectCardProps = {
  project: Project;
  projectText: ProjectText;
  labels: ProjectCardLabels;
  index: number;
};

const statusBadgeStyles: Record<ProjectStatus, string> = {
  active:
    "border-emerald-200 bg-emerald-50 text-emerald-700 shadow-emerald-950/5 dark:border-emerald-800/70 dark:bg-emerald-950/80 dark:text-emerald-200",
  inDevelopment:
    "border-amber-200 bg-amber-50 text-amber-800 shadow-amber-950/5 dark:border-amber-700/70 dark:bg-amber-950/80 dark:text-amber-200",
  planned:
    "border-sky-200 bg-sky-50 text-sky-700 shadow-sky-950/5 dark:border-sky-700/70 dark:bg-sky-950/80 dark:text-sky-200",
};

export function ProjectCard({ project, projectText, labels, index }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/70">
      <a
        href={project.liveDemoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block overflow-hidden bg-slate-950 text-white"
        aria-label={`${labels.openDemoAriaPrefix} ${project.title}`}
      >
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={project.imageSrc}
            alt={projectText.imageAlt}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

        <div
          className={`absolute right-5 top-5 rounded-full border px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur ${statusBadgeStyles[project.status]}`}
        >
          {labels.status[project.status]}
        </div>

        <div className="absolute bottom-5 left-5 right-5">
          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-sky-200">
            0{index + 1}
          </span>
          <h3 className="mt-3 text-2xl font-bold tracking-tight">{project.title}</h3>
        </div>
      </a>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{projectText.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => {
            const techIcon = getTechIcon(tech);

            return (
              <span
                key={tech}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm shadow-slate-950/5 transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-200 dark:shadow-black/10 dark:hover:border-slate-600 dark:hover:bg-slate-800"
              >
                {techIcon ? (
                  <img
                    src={techIcon.src}
                    alt=""
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 rounded-[3px]"
                    loading="lazy"
                  />
                ) : null}
                <span>{tech}</span>
              </span>
            );
          })}
        </div>

        <ul className="mt-5 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          {projectText.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-3 pt-2">
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
          >
            {labels.liveDemo}
          </a>

          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
            >
              {labels.github}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
