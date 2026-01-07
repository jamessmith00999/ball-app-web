import { STORAGE_KEY } from "@/constants/storage-key";
import type { ILang } from "@/translations/getBrowserLocale";
import { LANGS } from "@/translations/language";

export const Storage = localStorage;

export const getLanguageFromAsyncStorage = async () => {
  const storageLang = await Storage.getItem(STORAGE_KEY.CURRENT_AREA);
  if (storageLang) {
    const lang = JSON.parse(storageLang ?? JSON.stringify(LANGS[0])) as ILang;
    return lang;
  }
  return null;
};
