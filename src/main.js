"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _8_1 = require("../src/day/8");
var util_1 = require("../src/util");
(0, util_1.readFile)(8).then(function (file) {
    console.log((0, _8_1.part1)(file));
    console.log((0, _8_1.part2)(file));
});
