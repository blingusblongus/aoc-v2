const part1 = (input: string) => {
  const grid = input
    .trim()
    .split(/\n/)
    .map((line) => line.split(""));

  let totalFound = 0;
  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      totalFound += checkForWord("XMAS", grid, [y, x]);
    }
  }
  return totalFound.toString();
};

const directions = [
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
  [-1, -1],
  [0, -1],
  [1, -1],
];

const checkForWord = (
  word: string,
  grid: string[][],
  start: [number, number],
) => {
  if (grid[start[0]][start[1]] !== word[0]) return 0;
  let total = 0;
  for (let i = 0; i < directions.length; ++i) {
    let cur = [...start];
    let found = true;

    for (let j = 1; j < word.length; ++j) {
      cur = [cur[0] + directions[i][0], cur[1] + directions[i][1]];

      if (
        cur[1] >= grid[0].length ||
        cur[1] < 0 ||
        cur[0] >= grid.length ||
        cur[0] < 0 ||
        grid[cur[0]][cur[1]] !== word[j]
      ) {
        found = false;
        break;
      }
    }

    if (found) {
      total++;
    }
  }
  return total;
};

export default part1;
