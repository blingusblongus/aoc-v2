const part2 = (input: string) => {
  const rows = input
    .trim()
    .split(/\n/)
    .map((row) =>
      row
        .trim()
        .split(/\s/)
        .map((cell) => parseInt(cell)),
    );

  let total = 0;
  for (let row of rows) {
    const [max, min] = findEvenlyDivisible(row);
    total += max / min;
  }

  return total.toString();
};

export const findEvenlyDivisible = (arr: number[]): [number, number] => {
  for (let i = 0; i < arr.length - 1; ++i) {
    for (let j = 1; j < arr.length; ++j) {
      if (i === j) continue;

      let max = Math.max(arr[i], arr[j]);
      let min = Math.min(arr[i], arr[j]);
      if (max % min === 0) {
        return [max, min];
      }
    }
  }
  throw Error("No evenly divisible numbers");
};

export default part2;
