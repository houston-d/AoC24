"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var util_1 = require("../util");
var example = "47|53\n97|13\n97|61\n97|47\n75|29\n61|13\n75|53\n29|13\n97|29\n53|29\n61|53\n97|53\n61|29\n47|13\n75|47\n97|75\n47|61\n75|61\n47|29\n75|13\n53|13\n\n75,47,61,53,29\n97,61,53,29,13\n75,29,13\n75,97,47,61,53\n61,13,29\n97,13,75,29,47";
var processInput = function (input) {
    var rules = [];
    var updates = [];
    input.split("\n").forEach(function (r) {
        if (r.includes("|")) {
            rules.push(r);
        }
        if (r.includes(",")) {
            updates.push(r.split(",").map(Number));
        }
    });
    return { 'rules': rules, 'updates': updates };
};
var isValid = function (update, rules) {
    for (var i = 0; i < update.length; i++) {
        var curr = update[i];
        for (var j = i; j < update.length; j++) {
            var next = update[j];
            if (rules.includes("".concat(next, "|").concat(curr))) {
                return false;
            }
        }
    }
    return true;
};
var part1 = function (input) {
    var data = processInput(input);
    return data.updates.map(function (update) {
        if (isValid(update, data.rules)) {
            return update[(update.length - 1) / 2];
        }
        return 0;
    }).reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part1 = part1;
var part2 = function (input) {
    var data = processInput(input);
    return data.updates.map(function (update) {
        var currUpdate = update;
        if (!isValid(currUpdate, data.rules)) {
            var i = 0;
            while (i < currUpdate.length) {
                var j = i;
                while (j < currUpdate.length) {
                    if (data.rules.includes("".concat(currUpdate[j], "|").concat(currUpdate[i]))) {
                        currUpdate = (0, util_1.swapArray)(update, i, j);
                        j = i;
                        continue;
                    }
                    j++;
                }
                i++;
            }
            return currUpdate[(currUpdate.length - 1) / 2];
            // return validPerms.length == 1 ? validPerms[0][(validPerms[0].length - 1) / 2] : 0;
        }
        return 0;
    }).reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part2 = part2;
