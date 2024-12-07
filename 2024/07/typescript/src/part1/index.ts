type Test = { answer: number; nums: number[] };

export const part1 = (input: string) => {
  const lines = input
    .trim()
    .split(/\n/)
    .map((line) => {
      const arr = line.split(/:\s|\s/);
      const answer = parseInt(arr.shift()!);
      if (!answer) throw Error("Error parsing input");
      return {
        answer: answer,
        nums: arr.map((num) => parseInt(num)),
      };
    });

  let totalTestValues = 0;
  for (const line of lines) {
    if (isValid(line)) totalTestValues += line.answer;
  }

  return totalTestValues.toString();
};

export const isValid = (line: Test): boolean => {
  const permutations = getPermutations(line.nums.length);

  for (let i = 0; i <= parseInt(permutations, 2); i++) {
    const opIdxs = i.toString(2).padStart(permutations.length, "0").split("");

    let total = line.nums[0];
    for (let j = 0; j < opIdxs.length; j++) {
      const opIdx = Number(opIdxs[j]);
      total = ops[opIdx](total, line.nums[j + 1]);
    }
    if (total === line.answer) {
      return true;
    }
  }

  return false;
};

const getPermutations = (len: number) => {
  return `1`.repeat(len - 1);
};

const mult = (n1: number, n2: number) => n1 * n2;
const add = (n1: number, n2: number) => n1 + n2;

type Op = (n1: number, n2: number) => number;
const ops: Op[] = [add, mult];
