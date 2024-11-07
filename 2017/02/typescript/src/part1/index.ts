const part1 = (input: string) => {
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
    total += Math.max(...row) - Math.min(...row);
  }

  return total.toString();
};

export default part1;
