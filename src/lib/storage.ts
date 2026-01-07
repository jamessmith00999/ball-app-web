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

/**
 * Simple storage wrapper for localStorage
 */
export const storage = {
  get: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  set: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch {
      console.error("Failed to set storage item:", key);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch {
      console.error("Failed to remove storage item:", key);
    }
  },

  getJSON: <T>(key: string): T | null => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  },

  setJSON: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error("Failed to set storage item:", key);
    }
  },
};
