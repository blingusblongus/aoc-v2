const part1 = (input: string) => {
  const lines = input.trim().split(/\n/);

  const left = [];
  const right = [];

  for (const line of lines) {
    const [l, r] = line.split(/\s+/);
    left.push(parseInt(l));
    right.push(parseInt(r));
  }

  left.sort();
  right.sort();

  if (left.length !== right.length) throw Error("lists should be equal length");

  let totalDifference = 0;

  for (let i = 0; i < left.length; ++i) {
    totalDifference += Math.abs(left[i] - right[i]);
  }

  return totalDifference.toString();
};

export default part1;
