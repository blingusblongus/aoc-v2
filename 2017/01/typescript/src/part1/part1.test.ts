import { describe, it, expect } from "vitest";
import part1 from "./index";
import { getAnswer, readInput } from "@utils/utils.js";

const inputUrl = process.cwd() + "/../_input.txt";

const input = readInput(inputUrl);

if (!input) {
  expect.fail("No input");
}

describe("part1", () => {
  const answer = getAnswer(process.cwd() + "/../_answers.txt", "part1");
  const result = part1(input);
  console.info("Part1 Answer: ", result);

  describe("test cases", () => {
    const cases = [
      { in: "1122", out: "3" },
      { in: "1111", out: "4" },
      { in: "1234", out: "0" },
      { in: "91212129", out: "9" },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part1(t.in)).toBe(t.out);
      });
    });
  });

  if (answer) {
    it("matches known answer", () => {
      expect(result).toEqual(answer);
    });
  }
});
