"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
const example = "7 6 4 2 1\n1 2 7 8 9\n9 7 6 2 1\n1 3 2 4 5\n8 6 4 4 1\n1 3 6 7 9";
const allIncreasing = (row) => {
    let dir;
    for (var i = 1; i < row.length; i++) {
        const curr_dir = row[i] < row[i - 1];
        if (dir != null && dir != curr_dir) {
            return false;
        }
        dir = curr_dir;
    }
    return true;
};
const allDiff = (row) => {
    for (var i = 1; i < row.length; i++) {
        const diff = Math.abs(row[i] - row[i - 1]);
        if (diff !== 1 && diff !== 2 && diff !== 3) {
            return false;
        }
    }
    return true;
};
const part1 = (input) => {
    let rows = input.split("\n");
    return rows.map((r) => {
        const num_row = r.split(' ').map(Number);
        return allDiff(num_row) && allIncreasing(num_row);
    })
        .reduce((sum, current) => sum + (current ? 1 : 0), 0);
};
exports.part1 = part1;
const part2 = (input) => {
    let rows = input.split("\n");
    return rows.map((r) => {
        const num_row = r.split(' ').map(Number);
        if (allDiff(num_row) && allIncreasing(num_row)) {
            return true;
        }
        for (var i = 0; i < num_row.length; i++) {
            const test_row = num_row.filter((ele, idx) => idx != i);
            if (allDiff(test_row) && allIncreasing(test_row)) {
                return true;
            }
        }
        return false;
    })
        .reduce((sum, current) => sum + (current ? 1 : 0), 0);
};
exports.part2 = part2;
