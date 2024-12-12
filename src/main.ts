import { part1, part2 } from "../src/day/12";
import { readFile } from "../src/util";

readFile(12).then((file) => {
    console.time("part1");
    console.log(part1(file));
    console.timeEnd("part1");
    console.time("part2");
    console.log(part2(file));
    console.timeEnd("part2");
});
