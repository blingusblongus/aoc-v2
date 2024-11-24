type Registers = { [key: string]: number };
type Command = {
  action: { reg: string; dir: string; amt: number };
  cond: { reg: string; op: string; target: number };
};

const part2 = (input: string) => {
  const registers: Registers = {};
  const lines = input.trim().split(/\n/);
  let maxRegisterValue = -Infinity;

  const commands = lines.map((line) => parseLine(line, registers));

  for (const command of commands) {
    if (fulfillsCondition(command, registers)) {
      doAction(command, registers);

      if (maxRegisterValue < registers[command.action.reg])
        maxRegisterValue = registers[command.action.reg];
    }
  }

  return maxRegisterValue.toString();
};

// This purposefully has a `registers` sideeffect, but that could be changed
const parseLine = (line: string, registers: Registers): Command => {
  const [action, cond] = line.split(/\sif\s/);

  const [r1, dir, amt] = action.split(/\s/);
  const [r2, op, target] = cond.split(/\s/);

  // Ensure registers are initialized
  if (registers[r1] === undefined) registers[r1] = 0;
  if (registers[r2] === undefined) registers[r2] = 0;

  return {
    action: {
      reg: r1,
      dir,
      amt: parseInt(amt),
    },
    cond: {
      reg: r2,
      op,
      target: parseInt(target),
    },
  };
};

const doAction = (command: Command, registers: Registers) => {
  const { reg, dir, amt } = command.action;

  switch (dir) {
    case "inc":
      return (registers[reg] += amt);
    case "dec":
      return (registers[reg] -= amt);
    default:
      throw Error("Unhandled dir");
  }
};

const fulfillsCondition = (command: Command, registers: Registers) => {
  const { reg, op, target } = command.cond;
  if (registers[reg] === undefined)
    throw Error("Registers should be defined at this point");
  switch (op) {
    case "<":
      return registers[reg] < target;
    case "<=":
      return registers[reg] <= target;
    case ">":
      return registers[reg] > target;
    case ">=":
      return registers[reg] >= target;
    case "==":
      return registers[reg] == target;
    case "!=":
      return registers[reg] != target;
    default:
      throw Error("Unhandled operator" + op);
  }
};

export default part2;
