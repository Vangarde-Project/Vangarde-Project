import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "", 
  define: {
    "process.env": process.env,
  },
  server: {
    port: 3000,
    proxy: {
      "/api": "http://localhost:3001",
      "/api/auth": "http://localhost:3001",
    },
  },
});