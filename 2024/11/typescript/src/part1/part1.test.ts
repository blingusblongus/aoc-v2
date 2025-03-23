import { describe, it, expect } from "vitest";
import part1, { strToStones, blink, blinkStr, printStones } from "./index";
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

  describe("blink testing", () => {
    describe("single-stone tests", () => {
      it("follows rule 1", () => {
        const stones = strToStones("0");
        const newStone = stones[0].change();
        expect(newStone[0].str).toBe("1");
        expect(newStone[1]).to.not.exist;
      });
      it("follows rule 2", () => {
        const stones = strToStones("10");
        const newStone = stones[0].change();
        expect(newStone[0].str).toBe("1");
        expect(newStone[1].str).toBe("0");
      });
      it("follows rule 3", () => {
        const stones = strToStones("1");
        const newStone = stones[0].change();
        expect(newStone[0].str).toBe("2024");
      });
    });

    describe("multi-stone tests", () => {
      const initial = strToStones("125 17");
      it("is accurate after 1 blink", () => {
        const result = blink(initial);
        expect(result.map((stone) => stone.str).join(" ")).toEqual(
          "253000 1 7",
        );
      });

      it("accurate blink w/ input 253000 1 7", () => {
        const result = blink(strToStones("253000 1 7"));
        expect(result.length).toBe(4);
      });

      it("is accurate after x blinks", () => {
        let result = initial;

        // Represents *After* some number of blinks
        for (let i = 1; i <= 6; ++i) {
          result = blink(result);
          switch (i) {
            case 1:
              expect(printStones(result)).toEqual("253000 1 7");
              break;
            case 2:
              expect(printStones(result)).toEqual("253 0 2024 14168");
              break;
            case 3:
              expect(printStones(result)).toEqual("512072 1 20 24 28676032");
              break;
            case 4:
              expect(printStones(result)).toEqual(
                "512 72 2024 2 0 2 4 2867 6032",
              );
              break;
            case 5:
              expect(printStones(result)).toEqual(
                "1036288 7 2 20 24 4048 1 4048 8096 28 67 60 32",
              );
              break;
            case 6:
              expect(printStones(result)).toEqual(
                "2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2",
              );
              break;
          }
        }
      });
    });

    it("results in 22 stones after 6 blinks (for the given start)", () => {
      let result = "125 17";
      for (let i = 1; i <= 6; ++i) {
        result = blinkStr(strToStones(result));
        // console.log(i, result);
      }

      expect(result.trim().split(" ").length).toBe(22);
    });

    it("results in 55312 stones after 6 blinks (for the given start)", () => {
      let result = "125 17";
      for (let i = 1; i <= 25; ++i) {
        result = blinkStr(strToStones(result));
      }

      expect(result.trim().split(" ").length).toBe(55312);
    });
  });

  describe("test cases", () => {
    type TestCase = { in: string; out: string };
    const cases: TestCase[] = [
      // { in: "1122", out: "3" },
      { in: `0 1 10 99 999`, out: "55312" },
    ];

    cases.forEach((t) => {
      it(`for "${t.in}" returns "${t.out}"`, () => {
        expect(part1(t.in)).toBe(t.out);
      });
    });
  });
});
