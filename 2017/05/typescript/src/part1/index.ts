const MAX_JUMPS = 1000000; // For dev purposes

const part1 = (input: string): string | null => {
  const list = input
    .trim()
    .split(/\n/)
    .map((instruction) => parseInt(instruction));

  let pos = 0;
  let jumps = 0;

  while (true && jumps < MAX_JUMPS) {
    jumps++;

    let offset = list[pos];
    let nextPos = pos + offset;
    list[pos]++;
    pos = nextPos;

    if (nextPos < 0 || nextPos >= list.length) break;
  }

  return jumps.toString();
};

export default part1;
