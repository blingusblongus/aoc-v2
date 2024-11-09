type Direction = "left" | "right" | "up" | "down";
const part2 = (input: string) => {
  let target = parseInt(input.trim());

  let totalSteps = 1;
  let steps = 1;
  let targetSteps = 1;
  let turns = 0;
  let dir = "right";
  let [x, y] = [0, 0];

  let map = new Map<string, number>();

  const shouldTurn = () => steps >= targetSteps;
  const shouldIncreaseSteps = () => turns % 2 === 0;

  const getNeighborCoords = () => {
    return [
      `${x + 1},${y}`,
      `${x + 1},${y + 1}`,
      `${x},${y + 1}`,
      `${x - 1},${y + 1}`,
      `${x - 1},${y}`,
      `${x - 1},${y - 1}`,
      `${x},${y - 1}`,
      `${x + 1},${y - 1}`,
    ];
  };

  const step = () => {
    const value = getNeighborCoords().reduce((sum, coord) => {
      if (!map.has(coord)) return sum;
      return sum + map.get(coord)!;
    }, 0);

    map.set(x + "," + y, value || 1);

    switch (dir) {
      case "right":
        x++;
        break;
      case "left":
        x--;
        break;
      case "up":
        y++;
        break;
      case "down":
        y--;
        break;
      default:
        throw Error("Invalid direction");
    }

    if (shouldTurn()) {
      dir = nextDir(dir);
      turns++;
      steps = 0;

      if (shouldIncreaseSteps()) {
        targetSteps++;
      }
    }

    steps++;
    totalSteps++;
    return value;
  };

  while (true) {
    const writeValue = step();
    if (writeValue > target) {
      return writeValue.toString();
    }
  }
};

const nextDir = (dir: Direction) => {
  switch (dir) {
    case "up":
      return "left";
    case "left":
      return "down";
    case "down":
      return "right";
    case "right":
      return "up";
    default:
      throw Error("Invalid direction");
  }
};

export default part2;
