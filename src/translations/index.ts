// This file defines the initialize of translations
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLanguage } from "./language";
import en from "./en.json";
import zht from "./zht.json";

type TranslationContent = Record<string, unknown>;
type Translation = Record<string, TranslationContent>;
type Resources = Record<string, Translation>;

/**
 * json resources
 */
const resources: Resources = {
  en: {
    translation: en,
  },
  zht: {
    translation: zht,
  },
};

/**
 * initialize i18n
 */
i18n.use(initReactI18next).init({
  resources,
  lng: getLanguage().code,
  fallbackLng: "en", //when specified language translations not present
  debug: import.meta.env?.VITE_I18N_DEBUG === true,
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});
