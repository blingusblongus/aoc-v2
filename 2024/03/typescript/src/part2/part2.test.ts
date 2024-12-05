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

  describe("negative cases", () => {
    const result = part2(input);
    expect(result).not.toEqual("98596234");
    expect(result).not.toEqual("17643794");
    expect(result).not.toEqual("35361782");
  });

  describe("test cases", () => {
    type TestCase = { in: string; out: string };
    const cases: TestCase[] = [
      {
        in: "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
        out: "48",
      },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part2(t.in)).toBe(t.out);
      });
    });
  });
});
