import { describe, it, expect } from "vitest";
import part1 from "./index";
import { getAnswer, readInput } from "@utils/utils.js";

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

  describe("test cases", () => {
    type TestCase = { in: string; out: string };
    const cases: TestCase[] = [
      { in: "aa bb cc dd ee", out: "1" },
      { in: "aa bb cc dd aa", out: "0" },
      { in: "aa bb cc dd aaa", out: "1" },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part1(t.in)).toBe(t.out);
      });
    });
  });
});
