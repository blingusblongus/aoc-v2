import { describe, it, expect } from "vitest";
import { readInput } from "@utils/utils.js";

const input = readInput(process.cwd() + "/../_input.txt");

describe("input", () => {
  it("exists", () => {
    expect(input?.length, "_input.txt should be populated").toBeGreaterThan(0);
  });
});
