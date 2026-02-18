import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/data/data-script.js")
      },
      output: {
        entryFileNames: "data-script.js"
      }
    }
  }
});
