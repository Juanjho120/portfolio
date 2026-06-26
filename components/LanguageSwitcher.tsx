import Link from "next/link";
import { locales, type Locale } from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: {
    label: string;
    es: string;
    en: string;
  };
};

export function LanguageSwitcher({ locale, labels }: LanguageSwitcherProps) {
  return (
    <div
      className="flex rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-semibold dark:border-slate-800 dark:bg-slate-900"
      aria-label={labels.label}
    >
      {locales.map((nextLocale) => {
        const isActive = nextLocale === locale;

        return (
          <Link
            key={nextLocale}
            href={`/${nextLocale}`}
            className={`rounded-full px-3 py-1 transition ${
              isActive
                ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950"
                : "text-slate-600 hover:text-slate-950 dark:text-slate-300 dark:hover:text-white"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            {labels[nextLocale]}
          </Link>
        );
      })}
    </div>
  );
}
