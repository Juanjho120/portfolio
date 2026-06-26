import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";

export function ProjectGrid() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-600 dark:text-sky-400">
          Portfolio
        </span>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Proyectos diseñados como productos reales
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
          Cada proyecto está pensado para demostrar arquitectura full-stack, criterio de producto,
          despliegue, datos, IA aplicada y resolución de problemas reales.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
