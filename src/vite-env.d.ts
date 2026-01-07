/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_I18N_DEBUG: boolean;
  readonly VITE_WEB_APP: "development" | "preview" | "production";
  readonly VITE_OFFICIAL_WEBSITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "virtual:env-config" {
  import type { Config } from "./config/type";
  const config: Config;
  export default config;
}
