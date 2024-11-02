import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import answers from "../_answers.js";
import part1 from "./index.js";

const { answer1: answer } = answers;

let input;
try {
  input = readFileSync(`${__dirname}/../_input.txt`).toString();
} catch (e) {}

describe("part1", () => {
  if (answer) {
    it("matches known answer", () => {
      const result = part1(input);
      expect(result).toEqual(answer);
    });
  }
});
