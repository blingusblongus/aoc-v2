const part1 = (input: string) => {
  const lines = input.trim().split(/\n/);

  const nodes = lines.map((line) => parseNode(line));

  const heldSet = new Set<string>();
  for (const node of nodes) {
    if (node.children) node.children.forEach((child) => heldSet.add(child));
  }

  for (const node of nodes) {
    if (!heldSet.has(node.name)) return node.name;
  }

  return null;
};

const parseNode = (line: string) => {
  const name = line.split(/\s/)[0];
  const children = line.split("-> ")[1]?.split(", ");
  const weight = parseInt(line.match(/\d+/)![0]);

  return {
    name,
    children,
    weight,
  };
};

export default part1;
