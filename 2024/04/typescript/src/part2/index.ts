const part2 = (input: string) => {
  const grid = input
    .trim()
    .split(/\n/)
    .map((line) => line.split(""));

  let totalFound = 0;
  for (let y = 1; y < grid.length - 1; ++y) {
    for (let x = 1; x < grid[y].length - 1; ++x) {
      if (grid[y][x] === "A") {
        let m = 0;
        let s = 0;
        let corners = [
          grid[y - 1][x - 1],
          grid[y - 1][x + 1],
          grid[y + 1][x - 1],
          grid[y + 1][x + 1],
        ];

        for (let corner of corners) {
          if (corner === "M") {
            m++;
          } else if (corner === "S") {
            s++;
          } else {
            break;
          }
        }
        if (corners[0] === corners[3] || corners[1] === corners[2]) {
          continue;
        }
        if (m === 2 && s === 2) {
          totalFound++;
        }
      }
    }
  }
  return totalFound.toString();
};

export default part2;
