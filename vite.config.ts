import react from "@vitejs/plugin-react";
import ssr from "vite-plugin-ssr/plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), ssr()],
});
