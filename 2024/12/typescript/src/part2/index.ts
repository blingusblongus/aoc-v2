type Coord = {
  x: number;
  y: number;
};
type Direction = Coord & {
  name: string;
};
type Plot = Coord & {
  plant: string;
  strCoord: string;
  region?: number;
  fences: string[];
};
type Region = {
  count: number;
  plant: string;
  plots: Plot[];
};

const part2 = (input: string) => {
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

  // Consolidate plots into regions
  const regions: { [key: number]: Region } = {};
  for (let y = 0; y < garden.length; ++y) {
    for (let x = 0; x < garden[0].length; ++x) {
      const plot = garden[y][x];
      const region = plot.region!;
      if (regions[region]) {
        regions[region].count += 1;
        regions[region].plots.push(plot);
      } else {
        regions[region] = {
          count: 1,
          plant: plot.plant,
          plots: [plot],
        };
      }
    }
  }

  let totalCost = 0;
  for (let region in regions) {
    totalCost += getRegionCost(regions[region]);
  }

  return totalCost.toString();
};

const getFences = (region: Region) => {
  let fenceCount = 0;

  /*
   * For each direction, and for each row/column that has a corresponding fence,
   * we increment dirFences when we see that the fence ends
   */
  for (let dir of dirs) {
    let dirFences = 0; // Not necessary to track at this level, but good for debugging
    const plots = region.plots.filter((p) => p.fences.includes(dir.name));

    // This is kind of gross, doing rows and columns together,
    // since either rows or cols will be empty based on dir,
    // but it just turned out easy to write it this way.
    const rows: { [key: number]: Plot[] } = {};
    const cols: { [key: number]: Plot[] } = {};
    plots.forEach((p) => {
      if (["up", "down"].includes(dir.name)) {
        if (rows[p.y]) {
          rows[p.y].push(p);
        } else {
          rows[p.y] = [p];
        }
      } else {
        if (cols[p.x]) {
          cols[p.x].push(p);
        } else {
          cols[p.x] = [p];
        }
      }
    });

    for (let key in rows) {
      const row = rows[key];
      for (let i = 0; i < row.length; ++i) {
        if (!row[i + 1] || row[i + 1].x !== row[i].x + 1) {
          dirFences += 1;
        }
      }
    }

    for (let key in cols) {
      const col = cols[key];
      for (let i = 0; i < col.length; ++i) {
        if (!col[i + 1] || col[i + 1].y !== col[i].y + 1) {
          dirFences += 1;
        }
      }
    }
    fenceCount += dirFences;
  }
  return fenceCount;
};

const getRegionCost = (region: Region) => {
  return getFences(region) * region.count;
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
      plot.fences.push(dir.name);
      continue;
    }

    // Check if already visited
    if (visited.some((p) => adjacent.x === p.x && adjacent.y === p.y)) continue;

    // if region found, set regionNumber
    regionNumber = getRegion(garden, adjacent, plantType, visited);
  }

  return regionNumber || null;
};

const dirs: Direction[] = [
  { x: 1, y: 0, name: "right" },
  { x: 0, y: -1, name: "down" },
  { x: -1, y: 0, name: "left" },
  { x: 0, y: 1, name: "up" },
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
        fences: [],
        strCoord: `${x},${y}`,
      })),
    );
};

export default part2;
