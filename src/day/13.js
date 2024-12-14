"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var example = "Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400\nButton A: X+26, Y+66\nButton B: X+67, Y+21\nPrize: X=12748, Y=12176\n\nButton A: X+17, Y+86\nButton B: X+84, Y+37\nPrize: X=7870, Y=6450\n\nButton A: X+69, Y+23\nButton B: X+27, Y+71\nPrize: X=18641, Y=10279";
var parseInput = function (input, offset) {
    var regex = /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g;
    var match;
    var machines = [];
    while ((match = regex.exec(input)) !== null) {
        var machine = {
            A: { x: parseInt(match[1], 10), y: parseInt(match[2], 10) },
            B: { x: parseInt(match[3], 10), y: parseInt(match[4], 10) },
            P: {
                x: parseInt(match[5], 10) + offset,
                y: parseInt(match[6], 10) + offset,
            },
        };
        machines.push(machine);
    }
    return machines;
};
var calculateCostForMachine = function (machine) {
    var b = Math.floor((machine.P.y * machine.A.x - machine.P.x * machine.A.y) /
        (machine.B.y * machine.A.x - machine.B.x * machine.A.y));
    var a = Math.floor((machine.P.x - machine.B.x * b) / machine.A.x);
    if (a >= 0 &&
        b >= 0 &&
        a * machine.A.x + b * machine.B.x == machine.P.x &&
        a * machine.A.y + b * machine.B.y == machine.P.y)
        return 3 * a + b;
    return 0;
};
var part1 = function (input) {
    var machines = parseInput(input, 0);
    return machines
        .map(function (m) { return calculateCostForMachine(m); })
        .reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part1 = part1;
var part2 = function (input) {
    var machines = parseInput(input, 10000000000000);
    return machines
        .map(function (m) { return calculateCostForMachine(m); })
        .reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part2 = part2;
