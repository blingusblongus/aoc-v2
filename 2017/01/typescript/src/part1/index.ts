const part1 = (input: string) => {
  const digits = input.trim().split("");
  let sum = 0;

  for (let i = 0; i < digits.length; ++i) {
    let d1 = digits[i];
    let d2 = i + 1 < digits.length ? digits[i + 1] : digits[0];
    if (d1 === d2) {
      sum += parseInt(d1);
    }
  }

  return sum.toString();
};

export default part1;
