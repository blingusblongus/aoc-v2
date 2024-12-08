import { describe, it, expect } from "vitest";
import { part2, isValid } from "./index";
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

  describe("isValid", () => {
    const cases = [
      {
        in: { answer: 190, nums: [10, 19] },
        out: true,
      },
      {
        in: { answer: 3267, nums: [81, 40, 27] },
        out: true,
      },
      {
        in: { answer: 292, nums: [11, 6, 16, 20] },
        out: true,
      },
      {
        in: { answer: 156, nums: [15, 6] },
        out: true,
      },
    ];

    cases.forEach((t) => {
      it(`for "${JSON.stringify(t.in)}" returns "${t.out}"`, () => {
        expect(isValid(t.in)).toBe(t.out);
      });
    });
  });
  describe("test cases", () => {
    type TestCase = { in: string; out: string };
    const cases: TestCase[] = [
      {
        in: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        out: `11387`,
      },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part2(t.in)).toBe(t.out);
      });
    });
  });
});
