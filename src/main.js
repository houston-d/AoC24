"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _9_1 = require("../src/day/9");
var util_1 = require("../src/util");
(0, util_1.readFile)(9).then(function (file) {
    console.log((0, _9_1.part1)(file));
    console.log((0, _9_1.part2)(file));
});
