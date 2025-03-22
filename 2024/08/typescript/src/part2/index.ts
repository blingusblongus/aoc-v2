type CharMap = string[][];
type Coord = { x: number; y: number };

const part1 = (input: string) => {
  const charMap = getCharMap(input);
  const bounds = getBounds(charMap);
  const antennae = mapAntennae(charMap);

  const nodes = new Set<string>();

  for (const antType in antennae) {
    const ants = antennae[antType];

    for (let i = 0; i < ants.length; ++i) {
      for (let j = i + 1; j < ants.length; ++j) {
        const a = ants[i];
        const b = ants[j];
        const offset = getOffset(a, b);

        // These are automatically antinodes,
        // but so for simplicity, we'll add them here and then branch off in either direction
        nodes.add(coordToStr(a));
        nodes.add(coordToStr(b));

        let nextA = subtractOffset(a, offset);
        while (isInBounds(nextA, bounds)) {
          nodes.add(coordToStr(nextA));
          nextA = subtractOffset(nextA, offset);
        }

        let nextB = addOffset(a, offset);
        while (isInBounds(nextB, bounds)) {
          nodes.add(coordToStr(nextB));
          nextB = addOffset(nextB, offset);
        }
      }
    }
  }

  // printResult(input, nodes);

  // Solve
  return nodes.size.toString();
};

export default part1;

const isInBounds = (c: Coord, upperBounds: Coord) => {
  if (c.x < 0 || c.y < 0) return false;
  if (c.x > upperBounds.x || c.y > upperBounds.y) return false;

  return true;
};

const getCharMap = (input: string): CharMap => {
  return input
    .trim()
    .split(/\n+/)
    .map((line) => line.split(""));
};

const getBounds = (arr: Array<Array<unknown>>): { x: number; y: number } => {
  return { x: arr[0].length - 1, y: arr.length - 1 };
};

const mapAntennae = (charMap: CharMap) => {
  let result: { [key: string]: Array<Coord> } = {};

  for (let y = 0; y < charMap.length; ++y) {
    for (let x = 0; x < charMap[y].length; ++x) {
      const char = charMap[y][x];
      if (char !== ".") {
        if (result[char]) {
          result[char].push({ x, y });
        } else {
          result[char] = [{ x, y }];
        }
      }
    }
  }

  return result;
};

const getOffset = (coord1: Coord, coord2: Coord) => {
  return { x: coord2.x - coord1.x, y: coord2.y - coord1.y };
};

const addOffset = (coord1: Coord, offset: Coord) => {
  return { x: coord1.x + offset.x, y: coord1.y + offset.y };
};

const subtractOffset = (coord1: Coord, offset: Coord) => {
  return { x: coord1.x - offset.x, y: coord1.y - offset.y };
};

const coordToStr = (c: Coord) => c.x + "," + c.y;

const printResult = (input: string, nodeSet: Set<string>) => {
  const lines: string[] = input.split(/\n/);

  for (let s of nodeSet.values()) {
    const [x, y] = s.split(",").map((el) => Number(el));
    lines[y] = lines[y].substring(0, x) + "#" + lines[y].substring(x + 1);
  }

  console.log(lines.join("\n"));
};
