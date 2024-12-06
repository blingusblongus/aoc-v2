const part1 = (input: string) => {
  let [unparsedRules, unparsedUpdates] = input.trim().split(/\n\n/);

  const rules = unparsedRules.split(/\n/).map((line) => line.split(/\|/));
  const updates = unparsedUpdates.split(/\n/).map((line) => line.split(/,/));

  const beforeMap: { [key: string]: string[] } = {};
  const afterMap: { [key: string]: string[] } = {};

  for (let [first, second] of rules) {
    if (beforeMap[second]) {
      beforeMap[second].push(first);
    } else {
      beforeMap[second] = [first];
    }

    // if (afterMap[first]) {
    //   afterMap[first].push(second);
    // } else {
    //   afterMap[first] = [second];
    // }
  }

  const isOrdered = (update: string[]): boolean => {
    for (let i = 0; i < update.length - 1; ++i) {
      const target = update[i];
      if (!beforeMap[target]) continue;

      for (let j = i + 1; j < update.length; ++j) {
        if (beforeMap[target].includes(update[j])) {
          return false;
        }
      }
    }
    return true;
  };

  let result = 0;
  for (let update of updates) {
    if (isOrdered(update)) {
      result += parseInt(getMidPage(update));
    }
  }

  return result.toString();
};

const getMidPage = (update: string[]): string => {
  return update[Math.floor(update.length / 2)];
};

export default part1;
