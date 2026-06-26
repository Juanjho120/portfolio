import { defaultLocale, type Locale } from "@/i18n/config";
import en from "@/i18n/messages/en.json";
import es from "@/i18n/messages/es.json";

const dictionaries = {
  es,
  en,
} as const;

export type Dictionary = typeof es;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
