// @ts-check
import { readFileSync } from "fs";

export const getAnswer = (
  /** @type {import("fs").PathOrFileDescriptor} */ path,
  /** @type {string} */ answerKey,
) => {
  const file = readFileSync(path, "utf8");

  for (let line of file.split(/\n/)) {
    const [k, v] = line.split("=");
    if (k === answerKey) {
      return v;
    }
  }
  return null;
};

export const readInput = (
  /** @type {import("fs").PathOrFileDescriptor} */ path,
) => {
  try {
    return readFileSync(path, "utf8");
  } catch (e) {
    console.info("No answer recorded");
    return null;
  }
};
