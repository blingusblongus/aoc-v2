const part2 = (input: string) => {
  console.log("part2========");
  let stones = input;
  // stones = "125 17";

  let blinks = 35;
  console.time("blink");
  for (let i = 1; i <= blinks; ++i) {
    console.timeLog("blink", i);
    stones = blinkStr(stones);
    console.log("num stones", stones.trim().split(" ").length);
    // console.log(i, "blinks", stones);
  }

  console.time("count");
  let spaces = 0;
  for (let char of stones) {
    if (char === " ") spaces++;
  }
  console.timeEnd("count");

  return spaces + 1;
};

export const blinkStr = (stones: string): string => {
  let result = "";

  let word = "";
  for (let i = 0; i < stones.length + 1; ++i) {
    const char = stones[i];
    if (char === " " || !char) {
      const stone = new Stone(word);
      // console.log(stone);

      for (let s of stone.change()) {
        if (result !== "") {
          result += " " + s.str;
        } else {
          result = s.str;
        }
      }
      word = "";
    } else {
      word += char;
    }
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

export default part2;
