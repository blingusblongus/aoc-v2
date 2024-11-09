const MAX_CYCLES = 100000; // For dev purposes

const part2 = (input: string): string | null => {
  const blocks = input
    .trim()
    .split(/\s+/)
    .map((block) => Number(block));

  const configurations = new Map<string, number>();

  let cycles = 0;
  while (cycles <= MAX_CYCLES) {
    const configStr = blocks.join(",");
    if (configurations.has(configStr)) {
      return (cycles - configurations.get(configStr)!).toString();
    }
    configurations.set(configStr, cycles);
    redistribute(blocks);
    cycles++;
  }

  return null;
};

const redistribute = (blocks: number[]) => {
  let maxVal = 0;
  for (let block of blocks) {
    if (block > maxVal) maxVal = block;
  }

  // Get first block in case of ties
  const idx = blocks.indexOf(maxVal);

  // Redistribute blocks
  const blocksToDistribute = blocks[idx];
  blocks[idx] = 0;

  let idxToModify = idx + 1;
  for (let i = blocksToDistribute; i > 0; i--) {
    if (blocks[idxToModify] === undefined) {
      idxToModify = 0;
    }

    blocks[idxToModify]++;
    idxToModify++;
  }
};

export default part2;
