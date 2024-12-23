import { describe, it, expect } from "vitest";
import part1 from "./index.js";
import { getAnswer, readInput } from "../../../../utils/utils.js";

const input = readInput(process.cwd() + "/../_input.txt");

describe("part1", () => {
  const answer = getAnswer(process.cwd() + "/../_answers.txt", "part1");

  if (answer) {
    it("matches known answer", () => {
      const result = part1(input);
      expect(result).toEqual(answer);
    });
  }
});
