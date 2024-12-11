"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var example = "0 1 10 99 999";
var example2 = "125 17";
var transformSingleStoneOnce = function (stone) {
    if (stone === 0) {
        return [1];
    }
    if (stone.toString().length % 2 === 0) {
        var strStone = stone.toString();
        var mid = strStone.length / 2;
        var left = parseInt(strStone.slice(0, mid), 10);
        var right = parseInt(strStone.slice(mid), 10);
        return [left, right];
    }
    return [stone * 2024];
};
var transformStoneListOnce = function (stones) {
    return stones.flatMap(function (s) { return transformSingleStoneOnce(s); });
};
var seen = {};
var transformStoneList = function (stones, times) {
    if (times == 0) {
        return 1;
    }
    var newStones = transformStoneListOnce(stones);
    return newStones
        .map(function (s) {
        if (seen["".concat(s, ", ").concat(times)]) {
            return seen["".concat(s, ", ").concat(times)];
        }
        var x = transformStoneList([s], times - 1);
        seen["".concat(s, ", ").concat(times)] = x;
        return x;
    })
        .reduce(function (sum, current) { return sum + current; }, 0);
};
var part1 = function (input) {
    var stones = input.split(" ").map(Number);
    return transformStoneList(stones, 25);
};
exports.part1 = part1;
var part2 = function (input) {
    var stones = input.split(" ").map(Number);
    return transformStoneList(stones, 75);
};
exports.part2 = part2;
