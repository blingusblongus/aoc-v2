const part2 = (input: string) => {
  let activeStr = input;
  let enabled = true;
  let start = 0;
  let grandTotal = 0;

  while (true) {
    if (enabled) {
      let stopIdx = activeStr.search(/don't\(\)/);

      if (stopIdx === -1) {
        grandTotal += sumMults(activeStr.slice(0, stopIdx));
        break;
      }

      grandTotal += sumMults(activeStr.slice(0, stopIdx));

      start = stopIdx;
      activeStr = activeStr.slice(start);
      enabled = false;
    } else {
      let stopIdx = activeStr.search(/do\(\)/);

      if (stopIdx === -1) break;

      start = stopIdx;
      activeStr = activeStr.slice(start);
      enabled = true;
    }
  }

  return grandTotal.toString();
};

const sumMults = (s: string): number => {
  let total = 0;

  const re = /mul\(\d+,\d+\)/g;
  const matches = s.match(re);

  if (!matches) return 0;

  for (const m of matches) {
    const nums = m.match(/(\d+),(\d+)/) as [string, string, string];

    total += parseInt(nums[1]) * parseInt(nums[2]);
  }

  return total;
};

export default part2;
