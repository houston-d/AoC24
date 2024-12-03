"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
const example = "3   4\n4   3\n2   5\n1   3\n3   9\n3   3";
const part1 = (input) => {
    let rows = input.split("\n");
    let first = [];
    let second = [];
    rows.forEach((r) => {
        const split = r.split("   ");
        first.push(+split[0]);
        second.push(+split[1]);
    });
    const first_sorted = first.sort((a, b) => {
        return a - b;
    });
    const second_sorted = second.sort((a, b) => {
        return a - b;
    });
    return first_sorted
        .map((element, index) => Math.abs(element - second_sorted[index]))
        .reduce((sum, current) => sum + current, 0);
};
exports.part1 = part1;
const part2 = (input) => {
    let rows = input.split("\n");
    let first = [];
    let second = [];
    rows.forEach((r) => {
        const split = r.split("   ");
        first.push(+split[0]);
        second.push(+split[1]);
    });
    const counter = {};
    second.forEach(ele => {
        if (counter[ele]) {
            counter[ele] += 1;
        }
        else {
            counter[ele] = 1;
        }
    });
    return first.map(ele => { var _a; return ele * ((_a = counter[ele]) !== null && _a !== void 0 ? _a : 0); }).reduce((sum, curr) => sum + curr, 0);
};
exports.part2 = part2;
