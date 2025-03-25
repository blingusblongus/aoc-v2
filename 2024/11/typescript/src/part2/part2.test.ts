import { describe, it, expect } from "vitest";
import part2 from "./index";
// @ts-ignore
import { getAnswer, readInput } from "../../../../../utils/utils.js";

const input = readInput(process.cwd() + "/../_input.txt");

console.log("Part 2:", part2(input, 75));

describe("part2", () => {
  const answer = getAnswer(process.cwd() + "/../_answers.txt", "part2");

  if (answer) {
    it("matches known answer", () => {
      const result = part2(input, 75);
      expect(result).toEqual(answer);
    });
  }

  describe("maintain part1 behavior", () => {
    it("works after 1 blink", () => {
      const start = "125 17";
      const result = part2(start, 1);
      expect(result).toEqual("3");
    });
  });
});
