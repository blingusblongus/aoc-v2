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
      {
        in: `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`,
        out: "10",
      },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part2(t.in)).toBe(t.out);
      });
    });
  });
});
