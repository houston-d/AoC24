"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var example = "....#.....\n.........#\n..........\n..#.......\n.......#..\n..........\n.#..^.....\n........#.\n#.........\n......#...";
var printMatrix = function (matrix) {
    console.log(matrix.map(function (r) { return r.join(""); }).join("\n"));
    console.log();
};
var getGuardPos = function (matrix) {
    return matrix.map(function (row, i) {
        var guard = row.indexOf("^");
        if (guard >= 0) {
            return [i, guard];
        }
        return [-1, -1];
    }).filter(function (pos) { return pos[0] > -1; }).flat();
};
var traverse = function (matrix, guardPos) {
    var dirCycle = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    var curDir = 0;
    var visited = [guardPos];
    var newGuardPos = [guardPos[0] + dirCycle[curDir][0], guardPos[1] + dirCycle[curDir][1]];
    var count = 0;
    do {
        if (matrix[newGuardPos[0]][newGuardPos[1]] == "#") {
            curDir = (curDir + 1) % 4;
        }
        else {
            matrix[guardPos[0]][guardPos[1]] = "X";
            matrix[newGuardPos[0]][newGuardPos[1]] = "^";
            guardPos = newGuardPos;
            visited.push(newGuardPos);
        }
        // printMatrix(matrix)
        count++;
        if (count > 9999) {
            return [];
        }
        newGuardPos = [guardPos[0] + dirCycle[curDir][0], guardPos[1] + dirCycle[curDir][1]];
    } while (0 <= newGuardPos[0] && newGuardPos[0] < matrix.length && 0 <= newGuardPos[1] && newGuardPos[1] < matrix[0].length);
    return visited;
};
var filterVisited = function (visited) {
    var unique = [];
    return visited.filter(function (pos) {
        var posString = JSON.stringify(pos);
        if (unique.includes(posString)) {
            return false;
        }
        unique.push(posString);
        return true;
    });
};
var countLoops = function (matrix, visited) {
    var guardPos = getGuardPos(matrix);
    return visited.map(function (pos) {
        if (JSON.stringify(pos) == JSON.stringify(guardPos)) {
            return 0;
        }
        var newMatrix = matrix.map(function (arr) {
            return arr.slice();
        });
        newMatrix[pos[0]][pos[1]] = "#";
        return traverse(newMatrix, guardPos).length === 0 ? 1 : 0;
    }).map(Number).reduce(function (sum, curr) { return sum + curr; }, 0);
};
var part1 = function (input) {
    input = example;
    var matrix = input.split('\n').map(function (r) { return r.split(''); });
    var guardPos = getGuardPos(matrix);
    var visited = traverse(matrix, guardPos);
    return filterVisited(visited).length;
};
exports.part1 = part1;
var part2 = function (input) {
    var matrix = input.split('\n').map(function (r) { return r.split(''); });
    var newMatrix = matrix.map(function (arr) {
        return arr.slice();
    });
    var guardPos = getGuardPos(newMatrix);
    var visited = traverse(newMatrix, guardPos);
    var filtered = filterVisited(visited);
    return countLoops(matrix, filtered);
};
exports.part2 = part2;
