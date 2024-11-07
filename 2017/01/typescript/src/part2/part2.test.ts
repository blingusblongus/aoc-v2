import { describe, it, expect } from "vitest";
import part2 from "./index";
import { getAnswer, readInput } from "@utils/utils.js";

const inputUrl = process.cwd() + "/../_input.txt";

const input = readInput(inputUrl);

if (!input) {
  expect.fail("No input");
}

describe("Part2", () => {
  const answer = getAnswer(process.cwd() + "/../_answers.txt", "part2");
  const result = part2(input);
  console.info("part2 Answer: ", result);

  describe("test cases", () => {
    process.env.TEST_DEBUG = "true";
    const cases = [
      { in: "1212", out: "6" },
      { in: "1221", out: "0" },
      { in: "123425", out: "4" },
      { in: "123123", out: "12" },
      { in: "12131415", out: "4" },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part2(t.in)).toBe(t.out);
      });
    });
  });

  if (answer) {
    process.env.TEST_DEBUG = "false";
    it("matches known answer", () => {
      expect(result).toEqual(answer);
    });
  }
});
