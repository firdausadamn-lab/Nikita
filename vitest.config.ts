import { defineConfig } from "vitest/config";
import path from "node:path";

// Tests only. Next.js does its own bundling; this exists so Vitest can resolve
// the "@/..." alias declared in tsconfig.json.
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
