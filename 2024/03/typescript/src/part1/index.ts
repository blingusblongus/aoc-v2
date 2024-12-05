const part1 = (input: string) => {
  const re = /mul\(\d+,\d+\)/g;
  const matches = input.trim().match(re)!;

  let total = 0;
  for (const m of matches) {
    const nums = m.match(/(\d+),(\d+)/) as [string, string, string];

    total += parseInt(nums[1]) * parseInt(nums[2]);
  }

  // Solve
  return total.toString();
};

export default part1;
