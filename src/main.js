"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _14_1 = require("../src/day/14");
var util_1 = require("../src/util");
(0, util_1.readFile)(14).then(function (file) {
    console.time("part1");
    console.log((0, _14_1.part1)(file));
    console.timeEnd("part1");
    console.time("part2");
    console.log((0, _14_1.part2)(file));
    console.timeEnd("part2");
});
