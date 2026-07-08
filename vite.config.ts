import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  // Ім'я репозиторію — потрібно для коректних шляхів на GitHub Pages;
  // у дев-режимі сайт лишається на корені
  base: command === "build" ? "/beauty-scale/" : "/",
  plugins: [react()],
}));
