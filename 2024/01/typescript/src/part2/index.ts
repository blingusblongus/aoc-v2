const part2 = (input: string) => {
  const lines = input.trim().split(/\n/);

  const left = [];
  // const right: { [key: number]: number } = {};
  const right = new Map<number, number>();

  for (const line of lines) {
    const [l, r] = line.split(/\s+/).map((n) => parseInt(n));
    left.push(l);

    if (right.has(r)) {
      right.set(r, right.get(r)! + 1);
    } else {
      right.set(r, 1);
    }
  }

  let similarityScore = 0;

  for (let i = 0; i < left.length; ++i) {
    similarityScore += left[i] * (right.get(left[i]) || 0);
  }

  return similarityScore.toString();
};

export default part2;
