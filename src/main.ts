import { part1, part2 } from '../src/day/10';
import { readFile } from '../src/util';


readFile(10).then(file => {
  console.log(part1(file));
  console.log(part2(file));
});
