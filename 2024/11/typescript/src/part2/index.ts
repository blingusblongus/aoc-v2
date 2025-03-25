type StoneMap = { [key: string]: { next?: string[]; count: number } };
const part2 = (input: string, blinks: number) => {
  let stones = input;

  let stoneMap: StoneMap = {};
  let nextStoneMap: StoneMap = {};

  for (let stone of stones.trim().split(" ")) {
    addToStoneMap(stoneMap, stoneMap, stone, 1);
  }

  // console.log("initial stoneMap", stoneMap);

  // console.time("blink timer");
  for (let i = 1; i <= blinks; ++i) {
    for (let stone in stoneMap) {
      const nextStones = stoneMap[stone].next;

      if (!nextStones) throw Error("next stones logically must be set");

      nextStones.forEach((s) =>
        addToStoneMap(stoneMap, nextStoneMap, s, stoneMap[stone].count),
      );
    }

    stoneMap = nextStoneMap;
    nextStoneMap = {};
    // console.timeLog("blink timer", i);
  }

  let count = 0;
  for (let stone in stoneMap) {
    count += stoneMap[stone].count;
  }

  // console.log(count);
  return count.toString();
};

const addToStoneMap = (
  fromMap: StoneMap,
  toMap: StoneMap,
  stone: string,
  count: number,
) => {
  toMap[stone] = {
    next: fromMap[stone]?.next || transform(stone),
    count: (toMap[stone]?.count || 0) + (count || 1),
  };
};

const transform = (stone: string) => {
  if (stone === "0") return ["1"];
  if (stone.length % 2 === 0) {
    let mid = stone.length / 2;
    return [stone.substring(0, mid), stone.substring(mid)].map((s) =>
      parseInt(s).toString(),
    );
  }
  return [(parseInt(stone) * 2024).toString()];
};

export default part2;
