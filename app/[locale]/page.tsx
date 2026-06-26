import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getTechIcon } from "@/data/tech-icons";
import { projects } from "@/data/projects";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale } from "@/i18n/config";
import { notFound } from "next/navigation";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const heroStatBadgeStyles: Record<string, string> = {
  Java: "border-orange-200 bg-orange-50 text-orange-950 shadow-orange-950/5 dark:border-orange-900/60 dark:bg-orange-950/35 dark:text-orange-100",
  Angular:
    "border-rose-200 bg-rose-50 text-rose-950 shadow-rose-950/5 dark:border-rose-900/60 dark:bg-rose-950/35 dark:text-rose-100",
  React:
    "border-cyan-200 bg-cyan-50 text-cyan-950 shadow-cyan-950/5 dark:border-cyan-900/60 dark:bg-cyan-950/35 dark:text-cyan-100",
  AI: "border-violet-200 bg-violet-50 text-violet-950 shadow-violet-950/5 dark:border-violet-900/60 dark:bg-violet-950/35 dark:text-violet-100",
  IA: "border-violet-200 bg-violet-50 text-violet-950 shadow-violet-950/5 dark:border-violet-900/60 dark:bg-violet-950/35 dark:text-violet-100",
};

function getHeroStatBadgeStyle(value: string) {
  return (
    heroStatBadgeStyles[value] ??
    "border-slate-200 bg-white text-slate-950 shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900/70 dark:text-white"
  );
}

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

            <dl className="mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {dictionary.hero.stats.map((stat) => {
                const statIcon = getTechIcon(stat.value);

                return (
                  <div
                    key={stat.label}
                    className={`rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${getHeroStatBadgeStyle(
                      stat.value,
                    )}`}
                  >
                    <div className="flex items-center gap-3">
                      {statIcon ? (
                        <img
                          src={statIcon.src}
                          alt=""
                          aria-hidden="true"
                          className="h-8 w-8 shrink-0 object-contain drop-shadow-sm"
                          loading="lazy"
                        />
                      ) : null}

                      <div>
                        <dt className="text-xl font-bold sm:text-2xl">{stat.value}</dt>
                        <dd className="mt-1 text-sm leading-5 opacity-70">{stat.label}</dd>
                      </div>
                    </div>
                  </div>
                );
              })}
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
