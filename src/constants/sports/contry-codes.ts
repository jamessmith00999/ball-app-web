export interface CountryItem {
  code: string;
  dial_code: string;
  flag: string;
  name: string;
}

export const EXCLUDED_COUNTRIES: string[] = ["CN"];

export const DEFAULT_COUNTRY: CountryItem = {
  code: "US",
  dial_code: "+1",
  flag: "🇺🇸",
  name: "United States",
};
