"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var util_1 = require("../util");
var example = "0123\n1234\n8765\n9876";
var example2 = "89010123\n78121874\n87430965\n96549874\n45678903\n32019012\n01329801\n10456732";
var dirs = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }];
var noResult = { x: -1, y: -1 };
var xMax = 0;
var yMax = 0;
var parseInput = function (input) {
    var parsed = input.split("\n").map(function (c) { return c.split("").map(Number); });
    xMax = parsed.length;
    yMax = parsed[0].length;
    return parsed;
};
var isInMatrix = function (a) {
    return a.x >= 0 && a.x < xMax && 0 <= a.y && a.y < yMax;
};
var recursiveSearch = function (curr, matrix) {
    var currentValue = matrix[curr[curr.length - 1].x][curr[curr.length - 1].y];
    if (currentValue == 9) {
        return [curr[curr.length - 1]];
    }
    return dirs.flatMap(function (d) {
        var next = { x: curr[curr.length - 1].x + d.x, y: curr[curr.length - 1].y + d.y };
        if (isInMatrix(next) && matrix[next.x][next.y] == currentValue + 1) {
            var nextArg = __spreadArray(__spreadArray([], curr, true), [next], false);
            // nextArg.push(next)
            return recursiveSearch(nextArg, matrix);
        }
        return noResult;
    }).filter(function (x) { return x != noResult; });
};
var part1 = function (input) {
    var matrix = parseInput(input);
    var trailHeads = matrix.flatMap(function (row, x) {
        return (0, util_1.getAllIndexes)(row, 0).map(function (y) { return ({ x: x, y: y }); });
    });
    return trailHeads.map(function (t) {
        return recursiveSearch([t], matrix)
            .filter(function (obj, index, self) {
            return index === self.findIndex(function (t) { return t.x === obj.x && t.y === obj.y; });
        }).length;
    }).reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part1 = part1;
var part2 = function (input) {
    var matrix = parseInput(input);
    var trailHeads = matrix.flatMap(function (row, x) {
        return (0, util_1.getAllIndexes)(row, 0).map(function (y) { return ({ x: x, y: y }); });
    });
    return trailHeads.map(function (t) {
        return recursiveSearch([t], matrix).length;
    }).reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part2 = part2;
