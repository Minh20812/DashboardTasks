import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.js",
  },
  server: {
    proxy: {
      // "/api/": "https://todolist-app-d0wu.onrender.com",
      // "/uploads/": "https://todolist-app-d0wu.onrender.com",
      "/api/": "http://localhost:5000/",
      "/uploads/": "http://localhost:5000/",
    },
  },
});
