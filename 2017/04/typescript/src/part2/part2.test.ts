import { describe, it, expect } from "vitest";
import part2 from "./index";
// @ts-ignore
import { getAnswer, readInput } from "../../../../../utils/utils.js";

const input = readInput(process.cwd() + "/../_input.txt");

console.log("Part 2:", part2(input));

describe("part2", () => {
  const answer = getAnswer(process.cwd() + "/../_answers.txt", "part2");

  if (answer) {
    it("matches known answer", () => {
      const result = part2(input);
      expect(result).toEqual(answer);
    });
  }

  describe("test cases", () => {
    type TestCase = { in: string; out: string };
    const cases: TestCase[] = [
      { in: "abcde fghij", out: "1" },
      { in: "abcde xyz ecdab", out: "0" },
      { in: "a ab abc abd abf abj", out: "1" },
      { in: "iiii oiii ooii oooi oooo", out: "1" },
      { in: "oiii ioii iioi iiio", out: "0" },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part2(t.in)).toBe(t.out);
      });
    });
  });
});
