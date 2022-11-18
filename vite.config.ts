import preact from "@preact/preset-vite";
import ssr from "vite-plugin-ssr/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    ssr({
      // includeAssetsImportedByServer: true,
    }),
    preact(),
  ],
  resolve: {
    alias: {
      react: "preact/compat",
    },
  },
});
