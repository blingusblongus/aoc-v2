const part2 = (input: string) => {
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

  // check duplicates
  const usedWords = new Set<string>();
  for (const word of words) {
    if (usedWords.has(word)) {
      return false;
    } else {
      usedWords.add(word);
    }
  }

  // check anagrams
  for (let i = 0; i < words.length; ++i) {
    for (let j = i + 1; j < words.length; ++j) {
      if (isAnagram(words[i], words[j])) return false;
    }
  }

  return true;
};

type LetterMap = { [key: string]: number };
const isAnagram = (a: string, b: string) => {
  if (a.length !== b.length) return false;

  const maps: { a: LetterMap; b: LetterMap } = {
    a: {},
    b: {},
  };
  for (let i = 0; i < a.length; ++i) {
    if (maps.a[a[i]]) {
      maps.a[a[i]]++;
    } else {
      maps.a[a[i]] = 1;
    }
    if (maps.b[b[i]]) {
      maps.b[b[i]]++;
    } else {
      maps.b[b[i]] = 1;
    }
  }

  for (const key in maps.a) {
    if (maps.a[key] !== maps.b[key]) return false;
  }

  return true;
};

export default part2;
