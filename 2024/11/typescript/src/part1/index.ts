const part1 = (input: string) => {
  let stones = input;

  let blinks = 25;
  // console.time("blink");
  for (let i = 1; i <= blinks; ++i) {
    // console.timeLog("blink", i);
    stones = blinkStr(strToStones(stones));
  }

  // console.time("count");
  let spaces = 0;
  for (let char of stones) {
    if (char === " ") spaces++;
  }
  // console.timeEnd("count");

  return spaces + 1;
};

export const blink = (stones: Stone[]): Stone[] => {
  let result: Stone[] = [];

  for (let i = stones.length - 1; i >= 0; --i) {
    const stone = stones[i];
    result = [...stone.change(), ...result];
  }
  return result;
};

export const blinkStr = (stones: Stone[]): string => {
  let result = "";

  for (let i = stones.length - 1; i >= 0; --i) {
    const newStones = stones[i].change();
    result = printStones(newStones) + " " + result;
    // result = [...stone.change(), ...result];
  }
  return result.trim();
};

export const strToStones = (input: string) => {
  return input
    .trim()
    .split(/\s/)
    .map((s) => new Stone(s));
};

export const printStones = (stones: Stone[]): string => {
  return stones.map((stone) => stone.str).join(" ");
};

class Stone {
  public str;
  public int;

  public change() {
    if (this.int === 0) {
      return [new Stone("1")];
    } else if (this.str.length % 2 === 0) {
      const half = this.str.length / 2;
      return [
        new Stone(this.str.substring(0, half)),
        new Stone(this.str.substring(half)),
      ];
    } else {
      return [new Stone((this.int * 2024).toString())];
    }
  }
  constructor(strRepresentation: string) {
    this.int = parseInt(strRepresentation);
    this.str = this.int.toString();
  }
}

export default part1;
