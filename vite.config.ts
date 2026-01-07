import { defineConfig } from "vite";
import { config as dotenvConfig } from "dotenv";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import obfuscatorPlugin from "vite-plugin-javascript-obfuscator";
import path from "path";

// Load .env file before accessing environment variables
// This is needed because vite.config.ts runs before Vite loads .env files
dotenvConfig();

// https://vite.dev/config/
export default defineConfig(() => {
  const env = process.env.VITE_WEB_APP;
  console.log("Building for environment: ", env);
  return {
    plugins: [
      tailwindcss(),
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      obfuscatorPlugin({
        apply: "build",
        options: {
          compact: true, // compress and remove whitespace
          debugProtection: false, // prevent debugging tools (F12 / DevTools)
          disableConsoleOutput: true, // prevent console.log output
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        // Resolve config to environment-specific file at build time
        // This completely excludes other environment configs from the bundle
        "virtual:env-config": path.resolve(__dirname, `./src/config/${env}.ts`),
      },
    },
  };
});
