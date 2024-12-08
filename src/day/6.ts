
const example: string = "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...";

const getGuardPos = (matrix: string[][]): number[] => {
  return matrix.map((row, i) => {
    const guard = row.indexOf("^");

    if (guard >= 0) {
      return [i, guard];
    }

    return [-1, -1];
  }).filter(pos => pos[0] > -1).flat();
}

const traverse = (matrix: string[][], guardPos: number[]) => {
  const dirCycle = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  let curDir = 0;
  const visited = [guardPos];

  let newGuardPos = [guardPos[0] + dirCycle[curDir][0], guardPos[1] + dirCycle[curDir][1]];
  let count = 0;

  do {
    if (matrix[newGuardPos[0]][newGuardPos[1]] == "#") {
      curDir = (curDir + 1) % 4;
    } else {
      matrix[guardPos[0]][guardPos[1]] = "X";
      matrix[newGuardPos[0]][newGuardPos[1]] = "^";
      guardPos = newGuardPos;
      visited.push(newGuardPos);
    }

    count++;

    if (count > 9999) {
      return [];
    }

    newGuardPos = [guardPos[0] + dirCycle[curDir][0], guardPos[1] + dirCycle[curDir][1]];
  } while (0 <= newGuardPos[0] && newGuardPos[0] < matrix.length && 0 <= newGuardPos[1] && newGuardPos[1] < matrix[0].length);

  return visited;
}

const filterVisited = (visited: number[][]): number[][] => {
  const unique: string[] = [];

  return visited.filter(pos => {
    const posString = JSON.stringify(pos);

    if (unique.includes(posString)) {
      return false;
    }

    unique.push(posString);

    return true;
  })
}

const countLoops = (matrix: string[][], visited: number[][]): number => {
  const guardPos = getGuardPos(matrix);
  return visited.map(pos => {
    if (JSON.stringify(pos) == JSON.stringify(guardPos)) {
      return 0;
    }

    const newMatrix = matrix.map(function(arr) {
      return arr.slice();
    });

    newMatrix[pos[0]][pos[1]] = "#";

    return traverse(newMatrix, guardPos).length === 0 ? 1 : 0;
  }).map(Number).reduce((sum, curr) => sum + curr, 0);
}

export const part1 = (input: string): number => {
  input = example;
  const matrix: string[][] = input.split('\n').map(r => r.split(''));
  let guardPos: number[] = getGuardPos(matrix);
  const visited = traverse(matrix, guardPos);

  return filterVisited(visited).length;
}

export const part2 = (input: string): number => {
  const matrix: string[][] = input.split('\n').map(r => r.split(''));
  const newMatrix = matrix.map(function(arr) {
    return arr.slice();
  });
  let guardPos: number[] = getGuardPos(newMatrix);
  const visited: number[][] = traverse(newMatrix, guardPos);
  const filtered: number[][] = filterVisited(visited);
  return countLoops(matrix, filtered);
}