"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swapArray = exports.permutator = exports.sortStringList = exports.readFile = void 0;
var fs_1 = require("fs");
var axios_1 = require("axios");
var readFile = function (day) { return __awaiter(void 0, void 0, void 0, function () {
    var path, sessionPath, sessionId, url, sessionStr, input;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                path = "../src/input/".concat(day, ".txt");
                if ((0, fs_1.existsSync)(path)) {
                    return [2 /*return*/, (0, fs_1.readFileSync)(path, 'utf-8')];
                }
                sessionPath = '../session.txt';
                if (!(0, fs_1.existsSync)(sessionPath)) {
                    console.error("No session id found. Please create a \'session.txt\' at the root of the project");
                    throw ReferenceError();
                }
                sessionId = (0, fs_1.readFileSync)(sessionPath, 'utf-8');
                if (sessionId.length == 0) {
                    console.error("Session id is empty. Please add a session id");
                    throw ReferenceError();
                }
                url = "https://adventofcode.com/2024/day/".concat(day, "/input");
                sessionStr = 'session='.concat(sessionId);
                return [4 /*yield*/, axios_1.default.get(url, { headers: { Cookie: sessionStr } })
                        .then(function (response) {
                        (0, fs_1.writeFileSync)(path, response.data);
                        return response.data;
                    })
                        .catch(function (error) {
                        console.error('Error while fetching input ' + error);
                        throw Error();
                    })];
            case 1:
                input = _a.sent();
                return [2 /*return*/, input];
        }
    });
}); };
exports.readFile = readFile;
var sortStringList = function (input, reverse) {
    if (reverse === void 0) { reverse = false; }
    return input.sort(function (a, b) {
        if (reverse) {
            return a > b ? -1 : 1;
        }
        return a > b ? 1 : -1;
    });
};
exports.sortStringList = sortStringList;
var permutator = function (inputArr) {
    var result = [];
    var permute = function (arr, m) {
        if (m === void 0) { m = []; }
        if (arr.length === 0) {
            result.push(m);
        }
        else {
            for (var i = 0; i < arr.length; i++) {
                var curr = arr.slice();
                var next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next));
            }
        }
    };
    permute(inputArr);
    return result;
};
exports.permutator = permutator;
var swapArray = function (Array, Swap1, Swap2) {
    var temp = Array[Swap1];
    Array[Swap1] = Array[Swap2];
    Array[Swap2] = temp;
    return Array;
};
exports.swapArray = swapArray;
