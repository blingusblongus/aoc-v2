type Coord = { x: number; y: number };
type Machine = { a: Coord; b: Coord; prize: Coord };

const part1 = (input: string) => {
  const machines = getMachines(input);
  let totalTokens = 0;

  for (let machine of machines) {
    totalTokens += getPrize(machine) || 0;
  }

  return totalTokens.toString();
};

const getPrize = (machine: Machine) => {
  let bestPressCost = Infinity;
  const maxAPresses = Math.min(
    Math.floor(machine.prize.x / machine.a.x),
    Math.floor(machine.prize.y / machine.a.y),
    100, // upper limit
  );

  for (let i = 0; i <= maxAPresses; ++i) {
    const x = machine.a.x * i;
    const y = machine.a.y * i;

    const remainder = {
      x: machine.prize.x - x,
      y: machine.prize.y - y,
    };
    if (
      remainder.x / machine.b.x > 100 || // Upper limit
      remainder.x % machine.b.x !== 0 ||
      remainder.y % machine.b.y !== 0 ||
      remainder.x / machine.b.x !== remainder.y / machine.b.y
    ) {
      // not possible
      continue;
    }

    const cost = calculateTokenCost(i, remainder.x / machine.b.x);

    if (cost < bestPressCost) bestPressCost = cost;
  }

  return bestPressCost < Infinity ? bestPressCost : null;
};

const calculateTokenCost = (aPresses: number, bPresses: number) => {
  return aPresses * 3 + bPresses;
};

const getMachines = (input: string) => {
  const machines = [];
  const machineStrs = input.trim().split(/\n\n/);

  /**
   * For each machine, match to get button/prize values.
   * Then, iterate through all combinations of buttons to find the least cost.
   */
  for (let machine of machineStrs) {
    const matches = machine.matchAll(/:\s(.*)/g);
    const matchArr = Array.from(matches);

    const aMatches = Array.from(matchArr[0][1].matchAll(/\+(\d+)/g));
    const aBtn = { x: parseInt(aMatches[0][1]), y: parseInt(aMatches[1][1]) };

    const bMatches = Array.from(matchArr[1][1].matchAll(/\+(\d+)/g));
    const bBtn = { x: parseInt(bMatches[0][1]), y: parseInt(bMatches[1][1]) };

    const prizeMatches = Array.from(matchArr[2][1].matchAll(/=(\d+)/g));
    const prize = {
      x: parseInt(prizeMatches[0][1]),
      y: parseInt(prizeMatches[1][1]),
    };

    machines.push({
      a: aBtn,
      b: bBtn,
      prize,
    });
  }

  return machines;
};

export default part1;
