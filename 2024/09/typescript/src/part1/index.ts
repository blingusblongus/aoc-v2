const part1 = (input: string) => {
  const diskMap = input
    .trim()
    .split("")
    .map((n) => parseInt(n));

  const expanded = expandDisk(diskMap);
  reallocate(expanded);
  return calculateChecksum(expanded).toString();
};

/** Reallocate disk in place */
const reallocate = (disk: number[]): void => {
  let firstOpenIdx = 0;

  const findOpenIdx = () => {
    for (let i = firstOpenIdx; i < disk.length; i++) {
      if (disk[i] === -1) {
        firstOpenIdx = i + 1;
        return i;
      }
    }
  };

  for (let i = disk.length - 1; i > -1; i--) {
    if (i <= firstOpenIdx) {
      const doubleCheckIdx = disk.indexOf(-1);
      if (doubleCheckIdx >= firstOpenIdx) {
        break;
      }
    }
    if (disk[i] === -1) {
      continue;
    }

    const val = disk[i];
    const idx = findOpenIdx()!;
    // console.log("reallocating", val, "to", idx);

    disk[idx] = val;
    disk[i] = -1;
    // console.log(disk.join("").replaceAll("-1", "."));
  }

  const middleSlice: number[] = [];

  console.log(firstOpenIdx);
  for (let i = firstOpenIdx - 30; i < firstOpenIdx + 30; i++) {
    middleSlice.push(disk[i]);
  }

  console.log(middleSlice);
};
const calculateChecksum = (nums: number[]): number => {
  let checksum = 0;
  for (let i = 0; i < nums.length; ++i) {
    if (nums[i] < 0) continue;

    checksum += nums[i] * i;
  }

  return checksum;
};

const expandDisk = (diskMap: number[]): number[] => {
  let expanded: number[] = [];
  let id = 0;
  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2 === 0) {
      for (let j = 0; j < diskMap[i]; j++) {
        expanded.push(id);
      }
    } else {
      for (let j = 0; j < diskMap[i]; j++) {
        expanded.push(-1);
      }
      id++;
    }
  }

  return expanded;
};

export default part1;
