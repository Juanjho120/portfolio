import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGrid } from "@/components/ProjectGrid";

export default function Home() {
  return (
    <>
      <Header />

      <main id="top" className="flex-1">
        <section className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl flex-col justify-center px-6 py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-300">
              Portfolio profesional · juantzun.dev
            </span>

            <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              Construyo plataformas web full-stack con foco en operación, datos e IA aplicada.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Soy desarrollador full-stack con experiencia en Java, Spring Boot, Angular, React,
              PostgreSQL, Docker y soluciones con IA. Este portfolio reúne proyectos pensados como
              productos reales, con arquitectura clara, despliegue y casos de uso prácticos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                Ver proyectos
              </a>
              <a
                href="/cv/Juan_Tzun_CV.pdf"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
              >
                Descargar CV
              </a>
              <a
                href="mailto:juan.jose120@hotmail.com"
                className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-slate-700 transition hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
              >
                Contactarme
              </a>
            </div>

            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                ["6+", "años de experiencia"],
                ["Java", "backend robusto"],
                ["Angular", "frontends productivos"],
                ["IA", "RAG y agentes"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/70">
                  <dt className="text-2xl font-bold text-slate-950 dark:text-white">{value}</dt>
                  <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <ProjectGrid />
      </main>

      <Footer />
    </>
  );
}
