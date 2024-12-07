import { describe, it, expect } from "vitest";
import { part1, isValid } from "./index";
import { getAnswer, readInput } from "@utils/utils.js";

type TestCase = { in: string; out: string };
const inputUrl = process.cwd() + "/../_input.txt";

const input = readInput(inputUrl);

if (!input) {
  expect.fail("No input");
}

console.log("Part 1:", part1(input));

describe("part1", () => {
  const answer = getAnswer(process.cwd() + "/../_answers.txt", "part1");

  if (answer) {
    it("matches known answer", () => {
      const result = part1(input);
      expect(result).toEqual(answer);
    });
  }

  it("is higher than 7710205483208", () => {
    const result = part1(input);
    expect(parseInt(result)).toBeGreaterThan(7710205483208);
  });

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
    ];

    cases.forEach((t) => {
      it(`for "${JSON.stringify(t.in)}" returns "${t.out}"`, () => {
        expect(isValid(t.in)).toBe(t.out);
      });
    });
  });

  describe("test cases", () => {
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
        out: `3749`,
      },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part1(t.in)).toBe(t.out);
      });
    });
  });
});
