import { describe, it, expect } from "vitest";
import part2, { blink, blinkStr, printStones } from "./index";
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

  describe("maintain part1 behavior", () => {
    it("works after 1 blink", () => {
      const start = "125 17";
      let result = start;

      for (let i = 1; i <= 1; ++i) {
        result = blinkStr(result);
      }
      expect(result).toEqual("3");
    });
  });

  describe("test cases", () => {
    type TestCase = { in: string; out: string };
    const cases: TestCase[] = [
      // { in: "1122", out: "3" },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part2(t.in)).toBe(t.out);
      });
    });
  });
});
