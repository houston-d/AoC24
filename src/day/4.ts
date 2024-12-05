import { sortStringList } from "../util";

const example: string = "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX"

const getDir = (i: number, j: number, iDir: number, jDir: number, matrix: string[][]): string => {
  return matrix[i][j] + 
      matrix[i + iDir][j + jDir] + 
      matrix[i + (2 * iDir)][j + (2 * jDir)] + 
      matrix[i + (3 * iDir)][j + (3 * jDir)]
}

export const part1 = (input: string): number => {

  const matrix: string[][] = input.split('\n').map(r => r.split(''));

  const colLength: number = matrix.length;
  const rowLength: number = matrix[0].length;

  let count: number = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] !== 'X') {
        continue;
      }

      if (i >= 3 && getDir(i, j, -1, 0, matrix) == 'XMAS') {
        count++;
      }

      if (i < colLength - 3 && getDir(i, j, 1, 0, matrix) == 'XMAS') {
        count++;
      }

      if (j >= 3 && getDir(i, j, 0, -1, matrix) == 'XMAS') {
        count++;
      }

      if (j < rowLength - 3 && getDir(i, j, 0, 1, matrix) == 'XMAS') {
        count++;
      }

      if (i >= 3 && j >= 3 && getDir(i, j, -1, -1, matrix) == 'XMAS') {
        count++;
      }

      if (i >= 3 && j < rowLength - 3 && getDir(i, j, -1, 1, matrix) == 'XMAS') {
        count++;
      }

      if (i < colLength - 3 && j >= 3 && getDir(i, j, 1, -1, matrix) == 'XMAS') {
        count++;
      }

      if (i < colLength - 3 && j < rowLength - 3 && getDir(i, j, 1, 1, matrix) == 'XMAS') {
        count++;
      }
    }
  }

  return count;
}

export const part2 = (input: string): number => {
  const matrix: string[][] = input.split('\n').map(r => r.split(''));
  let count: number = 0;

  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[0].length - 1; j++) {
      if (matrix[i][j] !== 'A') {
        continue;
      }

      const firstDiagonal = sortStringList([matrix[i-1][j-1], matrix[i+1][j+1]]);
      const secondDiagonal = sortStringList([matrix[i-1][j+1], matrix[i+1][j-1]]);

      if (firstDiagonal[0] == 'M' && secondDiagonal[0] == 'M' && firstDiagonal[1] == 'S' && secondDiagonal[1] == 'S') {
        count++;
      }
    }
  }
  return count
}