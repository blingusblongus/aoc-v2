const part2 = (input: string) => {
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
    if (!isOrdered(update)) {
      // console.log("fixing...", update);
      const newUpdate: string[] = [];
      for (let i = 0; i < update.length; ++i) {
        let numToAdd = update[i];
        let idx = 0;

        if (beforeMap[numToAdd]) {
          for (let j = 0; j < newUpdate.length; j++) {
            if (beforeMap[numToAdd].includes(newUpdate[j])) {
              idx = newUpdate.indexOf(newUpdate[j]) + 1;
            }
          }

          if (idx === newUpdate.length) {
            newUpdate.push(numToAdd);
          } else {
            newUpdate.splice(idx, 0, numToAdd);
          }

          // const mustComeAfter = update.filter((num) =>
          //   beforeMap[numToAdd].includes(num),
          // );
        } else {
          newUpdate.splice(0, 0, numToAdd);
        }
        // console.log(newUpdate);
      }
      result += parseInt(getMidPage(newUpdate));
    }
  }

  return result.toString();
};

const getMidPage = (update: string[]): string => {
  return update[Math.floor(update.length / 2)];
};

export default part2;
