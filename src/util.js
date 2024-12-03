"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
var fs_1 = require("fs");
var readFile = function (day) {
    return (0, fs_1.readFileSync)("../src/input/".concat(day, ".txt"), 'utf-8');
};
exports.readFile = readFile;
