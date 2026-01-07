import type { ILang, Language } from "./getBrowserLocale";
import { findBestSupportedLocale } from "./getBrowserLocale";
import { getUserLocales } from "./getUserLocale";

export const LANGS: ILang[] = [
  {
    code: "en",
    name: "English",
  },
  {
    code: "zht",
    name: "繁體中文",
  },
];
export interface LanguageScore {
  score: number;
  language: string;
}

export default function getBrowserLocale(appLanguages: Language[]) {
  const browserLanguages = getUserLocales();

  if (
    appLanguages &&
    appLanguages.length > 0 &&
    browserLanguages &&
    browserLanguages.length > 0
  ) {
    return findBestSupportedLocale(appLanguages, browserLanguages);
  }
}

export const getLanguage: () => ILang = () => {
  if (localStorage.getItem("lang")) {
    return JSON.parse(
      localStorage.getItem("lang") ?? JSON.stringify(LANGS[0]),
    ) as ILang;
  }
  const bestSupportedLanguageCode = getBrowserLocale(
    LANGS.map((lang) => lang.code),
  );
  const bestSupportedLanguage: ILang =
    LANGS.find((lang) => lang.code === bestSupportedLanguageCode) ?? LANGS[0];
  localStorage.setItem("lang", JSON.stringify(bestSupportedLanguage));
  return bestSupportedLanguage;
};
