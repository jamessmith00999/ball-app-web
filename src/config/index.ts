import development from "./development";
import preview from "./preview";
import production from "./production";

// Don't define URLs in this file, use .env.customenv instead
// because it will be leaked to the client side
const config =
  {
    development,
    preview,
    production,
  }[import.meta.env.VITE_WEB_APP || "development"] || development;

export default config;
