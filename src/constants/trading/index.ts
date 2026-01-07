import type { TFunction } from "i18next";

import {
  FacebookImg,
  InstagramImg,
  TelegramImg,
  TiktokImg,
  XImg,
  YoutubeImg,
} from "@/assets/images/trading/home/community";

export interface TabItem {
  key: string;
  label: string;
}

export const SOCIAL_MEDIA_LIST: Array<{
  name: string;
  imageUrl: string;
  href: string;
}> = [
  {
    name: "X",
    imageUrl: XImg,
    href: "https://x.com/trading_app",
  },
  {
    name: "Facebook",
    imageUrl: FacebookImg,
    href: "https://x.com/trading_app",
  },
  {
    name: "Telegram",
    imageUrl: TelegramImg,
    href: "https://x.com/trading_app",
  },
  {
    name: "Instagram",
    imageUrl: InstagramImg,
    href: "https://x.com/trading_app",
  },
  {
    name: "TikTok",
    imageUrl: TiktokImg,
    href: "https://x.com/trading_app",
  },
  {
    name: "Youtube",
    imageUrl: YoutubeImg,
    href: "https://x.com/trading_app",
  },
];

export const ORDER_BOOK_DEPTH = 8;
export const ORDER_BOOK_DEPTH_TPSL = 9;
export const ORDER_BOOK_LARGE_DEPTH = 12;

export const DEEP_L_TRANSLATE_SUPPORTED_LANGUAGES: Record<
  string,
  {
    code: string;
    name: string;
    nativeName: string;
  }
> = {
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
  },
  bg: {
    code: "bg",
    name: "Bulgarian",
    nativeName: "Български",
  },
  cs: {
    code: "cs",
    name: "Czech",
    nativeName: "Čeština",
  },
  da: {
    code: "da",
    name: "Danish",
    nativeName: "Dansk",
  },
  de: {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
  },
  el: {
    code: "el",
    name: "Greek",
    nativeName: "Ελληνικά",
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
  },
  "en-gb": {
    code: "en-gb",
    name: "English (British)",
    nativeName: "English (British)",
  },
  "en-us": {
    code: "en-us",
    name: "English (American)",
    nativeName: "English (American)",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
  },
  et: {
    code: "et",
    name: "Estonian",
    nativeName: "Eesti",
  },
  fi: {
    code: "fi",
    name: "Finnish",
    nativeName: "Suomi",
  },
  fr: {
    code: "fr",
    name: "French",
    nativeName: "Français",
  },
  he: {
    code: "he",
    name: "Hebrew",
    nativeName: "עברית",
  },
  hu: {
    code: "hu",
    name: "Hungarian",
    nativeName: "Magyar",
  },
  id: {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
  },
  it: {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
  },
  ja: {
    code: "ja",
    name: "Japanese",
    nativeName: "日本語",
  },
  ko: {
    code: "ko",
    name: "Korean",
    nativeName: "한국어",
  },
  lt: {
    code: "lt",
    name: "Lithuanian",
    nativeName: "Lietuvių",
  },
  lv: {
    code: "lv",
    name: "Latvian",
    nativeName: "Latviešu",
  },
  nb: {
    code: "nb",
    name: "Norwegian Bokmål",
    nativeName: "Norsk Bokmål",
  },
  nl: {
    code: "nl",
    name: "Dutch",
    nativeName: "Nederlands",
  },
  pl: {
    code: "pl",
    name: "Polish",
    nativeName: "Polski",
  },
  pt: {
    code: "pt",
    name: "Portuguese",
    nativeName: "Português",
  },
  "pt-br": {
    code: "pt-br",
    name: "Portuguese (Brazilian)",
    nativeName: "Português (Brasil)",
  },
  "pt-pt": {
    code: "pt-pt",
    name: "Portuguese (European)",
    nativeName: "Português (Europeu)",
  },
  ro: {
    code: "ro",
    name: "Romanian",
    nativeName: "Română",
  },
  ru: {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
  },
  sk: {
    code: "sk",
    name: "Slovak",
    nativeName: "Slovenčina",
  },
  sl: {
    code: "sl",
    name: "Slovenian",
    nativeName: "Slovenščina",
  },
  sv: {
    code: "sv",
    name: "Swedish",
    nativeName: "Svenska",
  },
  th: {
    code: "th",
    name: "Thai",
    nativeName: "ไทย",
  },
  tr: {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
  },
  uk: {
    code: "uk",
    name: "Ukrainian",
    nativeName: "Українська",
  },
  vi: {
    code: "vi",
    name: "Vietnamese",
    nativeName: "Tiếng Việt",
  },
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
  },
  "zh-hans": {
    code: "zh-hans",
    name: "Chinese (Simplified)",
    nativeName: "中文 (简体)",
  },
  "zh-hant": {
    code: "zh-hant",
    name: "Chinese (Traditional)",
    nativeName: "中文 (繁體)",
  },
};

// i18n language code to deepL language code mapping
export const BALL_DEEP_L_TRANSLATE_MAPPING: Record<
  string,
  (typeof DEEP_L_TRANSLATE_SUPPORTED_LANGUAGES)[string]
> = {
  en: DEEP_L_TRANSLATE_SUPPORTED_LANGUAGES["en"],
  zht: DEEP_L_TRANSLATE_SUPPORTED_LANGUAGES["zh-hant"],
};

export const checkIsSameLanguage = (
  sourceLanguage: string | undefined,
  currentLanguage: string
) => {
  if (!sourceLanguage) {
    return true;
  }

  if (sourceLanguage.toUpperCase() === currentLanguage.toUpperCase()) {
    return true;
  }

  if (
    sourceLanguage.toUpperCase() === "ZH" &&
    currentLanguage.toUpperCase() === "ZHT"
  ) {
    return true;
  }

  return false;
};

export const MARGIN_DECREASE_THRESHOLD_VALUE = 100;

export const MAX_FORUM_CONTENT_LENGTH = 10000;
export const MAX_FORUM_TITLE_LENGTH = 200;
export const MAX_FORUM_COMMENT_LENGTH = 200;
export const MAX_INT = 2147483647;

export const generateAssetPageTabs: (t: TFunction) => TabItem[] = (
  t: TFunction
) => [
  {
    key: "investments",
    label: t("myAssets.myInvestment.title"),
  },
  // [HIDDEN] Contract-related: My Positions tab
  // {
  //   key: "positions",
  //   label: t("myAssets.myPositions.title"),
  // },
  {
    key: "team",
    label: t("myAssets.myTeam.title"),
  },
];
