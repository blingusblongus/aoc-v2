const part1 = (input: string) => {
  const reports = input
    .trim()
    .split(/\n/)
    .map((line) => {
      return line.split(/\s/).map((n) => parseInt(n));
    });

  let numSafe = 0;
  for (const report of reports) {
    if (isSafe(report, 3)) numSafe++;
  }

  return numSafe.toString();
};

export const isSafe = (numArr: number[], gradualLimit: number): boolean => {
  //set sign
  let sign = numArr[1] - numArr[0] < 0 ? -1 : 1;

  for (let i = 0; i < numArr.length - 1; i++) {
    const difference = numArr[i + 1] - numArr[i];

    if (sign === 1) {
      if (difference < 1) return false;
      if (difference > 3) return false;
    } else {
      if (difference > -1) return false;
      if (difference < -3) return false;
    }
  }

  return true;
};

export default part1;
