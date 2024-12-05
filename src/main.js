"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _5_1 = require("../src/day/5");
var util_1 = require("../src/util");
(0, util_1.readFile)(5).then(function (file) {
    console.log((0, _5_1.part1)(file));
    console.log((0, _5_1.part2)(file));
});
