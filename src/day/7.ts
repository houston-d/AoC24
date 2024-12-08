const example: string = "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20";

interface Row {
  'test': number;
  'remaining': number[];
}

const parseInput = (input:string): Row[] => {
  return input.split("\n").map(row => {
    const split = row.split(": ");
    const testVal = +split[0];
    const remaining = split[1].split(" ").map(Number);

    return {'test': testVal, 'remaining': remaining};
  })
}

const generateCombinations = (array: string[], length: number): string[][] => {
  if (length === 0) {
    return [[]];
  }

  const result: string[][] = [];
  const smallerCombinations = generateCombinations(array, length - 1);

  for (const combination of smallerCombinations) {
    for (const element of array) {
      result.push([...combination, element]);
    }
  }

  return result;
}

export const part1 = (input: string): number => {
  const parsedInput: Row[] = parseInput(input);
  const validOperators = ['+', '*'];

  return parsedInput.map((r: Row) => {
    const combinations = generateCombinations(validOperators, r['remaining'].length - 1);

    const matches =  combinations.map((comb: string[]) => {
      let total = r['remaining'][0];
      for (let i = 0; i < comb.length; i++) {
        if (comb[i] == '+') {
          total += r['remaining'][i + 1];
        } else if (comb[i] == '*') {
          total *= r['remaining'][i + 1];
        }

        if (total > r['test']) {
          return 0;
        }
      }

      return total == r['test'] ? 1 : 0;;
    }).map(Number).reduce((sum, current) => sum + current, 0);

    return matches > 0 ? r['test'] : 0;
  }).reduce((sum, current) => sum + current, 0);
}

export const part2 = (input: string): number => {
  const parsedInput: Row[] = parseInput(input);
  const validOperators = ['+', '*', '|'];

  return parsedInput.map((r: Row) => {
    const combinations = generateCombinations(validOperators, r['remaining'].length - 1);

    const matches =  combinations.map((comb: string[]) => {
      const newComb = comb;
      const newRemain = r['remaining'];
      let total = newRemain[0];
      
      for (let i = 0; i < newComb.length; i++) {
        if (newComb[i] == '+') {
          total += newRemain[i + 1];
        } else if (newComb[i] == '*') {
          total *= newRemain[i + 1];
        } else if (newComb[i] == '|') {
          total = +(JSON.stringify(total).concat(JSON.stringify(r['remaining'][i + 1])));
        }

        if (total > r['test']) {
          return 0;
        }
      }

      return total == r['test'] ? 1 : 0;
    }).map(Number).reduce((sum, current) => sum + current, 0);

    return matches > 0 ? r['test'] : 0;
  }).reduce((sum, current) => sum + current, 0);
}