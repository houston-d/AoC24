"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var example = "MMMSXXMASM\nMSAMXMSMSA\nAMXSXMAAMM\nMSAMASMSMX\nXMASAMXAMM\nXXAMMXXAMA\nSMSMSASXSS\nSAXAMASAAA\nMAMMMXMMMM\nMXMXAXMASX";
var getUp = function (i, j, matrix) {
    return matrix[i][j] + matrix[i - 1][j] + matrix[i - 2][j] + matrix[i - 3][j];
};
var getDown = function (i, j, matrix) {
    return matrix[i][j] + matrix[i + 1][j] + matrix[i + 2][j] + matrix[i + 3][j];
};
var getLeft = function (i, j, matrix) {
    return matrix[i][j] + matrix[i][j - 1] + matrix[i][j - 2] + matrix[i][j - 3];
};
var getRight = function (i, j, matrix) {
    return matrix[i][j] + matrix[i][j + 1] + matrix[i][j + 2] + matrix[i][j + 3];
};
var getUpLeft = function (i, j, matrix) {
    return matrix[i][j] + matrix[i - 1][j - 1] + matrix[i - 2][j - 2] + matrix[i - 3][j - 3];
};
var getUpRight = function (i, j, matrix) {
    return matrix[i][j] + matrix[i - 1][j + 1] + matrix[i - 2][j + 2] + matrix[i - 3][j + 3];
};
var getDownLeft = function (i, j, matrix) {
    return matrix[i][j] + matrix[i + 1][j - 1] + matrix[i + 2][j - 2] + matrix[i + 3][j - 3];
};
var getDownRight = function (i, j, matrix) {
    return matrix[i][j] + matrix[i + 1][j + 1] + matrix[i + 2][j + 2] + matrix[i + 3][j + 3];
};
var getDir = function (i, j, iDir, jDir, matrix) {
    return matrix[i][j] +
        matrix[i + iDir][j + jDir] +
        matrix[i + (2 * iDir)][j + (2 * jDir)] +
        matrix[i + (3 * iDir)][j + (3 * jDir)];
};
var part1 = function (input) {
    var matrix = input.split('\n').map(function (r) { return r.split(''); });
    var colLength = matrix.length;
    var rowLength = matrix[0].length;
    var count = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] !== 'X') {
                continue;
            }
            if (i >= 3 && getDir(i, j, -1, 0, matrix) == 'XMAS') {
                count++;
            }
            if (i < colLength - 3 && getDir(i, j, 1, 0, matrix) == 'XMAS') {
                count++;
            }
            if (j >= 3 && getDir(i, j, 0, -1, matrix) == 'XMAS') {
                count++;
            }
            if (j < rowLength - 3 && getDir(i, j, 0, 1, matrix) == 'XMAS') {
                count++;
            }
            if (i >= 3 && j >= 3 && getDir(i, j, -1, -1, matrix) == 'XMAS') {
                count++;
            }
            if (i >= 3 && j < rowLength - 3 && getDir(i, j, -1, 1, matrix) == 'XMAS') {
                count++;
            }
            if (i < colLength - 3 && j >= 3 && getDir(i, j, 1, -1, matrix) == 'XMAS') {
                count++;
            }
            if (i < colLength - 3 && j < rowLength - 3 && getDir(i, j, 1, 1, matrix) == 'XMAS') {
                count++;
            }
        }
    }
    return count;
};
exports.part1 = part1;
var part2 = function (input) {
    var matrix = input.split('\n').map(function (r) { return r.split(''); });
    var count = 0;
    for (var i = 1; i < matrix.length - 1; i++) {
        for (var j = 1; j < matrix[0].length - 1; j++) {
            if (matrix[i][j] !== 'A') {
                continue;
            }
            var firstDiagonal = [matrix[i - 1][j - 1], matrix[i + 1][j + 1]].sort(function (a, b) {
                return a > b ? 1 : -1;
            });
            var secondDiagonal = [matrix[i - 1][j + 1], matrix[i + 1][j - 1]].sort(function (a, b) {
                return a > b ? 1 : -1;
            });
            if (firstDiagonal[0] == 'M' && secondDiagonal[0] == 'M' && firstDiagonal[1] == 'S' && secondDiagonal[1] == 'S') {
                count++;
            }
        }
    }
    return count;
};
exports.part2 = part2;
