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
      // { in: "1122", out: "3" },
      {
        in: `.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`,
        out: "3",
      },
      {
        in: `..90..9
       ...1.98
       ...2..7
       6543456
       765.987
       876....
       987....`,
        out: "13",
      },
      {
        in: `012345
123456
234567
345678
4.6789
56789.
`,
        out: "227",
      },
      {
        in: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        out: "81",
      },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part2(t.in)).toBe(t.out);
      });
    });
  });
});
