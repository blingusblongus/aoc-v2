type Coord = {
  x: number;
  y: number;
};
type Plot = Coord & {
  plant: string;
  strCoord: string;
  region?: number;
  fences: number;
};
type Region = {
  count: number;
  fences: number;
  plant: string;
};

const part1 = (input: string) => {
  const garden = textToGarden(input);
  let currentRegion = 1;

  for (let y = 0; y < garden.length; ++y) {
    for (let x = 0; x < garden[0].length; ++x) {
      const plot = garden[y][x];

      if (plot.region) continue;

      const visited: Plot[] = [];
      const regionNumber = getRegion(garden, plot, plot.plant, visited);

      if (regionNumber) {
        visited.forEach((plot) => (plot.region = regionNumber));
      } else {
        visited.forEach((plot) => (plot.region = currentRegion));
        currentRegion += 1;
      }
    }
  }

  const regions: { [key: number]: Region } = {};
  // Diagnostic
  for (let y = 0; y < garden.length; ++y) {
    for (let x = 0; x < garden[0].length; ++x) {
      const plot = garden[y][x];
      const region = plot.region!;
      if (regions[region]) {
        regions[region].count += 1;
        regions[region].fences += plot.fences;
      } else {
        regions[region] = {
          count: 1,
          plant: plot.plant,
          fences: plot.fences,
        };
      }
    }
  }

  let totalCost = 0;
  for (let region in regions) {
    totalCost += getRegionCost(regions[region]);
  }

  // Solve
  return totalCost.toString();
};

const getRegionCost = (region: Region) => {
  return region.fences * region.count;
};

const getRegion = (
  garden: Plot[][],
  plot: Plot,
  plantType: string,
  visited: Plot[],
): number | null => {
  visited.push(plot);
  let regionNumber: number | null = null;

  for (let dir of dirs) {
    const adjacent = getAdjacent(garden, plot, dir);

    // If not same plantType, inc fences
    if (!adjacent || adjacent.plant !== plantType) {
      plot.fences += 1;
      continue;
    }

    // Check if already visited
    if (visited.some((p) => adjacent.x === p.x && adjacent.y === p.y)) continue;

    // if region found, set regionNumber
    regionNumber = getRegion(garden, adjacent, plantType, visited);
  }

  return regionNumber || null;
};

const dirs = [
  { x: 1, y: 0 },
  { x: 0, y: -1 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
];

const getAdjacent = (garden: Plot[][], plot: Plot, dir: Coord): Plot | null => {
  const nextCoord = { x: plot.x + dir.x, y: plot.y + dir.y };
  if (nextCoord.x < 0 || nextCoord.x >= garden[0].length) return null;
  if (nextCoord.y < 0 || nextCoord.y >= garden.length) return null;

  return garden[nextCoord.y][nextCoord.x];
};

const textToGarden = (input: string): Plot[][] => {
  return input
    .trim()
    .split(/\n/)
    .map((row, y) =>
      row.split("").map((plant, x) => ({
        x,
        y,
        plant,
        fences: 0,
        strCoord: `${x},${y}`,
      })),
    );
};

export default part1;
