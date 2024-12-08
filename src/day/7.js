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
var example = "190: 10 19\n3267: 81 40 27\n83: 17 5\n156: 15 6\n7290: 6 8 6 15\n161011: 16 10 13\n192: 17 8 14\n21037: 9 7 18 13\n292: 11 6 16 20";
var parseInput = function (input) {
    return input.split("\n").map(function (row) {
        var split = row.split(": ");
        var testVal = +split[0];
        var remaining = split[1].split(" ").map(Number);
        return { 'test': testVal, 'remaining': remaining };
    });
};
var generateCombinations = function (array, length) {
    if (length === 0)
        return [[]];
    var result = [];
    var smallerCombinations = generateCombinations(array, length - 1);
    for (var _i = 0, smallerCombinations_1 = smallerCombinations; _i < smallerCombinations_1.length; _i++) {
        var combination = smallerCombinations_1[_i];
        for (var _a = 0, array_1 = array; _a < array_1.length; _a++) {
            var element = array_1[_a];
            result.push(__spreadArray(__spreadArray([], combination, true), [element], false));
        }
    }
    return result;
};
var part1 = function (input) {
    var parsedInput = parseInput(input);
    var validOperators = ['+', '*'];
    return parsedInput.map(function (r) {
        var combinations = generateCombinations(validOperators, r['remaining'].length - 1);
        var matches = combinations.map(function (comb) {
            var total = r['remaining'][0];
            for (var i = 0; i < comb.length; i++) {
                if (comb[i] == '+') {
                    total += r['remaining'][i + 1];
                }
                else if (comb[i] == '*') {
                    total *= r['remaining'][i + 1];
                }
                if (total > r['test']) {
                    return 0;
                }
            }
            return total == r['test'] ? 1 : 0;
        }).map(Number).reduce(function (sum, current) { return sum + current; }, 0);
        return matches > 0 ? r['test'] : 0;
    }).reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part1 = part1;
var isMissing = function (r) {
    return r['test'] == 7290;
};
var isComb = function (c) {
    return c[0] == '*' && c[1] == '|' && c[2] == '*';
};
var part2 = function (input) {
    var parsedInput = parseInput(input);
    var validOperators = ['+', '*', '|'];
    return parsedInput.map(function (r) {
        var combinations = generateCombinations(validOperators, r['remaining'].length - 1);
        var matches = combinations.map(function (comb) {
            var newComb = comb;
            var newRemain = r['remaining'];
            var total = newRemain[0];
            for (var i = 0; i < newComb.length; i++) {
                if (newComb[i] == '+') {
                    total += newRemain[i + 1];
                }
                else if (newComb[i] == '*') {
                    total *= newRemain[i + 1];
                }
                else if (newComb[i] == '|') {
                    total = +(JSON.stringify(total).concat(JSON.stringify(r['remaining'][i + 1])));
                }
                if (total > r['test']) {
                    return 0;
                }
            }
            return total == r['test'] ? 1 : 0;
        }).map(Number).reduce(function (sum, current) { return sum + current; }, 0);
        return matches > 0 ? r['test'] : 0;
    }).reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part2 = part2;
