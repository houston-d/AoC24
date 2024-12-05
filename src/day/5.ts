import { swapArray } from "../util";

const example: string = "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47";

const processInput = (input:string) => {
  const rules: string[] = [];
  const updates: number[][] = [];
  input.split("\n").forEach(r => {
    if (r.includes("|")) {
      rules.push(r);
    }

    if (r.includes(",")) {
      updates.push(r.split(",").map(Number))
    }
  });

  return {'rules': rules, 'updates': updates}
}

const isValid = (update: number[], rules: string[]) => {
  for (let i = 0; i < update.length; i++) {
    const curr = update[i];
    for (let j = i; j < update.length; j++) {
      const next = update[j];

      if (rules.includes(`${next}|${curr}`)) {
        return false;
      }
    }
  }
  return true;
}

export const part1 = (input: string): number => {
  const data = processInput(input);

  return data.updates.map(update => {
    if (isValid(update, data.rules)) {
      return update[(update.length - 1) / 2];
    }

    return 0;
  }).reduce((sum, current) => sum + current, 0);
}

export const part2 = (input: string): number => {
  const data = processInput(input);

  return data.updates.map(update => {
    let currUpdate = update;
    if (!isValid(currUpdate, data.rules)) {
      let i = 0;

      while (i < currUpdate.length) {
        let j = i;

        while (j < currUpdate.length) {
          if (data.rules.includes(`${currUpdate[j]}|${currUpdate[i]}`)) {
            currUpdate = swapArray(update, i, j);
            j = i;
            continue;
          }
          j++;
        }
        i ++;
      }

      return currUpdate[(currUpdate.length - 1) / 2];
    }

    return 0;
  }).reduce((sum, current) => sum + current, 0);
}