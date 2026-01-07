import { atom } from "jotai";

export interface LanguageItem {
  code: string;
  name: string;
}

export const LANGUAGES: LanguageItem[] = [
  { code: "en", name: "English" },
  { code: "zht", name: "繁體中文" },
];

export const currentLanguageAtom = atom<LanguageItem>(LANGUAGES[0]);
