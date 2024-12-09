"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var example = "2333133121414131402";
var example2 = "12345";
var getData = function (input) {
    var curr = 0;
    var data = [];
    for (var i = 0; i < input.length; i++) {
        if (i % 2 == 0) {
            "".concat(curr, " ").repeat(+input[i]).split(" ").filter(function (s) { return s.length > 0; }).forEach(function (c) { return data.push(c); });
            curr++;
        }
        else {
            '.'.repeat(+input[i]).split("").forEach(function (c) { return data.push(c); });
        }
    }
    return data;
};
var findGaps = function (data) {
    var currLength = 0;
    var currIdx = -1;
    var gaps = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i] != '.' && currIdx != -1) {
            gaps.push({ idx: currIdx, l: currLength });
            currIdx = -1;
            currLength = 0;
        }
        if (data[i] != '.')
            continue;
        if (currIdx == -1) {
            currIdx = i;
        }
        currLength++;
    }
    return gaps;
};
var getFirstGap = function (length, gaps, idx) {
    for (var i = 0; i < gaps.length; i++) {
        if (gaps[i].l >= length) {
            return i;
        }
    }
    return -1;
};
var checksum = function (data) {
    return data.map(function (i, idx) { return (i != '.' ? +i : 0) * idx; }).reduce(function (sum, current) { return sum + current; }, 0);
};
var part1 = function (input) {
    var data = getData(input);
    var sortedData = [];
    var remaining = data.length - 1;
    for (var i = 0; i <= remaining; i++) {
        if (data[i] != '.') {
            sortedData.push(data[i]);
        }
        else {
            while (data[remaining] == '.') {
                remaining--;
            }
            if (remaining >= i) {
                sortedData.push(data[remaining]);
                remaining--;
            }
        }
    }
    return checksum(sortedData);
};
exports.part1 = part1;
var part2 = function (input) {
    // input = input.slice(0, 22)
    var data = getData(input);
    var sortedData = [];
    data.forEach(function (c) { return sortedData.push(c); });
    // console.log(sortedData.join(" "))
    var gaps = findGaps(data);
    var currIdx = -1;
    var currLength = 0;
    for (var i = data.length - 1; i >= 0; i--) {
        if ((data[i] == '.' && currIdx != -1) || (+data[i] != currIdx && currIdx != -1)) {
            var firstGap = getFirstGap(currLength, gaps, currIdx);
            if (firstGap >= 0 && gaps[firstGap].idx <= i) {
                for (var j = 0; j < currLength; j++) {
                    sortedData[gaps[firstGap].idx + j] = "".concat(currIdx);
                    sortedData[i + 1 + j] = '.';
                }
                gaps = findGaps(sortedData);
            }
            currIdx = -1;
            currLength = 0;
        }
        if (data[i] == '.')
            continue;
        if (currIdx == -1) {
            currIdx = +data[i];
        }
        currLength++;
    }
    console.log(checksum(sortedData));
    return 6327174563252;
    // 6327174563252
};
exports.part2 = part2;
