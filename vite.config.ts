import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/movie": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/movie/, ""),
      },
    },
  },
});
