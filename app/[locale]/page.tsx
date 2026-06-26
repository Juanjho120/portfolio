import Image from "next/image";
import { notFound } from "next/navigation";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProjectGrid } from "@/components/ProjectGrid";
import { getHeroStatIcon } from "@/data/hero-stat-icons";
import { projects } from "@/data/projects";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const heroStatBadgeStyles: Record<string, string> = {
  Java: "border-orange-200 bg-orange-50 text-orange-950 shadow-orange-950/5 dark:border-orange-900/60 dark:bg-orange-950/35 dark:text-orange-100",
  Angular: "border-rose-200 bg-rose-50 text-rose-950 shadow-rose-950/5 dark:border-rose-900/60 dark:bg-rose-950/35 dark:text-rose-100",
  React: "border-cyan-200 bg-cyan-50 text-cyan-950 shadow-cyan-950/5 dark:border-cyan-900/60 dark:bg-cyan-950/35 dark:text-cyan-100",
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
      <Header
        locale={locale}
        labels={dictionary.navigation}
        languageLabels={dictionary.languageSwitcher}
      />

      <main>
        <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col items-start justify-center px-6 py-20 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm shadow-slate-950/5 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300">
              {dictionary.hero.eyebrow}
            </p>

            <h1 className="text-balance text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
              {dictionary.hero.title}
            </h1>

            <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
              {dictionary.hero.description}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              >
                {dictionary.hero.actions.projects}
              </a>
              <a
                href="/cv/Juan_Tzun_CV.pdf"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm shadow-slate-950/5 transition hover:-translate-y-0.5 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                target="_blank"
                rel="noreferrer"
              >
                {dictionary.hero.actions.cv}
              </a>
              <a
                href="mailto:juan.jose120@hotmail.com"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-700 transition hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
              >
                {dictionary.hero.actions.contact}
              </a>
            </div>

            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {dictionary.hero.stats.map((stat) => {
                const statIcon = getHeroStatIcon(stat.value);

                return (
                  <div
                    key={`${stat.value}-${stat.label}`}
                    className={`rounded-3xl border px-4 py-4 shadow-sm ${getHeroStatBadgeStyle(
                      stat.value,
                    )}`}
                  >
                    <div className="flex items-center gap-3">
                      {statIcon ? (
                        <Image
                          src={statIcon.src}
                          alt={statIcon.label}
                          width={32}
                          height={32}
                          className="h-8 w-8 shrink-0 object-contain"
                        />
                      ) : null}

                      <div>
                        <p className="text-lg font-semibold">{stat.value}</p>
                        <p className="text-xs font-medium opacity-75">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
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
