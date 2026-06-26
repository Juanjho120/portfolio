import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGrid } from "@/components/ProjectGrid";
import { projects } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function LocaleHome({ params }: LocalePageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <>
      <Header locale={locale} labels={dictionary.navigation} languageLabels={dictionary.languageSwitcher} />

      <main id="top" className="flex-1">
        <section className="mx-auto flex min-h-[calc(100vh-73px)] w-full max-w-6xl flex-col justify-center px-6 py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 dark:border-sky-900/70 dark:bg-sky-950/50 dark:text-sky-300">
              {dictionary.hero.eyebrow}
            </span>

            <h1 className="mt-8 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-6xl">
              {dictionary.hero.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {dictionary.hero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                {dictionary.hero.actions.projects}
              </a>
              <a
                href="/cv/Juan_Tzun_CV.pdf"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-950 hover:text-slate-950 dark:border-slate-700 dark:text-slate-200 dark:hover:border-white dark:hover:text-white"
              >
                {dictionary.hero.actions.cv}
              </a>
              <a
                href="mailto:juan.jose120@hotmail.com"
                className="inline-flex items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-semibold text-slate-700 transition hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
              >
                {dictionary.hero.actions.contact}
              </a>
            </div>

            <dl className="mt-12 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
              {dictionary.hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <dt className="text-2xl font-bold text-slate-950 dark:text-white">{stat.value}</dt>
                  <dd className="mt-1 text-sm text-slate-600 dark:text-slate-300">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <ProjectGrid
          projects={projects}
          projectTexts={dictionary.projects}
          copy={dictionary.projectGrid}
          cardLabels={dictionary.projectCards}
        />
      </main>

      <Footer labels={dictionary.footer} />
    </>
  );
}
