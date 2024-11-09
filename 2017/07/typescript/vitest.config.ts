import { defineConfig } from "vitest/config";
import path from "path";

const alias = {
  "@utils": path.resolve(__dirname + "/../../../utils"),
  "@problem": __dirname,
};

export default defineConfig({
  test: {
    globals: true, // Enables global APIs like `describe` and `it`
    environment: "node", // Use 'node' environment for vanilla JS testing
    exclude: ["node_modules/**/*"],
  },
  resolve: {
    alias,
  },
});
