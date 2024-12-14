"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var util_1 = require("../util");
var ChiSqTest = require("chi-sq-test");
var example = "p=0,4 v=3,-3\np=6,3 v=-1,-3\np=10,3 v=-1,2\np=2,0 v=2,-1\np=0,0 v=1,3\np=3,0 v=-2,-2\np=7,6 v=-1,-3\np=3,0 v=-1,-2\np=9,3 v=2,3\np=7,3 v=-1,2\np=2,4 v=2,-3\np=9,5 v=-3,-3";
var parseInput = function (input) {
    var lines = input.trim().split("\n");
    return lines
        .map(function (line) {
        var matches = line.match(/-?\d+/g);
        return matches ? matches.map(Number) : [];
    })
        .map(function (values) {
        return {
            p: new util_1.Point(values[1], values[0]),
            v: new util_1.Point(values[3], values[2]),
        };
    });
};
var moveRobotForTime = function (robot, time, x, y) {
    return robot.v.multiply(time).add(robot.p).modulo(x, y);
};
var calculateVariance = function (coordinates) {
    var xCoords = coordinates.map(function (coord) { return coord.getX(); });
    var yCoords = coordinates.map(function (coord) { return coord.getY(); });
    var mean = function (arr) {
        return arr.reduce(function (sum, value) { return sum + value; }, 0) / arr.length;
    };
    var variance = function (arr) {
        var meanValue = mean(arr);
        return (arr.reduce(function (sum, value) { return sum + Math.pow(value - meanValue, 2); }, 0) / arr.length);
    };
    var varianceX = variance(xCoords);
    var varianceY = variance(yCoords);
    return { varianceX: varianceX, varianceY: varianceY };
};
var isUniformDistribution = function (obs, maxVal) {
    var numObs = obs.length;
    var expectedFreqSingle = Math.ceil(numObs / maxVal);
    var expectedFreq = [];
    var actualFreq = [];
    var _loop_1 = function (i) {
        expectedFreq.push(expectedFreqSingle);
        actualFreq.push(obs.filter(function (o) { return o == i; }).length);
    };
    for (var i = 0; i < obs.length; i++) {
        _loop_1(i);
    }
    return ChiSqTest.gof(actualFreq, expectedFreq, 6);
};
var checkPointDistribution = function (positions, xMax, yMax) {
    var xResult = isUniformDistribution(positions.map(function (p) { return p.getX(); }), xMax);
    var yResult = isUniformDistribution(positions.map(function (p) { return p.getY(); }), yMax);
    console.log(xResult, yResult);
    if (xResult.pValue != 0 || yResult.pValue != 0) {
        console.log(xResult, yResult);
    }
};
var part1 = function (input) {
    var xSize = 103;
    var ySize = 101;
    var timePeriod = 100;
    var robots = parseInput(input);
    var robotQuads = robots
        .map(function (r) { return moveRobotForTime(r, timePeriod, xSize, ySize); })
        .filter(function (p) {
        return p.getX() != (xSize - 1) / 2 && p.getY() != (ySize - 1) / 2;
    })
        .map(function (p) {
        if (p.getX() < (xSize - 1) / 2 && p.getY() < (ySize - 1) / 2) {
            return 0;
        }
        if (p.getX() < (xSize - 1) / 2 && p.getY() > (ySize - 1) / 2) {
            return 1;
        }
        if (p.getX() > (xSize - 1) / 2 && p.getY() < (ySize - 1) / 2) {
            return 2;
        }
        if (p.getX() > (xSize - 1) / 2 && p.getY() > (ySize - 1) / 2) {
            return 3;
        }
    })
        .map(Number);
    var a = robotQuads.filter(function (x) { return x == 0; }).length;
    var b = robotQuads.filter(function (x) { return x == 1; }).length;
    var c = robotQuads.filter(function (x) { return x == 2; }).length;
    var d = robotQuads.filter(function (x) { return x == 3; }).length;
    return a * b * c * d;
};
exports.part1 = part1;
var part2 = function (input) {
    var xSize = 103;
    var ySize = 101;
    var timePeriod = 1;
    var robots = parseInput(input);
    var positions = [];
    var minXVariance = 99999;
    var minXI = -1;
    var minYVariance = 99999;
    var minYI = -1;
    var _loop_2 = function (i) {
        positions = robots.map(function (r) {
            return moveRobotForTime(r, timePeriod * i, xSize, ySize);
        });
        var variance = calculateVariance(positions);
        if (minXVariance > variance.varianceX) {
            minXVariance = variance.varianceX;
            minXI = i;
        }
        if (minYVariance > variance.varianceY) {
            minYVariance = variance.varianceY;
            minYI = i;
        }
        if (variance.varianceX < 500 && variance.varianceY < 500) {
            drawPoints(positions, xSize, ySize);
            console.log(variance);
            return { value: i };
        }
    };
    for (var i = 0; i < 101 * 103; i++) {
        var state_1 = _loop_2(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    console.log("Not found");
    return -1;
};
exports.part2 = part2;
var drawPoints = function (points, x, y) {
    var matrix = "."
        .repeat(y)
        .concat("\n")
        .repeat(x)
        .split("\n")
        .map(function (s) { return s.split(""); });
    points.forEach(function (p) { return (matrix[p.getX()][p.getY()] = "X"); });
    matrix.forEach(function (l) { return console.log(l.join("")); });
    console.log();
};
