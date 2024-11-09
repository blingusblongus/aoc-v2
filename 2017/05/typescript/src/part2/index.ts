const MAX_JUMPS = 100000000; // For dev purposes

const part2 = (input: string): string | null => {
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

    if (offset >= 3) {
      list[pos]--;
    } else {
      list[pos]++;
    }
    pos = nextPos;

    if (nextPos < 0 || nextPos >= list.length) break;
  }

  return jumps.toString();
};

export default part2;
