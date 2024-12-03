const example: string = "3   4\n4   3\n2   5\n1   3\n3   9\n3   3";

export const part1 = (input: string): number => {
  let rows: string[] = input.split("\n");
  let first: number[] = [];
  let second: number[] = [];

  rows.forEach((row: string) => {
    const split: string[] = row.split("   ");
    first.push(+split[0]);
    second.push(+split[1]);
  });

  const first_sorted: number[] = first.sort((a: number, b: number) => {
    return a - b;
  });

  const second_sorted: number[] = second.sort((a: number, b: number) => {
    return a - b;
  });

  return first_sorted
      .map((element, index) => Math.abs(element - second_sorted[index]))
      .reduce((sum, current) => sum + current, 0);
};

export const part2 = (input: string): number => {
  let rows: string[] = input.split("\n");
  let first: number[] = [];
  let second: number[] = [];

  rows.forEach((row: string) => {
    const split: string[] = row.split("   ");
    first.push(+split[0]);
    second.push(+split[1]);
  });

  const counter: { [id: number]: number} = {};

  second.forEach(ele => {
      if (counter[ele]) {
          counter[ele] += 1;
      } else {
          counter[ele] = 1;
      }
  });

  return first.map(ele => ele * (counter[ele] ?? 0)).reduce((sum, curr) => sum + curr, 0);
}
