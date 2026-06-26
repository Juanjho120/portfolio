import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/i18n/config";

type HeaderProps = {
  locale: Locale;
  labels: {
    ariaHome: string;
    name: string;
    role: string;
    projects: string;
    contact: string;
  };
  languageLabels: {
    label: string;
    es: string;
    en: string;
  };
};

export function Header({ locale, labels, languageLabels }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <a href="#top" className="group flex flex-col leading-none" aria-label={labels.ariaHome}>
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {labels.name}
          </span>
          <span className="mt-1 text-base font-bold text-slate-950 dark:text-white">{labels.role}</span>
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-4 text-sm font-medium text-slate-600 dark:text-slate-300 sm:flex">
            <a className="transition hover:text-slate-950 dark:hover:text-white" href="#projects">
              {labels.projects}
            </a>
            <a className="transition hover:text-slate-950 dark:hover:text-white" href="#contact">
              {labels.contact}
            </a>
          </nav>

          <LanguageSwitcher locale={locale} labels={languageLabels} />
        </div>
      </div>
    </header>
  );
}
