import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  base: "./",
  build: {
    outDir: path.resolve(__dirname, "build"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./index.html"),
      },
    },
    terserOptions: {
      compress: {
        passes: 2,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
  server: {
    port: 8080,
  },
});
