// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enables global APIs like `describe` and `it`
    environment: "node", // Use 'node' environment for vanilla JS testing
  },
});
