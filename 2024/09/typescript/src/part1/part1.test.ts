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

  it("hints", () => {
    const result = part1(input);
    expect(parseInt(result)).toBeLessThan(6299243233821);
    expect(parseInt(result)).toBeLessThan(16069299082364);
  });

  describe("test cases", () => {
    type TestCase = { in: string; out: string };
    const cases: TestCase[] = [{ in: "2333133121414131402", out: "1928" }];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part1(t.in)).toBe(t.out);
      });
    });
  });
});
