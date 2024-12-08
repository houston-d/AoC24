"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var example = "............\n........0...\n.....0......\n.......0....\n....0.......\n......A.....\n............\n............\n........A...\n.........A..\n............\n............";
var iMax = 0;
var jMax = 0;
var isInMatrix = function (antinode) {
    return antinode.i >= 0 && antinode.i < iMax && 0 <= antinode.j && antinode.j < jMax;
};
var getLocations = function (matrix) {
    var locations = {};
    matrix.forEach(function (r, i) {
        r.forEach(function (c, j) {
            if (c == '.') {
                return;
            }
            var toSave = { i: i, j: j };
            locations[c] ? locations[c].push(toSave) : locations[c] = [toSave];
        });
    });
    return locations;
};
var part1 = function (input) {
    input = example;
    var matrix = input.split("\n").map(function (r) { return r.split(''); });
    var locations = getLocations(matrix);
    iMax = matrix.length;
    jMax = matrix[0].length;
    var validAntinodes = [];
    var seen = [];
    for (var _i = 0, _a = Object.entries(locations); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        for (var i = 0; i < value.length - 1; i++) {
            for (var j = i + 1; j < value.length; j++) {
                var first = value[i];
                var second = value[j];
                var iDiff = first.i - second.i;
                var jDiff = first.j - second.j;
                var anti1 = { i: first.i + iDiff, j: first.j + jDiff };
                var anti2 = { i: second.i - iDiff, j: second.j - jDiff };
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
};
exports.part1 = part1;
var isIntegerWithTolerance = function (num, tolerance) {
    if (tolerance === void 0) { tolerance = 1e-8; }
    return Math.abs(num - Math.round(num)) < tolerance;
};
var iterateFrequency = function (iUnit, jUnit, start) {
    var curr = { i: start.i, j: start.j };
    var valid = [];
    while (isInMatrix(curr)) {
        if (Number.isInteger(curr.i) && Number.isInteger(curr.j)) {
            valid.push({ i: Math.round(curr.i), j: Math.round(curr.j) });
        }
        curr = { i: curr.i + iUnit, j: curr.j + jUnit };
    }
    return valid;
};
var part2 = function (input) {
    var matrix = input.split("\n").map(function (r) { return r.split(''); });
    var locations = getLocations(matrix);
    iMax = matrix.length;
    jMax = matrix[0].length;
    var validAntinodes = [];
    var seen = [];
    for (var _i = 0, _a = Object.entries(locations); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        for (var i = 0; i < value.length - 1; i++) {
            for (var j = i + 1; j < value.length; j++) {
                var first = value[i];
                var second = value[j];
                var iDiff = first.i - second.i;
                var jDiff = first.j - second.j;
                var anti1 = iterateFrequency(iDiff, jDiff, first);
                var anti2 = iterateFrequency(-iDiff, -jDiff, second);
                anti1.forEach(function (a) {
                    if (isInMatrix(a) && !seen.includes(JSON.stringify(a))) {
                        validAntinodes.push(a);
                        seen.push(JSON.stringify(a));
                    }
                });
                anti2.forEach(function (a) {
                    if (isInMatrix(a) && !seen.includes(JSON.stringify(a))) {
                        validAntinodes.push(a);
                        seen.push(JSON.stringify(a));
                    }
                });
            }
        }
    }
    return validAntinodes.length;
};
exports.part2 = part2;
