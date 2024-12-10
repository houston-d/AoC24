import { getAllIndexesForValue } from "../util";

const example: string = "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732";

interface xy {
  x: number;
  y: number;
}

const DIRS: xy[] = [{x: -1, y: 0}, {x: 1, y: 0}, {x: 0, y: -1}, {x: 0, y: 1}];
const NO_RESULT: xy = {x: -1, y: -1};

let X_MAX: number = 0;
let Y_MAX: number = 0;

const parseInput = (input: string): number[][] => {
  const parsed = input.split("\n").map(c => c.split("").map(Number));
  X_MAX = parsed.length;
  Y_MAX = parsed[0].length;

  return parsed;
}

const getTrailHeads = (matrix: number[][]): xy[] => {
  return matrix.flatMap((row, x) => {
    return getAllIndexesForValue(0, row).map(y => ({x, y}));
  });
}

const isInMatrix = (a: xy): boolean => {
  return a.x >= 0 && a.x < X_MAX && 0 <= a.y && a.y < Y_MAX;
}

const recursiveSearch = (curr: xy[], matrix: number[][]): xy[] => {
  const currentValue = matrix[curr[curr.length - 1].x][curr[curr.length - 1].y];

  if (currentValue == 9) {
    return [curr[curr.length - 1]];
  }

  return DIRS.flatMap(d => {
    const next: xy = {x: curr[curr.length - 1].x + d.x, y: curr[curr.length - 1].y + d.y}

    if (isInMatrix(next) && matrix[next.x][next.y] == currentValue + 1) {
      return recursiveSearch([...curr, next], matrix);
    }

    return NO_RESULT;
  }).filter(x => x!= NO_RESULT);
}

export const part1 = (input: string): number => {
  const matrix: number[][] = parseInput(input);
  const trailHeads: xy[] = getTrailHeads(matrix);

  return trailHeads.map(t => {
    return recursiveSearch([t], matrix)
        .filter((obj, index, self) =>
          index === self.findIndex((t) => t.x === obj.x && t.y === obj.y)
        ).length;
  }).reduce((sum, current) => sum + current, 0);
}

export const part2 = (input: string): number => {
  const matrix: number[][] = parseInput(input);
  const trailHeads: xy[] = getTrailHeads(matrix);

  return trailHeads.map(t => {
    return recursiveSearch([t], matrix).length;
  }).reduce((sum, current) => sum + current, 0);
}