const example1: string = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))"
const example2: string = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))"

const pattern1: RegExp = new RegExp('mul\\([0-9]{1,3}\\,[0-9]{1,3}\\)', 'g');
const pattern2: RegExp = new RegExp('mul\\([0-9]{1,3}\\,[0-9]{1,3}\\)|do\\(\\)|don\'t\\(\\)', 'g');

const extractMultiplier = (str: string): number => {
  return str.split("(")[1]
      .split(")")[0]
      .split(",")
      .map(Number)
      .reduce((prod, current) => prod * current, 1);
}

export const part1 = (input: string): number | undefined => {
  return input.replace("\n", "")
      .match(pattern1)
      ?.map((match: string) => extractMultiplier(match))
      .reduce((sum: number, current: number) => sum + current, 0);
};

export const part2 = (input: string): number => {
  let include = true;
  const consider: string[] = [];
  const matches = input.replace("\n", "").match(pattern2) ?? [];

  for (let m of matches) {
    if (include && /mul/g.test(m)) {
      consider.push(m);
    }
    if (/don\'t/g.test(m)) {
      include = false;
    } else if (/do/g.test(m)) {
      include = true;
    }
  }

  return consider.map(m => extractMultiplier(m))
      .reduce((sum, current) => sum + current, 0);
};
