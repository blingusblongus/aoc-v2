import { describe, it, expect } from "vitest";
import part2 from "./index.js";
import { getAnswer, readInput } from "../../../../utils/utils.js";

const input = readInput(process.cwd() + "/../_input.txt");

describe("part2", () => {
  const answer = getAnswer(process.cwd() + "/../_answers.txt", "part2");

  if (answer) {
    it("matches known answer", () => {
      const result = part2(input);
      expect(result).toEqual(answer);
    });
  }
});
