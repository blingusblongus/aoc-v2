const part2 = (input: string) => {
  const reports = input
    .trim()
    .split(/\n/)
    .map((line) => {
      return line.split(/\s/).map((n) => parseInt(n));
    });

  let numSafe = 0;
  for (const report of reports) {
    const safe = isSafe(report);
    if (safe) {
      numSafe++;
    } else {
      for (let i = 0; i < report.length; ++i) {
        const copy = report.slice();
        copy.splice(i, 1);
        if (isSafe(copy)) {
          numSafe++;
          break;
        }
      }
    }
  }

  return numSafe.toString();
};

const isStrictlyIncreasing = (numArr: number[]) => {
  for (let i = 0; i < numArr.length - 1; ++i) {
    if (numArr[i + 1] <= numArr[i]) return false;
  }
  return true;
};

const isStrictlyDecreasing = (numArr: number[]) => {
  for (let i = 0; i < numArr.length - 1; ++i) {
    if (numArr[i + 1] >= numArr[i]) return false;
  }
  return true;
};

const isSafe = (numArr: number[]): boolean => {
  const inc = isStrictlyIncreasing(numArr);
  const dec = isStrictlyDecreasing(numArr);
  if (!(inc || dec)) return false;

  for (let i = 0; i < numArr.length - 1; i++) {
    const difference = numArr[i + 1] - numArr[i];

    if (inc) {
      if (difference < 1 || difference > 3) return false;
    } else {
      if (difference > -1 || difference < -3) return false;
    }
  }

  return true;
};

export default part2;
