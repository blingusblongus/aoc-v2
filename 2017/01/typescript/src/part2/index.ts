const part2 = (input: string) => {
  const digits = input.trim().split("");
  let sum = 0;

  if (digits.length % 2 !== 0) throw Error("List should have even length");

  const half = digits.length / 2;

  for (let i = 0; i < digits.length; ++i) {
    // process.env.TEST_DEBUG === "true" && console.log("i:", i, "next", i + half);
    let next = i + half < digits.length ? i + half : (i + half) % digits.length;

    let d1 = digits[i];
    let d2 = digits[next];
    if (d1 === d2) {
      sum += parseInt(d1);
    }
  }

  return sum.toString();
};

export default part2;
