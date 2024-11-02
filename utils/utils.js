import { readFileSync } from "fs";

export const getAnswer = (path, answerKey) => {
  const file = readFileSync(path, "utf8");

  for (let line of file.split(/\n/)) {
    const [k, v] = line.split("=");
    if (k === answerKey) {
      return v;
    }
  }
  return null;
};

export const readInput = (path) => {
  try {
    return readFileSync(path, "utf8");
  } catch (e) {
    console.info("No answer recorded");
    return null;
  }
};
