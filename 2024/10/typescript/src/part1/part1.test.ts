import { describe, it, expect } from "vitest";
import part1 from "./index";
import { getAnswer, readInput } from "@utils/utils.js";

const inputUrl = process.cwd() + "/../_input.txt";

const input = readInput(inputUrl);

if (!input) {
  expect.fail("No input");
}

console.log("Part 1:", part1(input));

describe.only("part1", () => {
  const answer = getAnswer(process.cwd() + "/../_answers.txt", "part1");

  if (answer) {
    it("matches known answer", () => {
      const result = part1(input);
      expect(result).toEqual(answer);
    });
  }

  describe.skip("failed attempts", () => {
    it("is above known failure", () => {
      const result = part1(input);
      expect(Number(result)).toBeGreaterThan(248);
    });
  });

  describe("test cases", () => {
    type TestCase = { in: string; out: string };
    const cases: TestCase[] = [
      // { in: "1122", out: "3" },
      {
        in: `...0...
      ...1...
      ...2...
      6543456
      7.....7
      8.....8
      9.....9`,
        out: "2",
      },
      {
        in: `..90..9
       ...1.98
       ...2..7
       6543456
       765.987
       876....
       987....`,
        out: "4",
      },
      {
        in: `10..9..
       2...8..
       3...7..
       4567654
       ...8..3
       ...9..2
       .....01`,
        out: "3",
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
        out: "36",
      },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part1(t.in)).toBe(t.out);
      });
    });
  });
});
