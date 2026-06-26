export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex flex-col leading-none" aria-label="Ir al inicio">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Juan Tzun
          </span>
          <span className="mt-1 text-base font-bold text-slate-950 dark:text-white">
            Full Stack Developer
          </span>
        </a>

        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300">
          <a className="transition hover:text-slate-950 dark:hover:text-white" href="#projects">
            Proyectos
          </a>
          <a className="transition hover:text-slate-950 dark:hover:text-white" href="#contact">
            Contacto
          </a>
        </nav>
      </div>
    </header>
  );
}
