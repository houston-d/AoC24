const example: string = "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............";

interface Location {
  [key: string]: Antenna[];
}

interface Antenna {
  i: number;
  j: number;
}

let iMax: number = 0;
let jMax: number = 0;

const isInMatrix = (antinode: Antenna): boolean => {
  return antinode.i >= 0 && antinode.i < iMax && 0 <= antinode.j && antinode.j < jMax;
}

const getLocations = (matrix: string[][]): Location => {
  const locations: Location = {};

  matrix.forEach((r: string[], i: number) => {
    r.forEach((c: string, j: number) => {
      if (c == '.') {
        return;
      }

      const toSave: Antenna = {i: i, j: j};

      locations[c] ? locations[c].push(toSave) : locations[c] = [toSave];
    })
  });

  return locations;
}

const iterateFrequency = (iUnit: number, jUnit: number, start: Antenna): Antenna[] => {
  let curr: Antenna = {i: start.i, j: start.j};
  const valid: Antenna[] = [];
  
  while (isInMatrix(curr)) {
    if (Number.isInteger(curr.i) && Number.isInteger(curr.j)) {
      valid.push({i: Math.round(curr.i), j: Math.round(curr.j)})
    }

    curr = {i: curr.i + iUnit, j: curr.j + jUnit}
  }

  return valid;
}

export const part1 = (input: string): number => {
  const matrix: string[][] = input.split("\n").map(r => r.split(''));
  const locations: Location = getLocations(matrix);

  iMax = matrix.length;
  jMax = matrix[0].length;
  
  const validAntinodes: Antenna[] = [];
  const seen: string[] = [];

  for (let [key, value] of Object.entries(locations)) {
    for (let i = 0; i < value.length - 1; i++) {
      for (let j = i + 1; j < value.length; j++) {
        const first: Antenna = value[i];
        const second: Antenna = value[j];
        const iDiff = first.i - second.i;
        const jDiff = first.j - second.j;

        const anti1: Antenna = {i: first.i + iDiff, j: first.j + jDiff};
        const anti2: Antenna = {i: second.i - iDiff, j: second.j - jDiff};

        if (isInMatrix(anti1) && !seen.includes(JSON.stringify(anti1))) {
          validAntinodes.push(anti1);
          seen.push(JSON.stringify(anti1));
        }

        if (isInMatrix(anti2) && !seen.includes(JSON.stringify(anti2))) {
          validAntinodes.push(anti2);
          seen.push(JSON.stringify(anti2));
        }
      }
    }
  }

  return validAntinodes.length;
}

export const part2 = (input: string): number => {
  const matrix: string[][] = input.split("\n").map(r => r.split(''));
  const locations: Location = getLocations(matrix);

  iMax= matrix.length;
  jMax = matrix[0].length;
  
  const validAntinodes: Antenna[] = [];
  const seen: string[] = [];

  for (let [key, value] of Object.entries(locations)) {
    for (let i = 0; i < value.length - 1; i++) {
      for (let j = i + 1; j < value.length; j++) {
        const first: Antenna = value[i];
        const second: Antenna = value[j];

        const iDiff: number = first.i - second.i;
        const jDiff: number = first.j - second.j;
        
        const anti1: Antenna[] = iterateFrequency(iDiff, jDiff, first);
        const anti2: Antenna[] = iterateFrequency(-iDiff, -jDiff, second);

        anti1.forEach((a: Antenna) => {
          if (isInMatrix(a) && !seen.includes(JSON.stringify(a))) {
            validAntinodes.push(a);
            seen.push(JSON.stringify(a))
          }
        });

        anti2.forEach((a: Antenna) => {
          if (isInMatrix(a) && !seen.includes(JSON.stringify(a))) {
            validAntinodes.push(a);
            seen.push(JSON.stringify(a))
          }
        });
      }
    }
  }

  return validAntinodes.length;
}