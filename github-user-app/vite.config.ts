import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // Load envrionments: .env.sit, .env.uat ...
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    resolve: {
      alias: [
        { find: "@shared", replacement: path.resolve(__dirname, "src/shared") },
        { find: "@app", replacement: path.resolve(__dirname, "src/app") },
        { find: "@features", replacement: path.resolve(__dirname, "src/features") },
        { find: "@locales", replacement: path.resolve(__dirname, "src/locales") }
      ],
    },
  };
});
