type Coord = { x: number; y: number };

const part2 = (input: string) => {
  const topo = getTopo(input);

  const starts: Array<Coord> = [];

  for (let y = 0; y < topo.length; ++y) {
    for (let x = 0; x < topo[y].length; ++x) {
      if (topo[y][x] === "0") {
        starts.push({ x, y });
      }
    }
  }

  // Now we'll store the number of unique paths to each trail end
  let found = new Map<string, number>();
  let paths = 0;
  for (let start of starts) {
    found.clear();
    getPaths(topo, start, [], start, found);
    paths += Array.from(found).reduce((sum, el) => (sum += el[1]), 0);
  }

  return paths.toString();
};

const getTopo = (input: string) => {
  return input
    .trim()
    .split(/\n/)
    .map((line) => line.trim().split(""));
};

const directions = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
];

/**
 * Given a starting point
 * If it's a 9, note check if path between start and end has been found
 * Determine possible spots to move on
 * For each, add the returned values
 * then return when options are exhausted
 */
const getPaths = (
  topo: string[][],
  c: Coord,
  visited: Coord[],
  start: Coord,
  found: Map<string, number>,
): void => {
  // Base: if end of path, return count + 1;
  if (getHeight(topo, c) === 9) {
    const str = c.x + "," + c.y;
    if (found.has(str)) {
      found.set(str, found.get(str)! + 1);
      visited.pop();
      return;
    }

    found.set(str, 1);
    return;
  }

  visited.push(c);

  for (let dir of directions) {
    const next = step(c, dir);
    if (!inBounds(topo, next)) continue;
    if (getHeight(topo, next) !== getHeight(topo, c) + 1) continue;
    if (visited.some((step) => step.x === next.x && step.y === next.y))
      continue;

    getPaths(topo, next, visited, start, found);
  }

  // If paths exhausted, pop and return
  visited.pop();
  return;
};

const inBounds = (topo: string[][], c: Coord) => {
  if (c.x < 0 || c.x >= topo[0].length) return false;
  if (c.y < 0 || c.y >= topo.length) return false;
  return true;
};

const getHeight = (topo: string[][], c: Coord) => {
  return Number(topo[c.y][c.x]);
};

const step = (start: Coord, dir: Coord) => {
  return { x: start.x + dir.x, y: start.y + dir.y };
};

export default part2;
