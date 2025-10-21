import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "",
  server: {
    proxy: {
      // Dev-only proxy: verwijst /api naar je lokale API-server
      "/api": {
        target: "http://127.0.0.1:4000", // pas poort aan als jouw API op andere poort draait
        changeOrigin: true,
        secure: false,
        timeout: 10000,
        proxyTimeout: 10000,
      },
    },
  },
});