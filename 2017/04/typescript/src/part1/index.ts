const part1 = (input: string) => {
  const passwords = input.trim().split(/\n/);

  let validPasswordCount = 0;

  for (const password of passwords) {
    if (isValidPassword(password)) validPasswordCount++;
  }

  // Solve
  return validPasswordCount.toString();
};

const isValidPassword = (password: string) => {
  const words = password.trim().split(/\s/);
  const usedWords = new Set<string>();

  for (const word of words) {
    if (usedWords.has(word)) {
      return false;
    } else {
      usedWords.add(word);
    }
  }

  return true;
};

export default part1;
