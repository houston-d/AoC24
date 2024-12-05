"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var example1 = "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))";
var example2 = "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
var pattern1 = new RegExp('mul\\([0-9]{1,3}\\,[0-9]{1,3}\\)', 'g');
var pattern2 = new RegExp('mul\\([0-9]{1,3}\\,[0-9]{1,3}\\)|do\\(\\)|don\'t\\(\\)', 'g');
var extractMultiplier = function (str) {
    return str.split("(")[1]
        .split(")")[0]
        .split(",")
        .map(Number)
        .reduce(function (prod, current) { return prod * current; }, 1);
};
var part1 = function (input) {
    var _a;
    return (_a = input.replace("\n", "")
        .match(pattern1)) === null || _a === void 0 ? void 0 : _a.map(function (match) { return extractMultiplier(match); }).reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part1 = part1;
var part2 = function (input) {
    var _a;
    var include = true;
    var consider = [];
    var matches = (_a = input.replace("\n", "").match(pattern2)) !== null && _a !== void 0 ? _a : [];
    for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
        var m = matches_1[_i];
        if (include && /mul/g.test(m)) {
            consider.push(m);
        }
        if (/don\'t/g.test(m)) {
            include = false;
        }
        else if (/do/g.test(m)) {
            include = true;
        }
    }
    return consider.map(function (m) { return extractMultiplier(m); })
        .reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part2 = part2;
