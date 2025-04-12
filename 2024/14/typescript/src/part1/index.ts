type Bot = {
  position: { x: number; y: number };
  velocity: { x: number; y: number };
};

const part1 = (input: string, height = 7, width = 11) => {
  const bots = parseInput(input);

  // printBots(bots, height, width);
  moveBots(bots, 100, height, width);
  // printBots(bots, height, width);

  const my = Math.floor(height / 2);
  const mx = Math.floor(width / 2);

  const quadCounts = countQuads(bots, my, mx);
  return quadCounts
    .reduce((prod: number, el: number) => prod * el, 1)
    .toString();
};

const countQuads = (bots: Bot[], my: number, mx: number) => {
  const tl = bots.filter(
    (bot) => bot.position.x < mx && bot.position.y < my,
  ).length;
  const tr = bots.filter(
    (bot) => bot.position.x > mx && bot.position.y < my,
  ).length;
  const bl = bots.filter(
    (bot) => bot.position.x < mx && bot.position.y > my,
  ).length;
  const br = bots.filter(
    (bot) => bot.position.x > mx && bot.position.y > my,
  ).length;

  return [tl, tr, bl, br];
};

const moveBots = (bots: Bot[], seconds: number, h: number, w: number) => {
  for (let bot of bots) {
    bot.position.x = (bot.position.x + seconds * bot.velocity.x) % w;
    bot.position.y = (bot.position.y + seconds * bot.velocity.y) % h;

    if (bot.position.x <= 0) bot.position.x = Math.abs(w + bot.position.x);
    if (bot.position.y <= 0) bot.position.y = Math.abs(h + bot.position.y);

    if (bot.position.x == w) bot.position.x = 0;
    if (bot.position.y == h) bot.position.y = 0;
  }
};

const parseInput = (input: string) => {
  const lines = input.trim().split(/\n\s*/);

  return lines.map((line) => {
    const re = /=([^\s]*)/g;

    const matches = Array.from(line.matchAll(re));
    const [px, py] = matches[0][1].split(",").map(Number);
    const [vx, vy] = matches[1][1].split(",").map(Number);

    return {
      position: { x: px, y: py },
      velocity: { x: vx, y: vy },
    };
  });
};

const printBots = (bots: Bot[], h: number, w: number) => {
  const grid: string[] = Array(h).fill(".".repeat(w));

  const map: { [key: string]: number } = {};

  for (let bot of bots) {
    const strPos = bot.position.x + "," + bot.position.y;
    if (map[strPos]) {
      map[strPos] += 1;
    } else {
      map[strPos] = 1;
    }
  }

  for (let pos in map) {
    const [x, y] = pos.split(",").map(Number);

    try {
      grid[y] =
        grid[y].substring(0, x) + `${map[pos]}` + grid[y].substring(x + 1);
    } catch (e) {
      console.log("error printing:", x, y);
    }
  }
  console.log(grid.join("\n"));
};

export default part1;
