"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _10_1 = require("../src/day/10");
var util_1 = require("../src/util");
(0, util_1.readFile)(10).then(function (file) {
    console.log((0, _10_1.part1)(file));
    console.log((0, _10_1.part2)(file));
});
