import { part1, part2 } from '../src/day/8'
import { readFile } from '../src/util'


readFile(8).then(file => {
  console.log(part1(file))
  console.log(part2(file))
});
