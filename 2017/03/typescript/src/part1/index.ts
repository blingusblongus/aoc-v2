type Direction = "left" | "right" | "up" | "down";
const part1 = (input: string) => {
  let target = parseInt(input.trim());

  let totalSteps = 1;
  let steps = 1;
  let targetSteps = 1;
  let turns = 0;
  let dir = "right";
  let [x, y] = [0, 0];

  let map = new Map<number, string>();

  const shouldTurn = () => steps >= targetSteps;
  const shouldIncreaseSteps = () => turns % 2 === 0;

  const step = () => {
    map.set(totalSteps, x + "," + y);

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
  };

  while (totalSteps <= target) {
    step();
  }

  const endCoordStr = map.get(target);
  if (typeof endCoordStr !== "string") throw Error("Invalid endcoord");
  const [endX, endY] = endCoordStr?.split(",").map((s) => parseInt(s));

  return getManhattanDistance(endX, endY).toString();
};

const getManhattanDistance = (x: number, y: number) => {
  return Math.abs(x) + Math.abs(y);
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

export default part1;
