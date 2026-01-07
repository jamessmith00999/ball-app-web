import type { Translation } from "@/api/base-api-type";

import { getUserLocales } from "./getUserLocale";

export type Language = keyof Translation;

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

export interface ILang {
  code: Language;
  name: string;
}

export interface ILocaleScore {
  code: string;
  score: number;
}

export function findBestSupportedLocale(
  appLocales: Language[],
  browserLocales: readonly Language[]
) {
  const matchedLanguages: Record<string, ILocaleScore> = {};

  // Process special mappings
  const narrowedLanguages = browserLocales.map((language) => {
    // Handle special cases for traditional Chinesee fallback
    if (["zh-TW", "zh-HK"].includes(language)) {
      return "zh-Hans";
    }

    return language;
  });

  for (const index in narrowedLanguages) {
    const browserLanguage = narrowedLanguages[index];
    // match exact language.
    const matchedExactLanguage = appLocales.find(
      (language) => language.toLowerCase() === browserLanguage.toLowerCase()
    );
    if (matchedExactLanguage) {
      matchedLanguages[matchedExactLanguage] = {
        code: matchedExactLanguage,
        score: 1 - Number(index) / narrowedLanguages.length,
      };
    } else {
      // match only language code part of the browser locale (not including country).
      const languageCode = browserLanguage.split("-")[0].toLowerCase();
      const matchedPartialLanguage = appLocales.find(
        (language) => language.split("-")[0].toLowerCase() === languageCode
      );
      if (matchedPartialLanguage) {
        const existingMatch = matchedLanguages[matchedPartialLanguage];

        // Deduct a thousandth for being non-exact match.
        const newMatchScore = 0.999 - Number(index) / narrowedLanguages.length;
        const newMatch = {
          code: matchedPartialLanguage,
          score: newMatchScore,
        };
        if (
          !existingMatch ||
          (existingMatch && existingMatch.score <= newMatchScore)
        ) {
          matchedLanguages[matchedPartialLanguage] = newMatch;
        }
      }
    }
  }

  // Sort the list by score (0 - lowest, 1 - highest).
  if (Object.keys(matchedLanguages).length > 0) {
    return Object.values(matchedLanguages).sort((a, b) => b.score - a.score)[0]
      .code;
  }
}
