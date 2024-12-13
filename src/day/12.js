"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part2 = exports.part1 = void 0;
var example = "RRRRIICCFF\nRRRRIICCCF\nVVRRRCCFFF\nVVRCCCJFFF\nVVVVCJJCFE\nVVIVCCJJEE\nVVIIICJJEE\nMIIIIIJJEE\nMIIISIJEEE\nMMMISSJEEE";
var Point = /** @class */ (function () {
    function Point(x_, y_) {
        this.x = x_;
        this.y = y_;
    }
    Point.prototype.add = function (other) {
        return new Point(this.x + other.x, this.y + other.y);
    };
    Point.prototype.equals = function (other) {
        return this.x == other.x && this.y == other.y;
    };
    Point.prototype.toString = function () {
        return "(".concat(this.x, ", ").concat(this.y, ")");
    };
    Point.prototype.getX = function () {
        return this.x;
    };
    Point.prototype.getY = function () {
        return this.y;
    };
    return Point;
}());
var nullPoint = new Point(-1, -1);
var dirs = [
    new Point(-1, 0),
    new Point(0, 1),
    new Point(1, 0),
    new Point(0, -1),
];
var generateRegionForPlant = function (locations) {
    var _a, _b;
    var regions = {};
    var currRegion = 0;
    while (locations.length > 0) {
        var queue = [(_a = locations.shift()) !== null && _a !== void 0 ? _a : nullPoint];
        var seen = [];
        var perimeter = 0;
        while (queue.length != 0) {
            var currPoint = (_b = queue.shift()) !== null && _b !== void 0 ? _b : nullPoint;
            if (currPoint.equals(nullPoint)) {
                regions[currRegion] = { plants: [], area: 0, perimeter: 0 };
            }
            perimeter += 4;
            seen.push(currPoint);
            var _loop_1 = function (i) {
                var nextPoint = currPoint.add(dirs[i]);
                var idx = locations.findIndex(function (point) {
                    return point.equals(nextPoint);
                });
                if (idx >= 0) {
                    var toAdd = locations.splice(idx, 1)[0];
                    queue.push(toAdd);
                }
                var idx_ = seen.findIndex(function (point) { return point.equals(nextPoint); });
                if (idx_ >= 0) {
                    perimeter -= 2;
                }
            };
            for (var i = 0; i < dirs.length; i++) {
                _loop_1(i);
            }
        }
        regions[currRegion] = {
            plants: seen,
            area: seen.length,
            perimeter: perimeter,
        };
        currRegion++;
    }
    return regions;
};
var generateRegions = function (garden) {
    var plantLocations = {};
    for (var x = 0; x < garden.length; x++) {
        for (var y = 0; y < garden[0].length; y++) {
            var plant = garden[x][y];
            if (plantLocations[plant]) {
                plantLocations[plant].push(new Point(x, y));
            }
            else {
                plantLocations[plant] = [new Point(x, y)];
            }
        }
    }
    return plantLocations;
};
var constructPlotForPoint = function (plant, allPlants) {
    var plot = [
        [".", ".", "."],
        [".", "X", "."],
        [".", ".", "."],
    ];
    var centre = new Point(1, 1);
    for (var x = -1; x <= 1; x++) {
        var _loop_2 = function (y) {
            var pointDir = new Point(x, y);
            var z = plant.add(pointDir);
            var exists = allPlants.filter(function (p) { return p.getX() == z.getX() && p.getY() == z.getY(); }).length > 0;
            if (exists) {
                var toAdd = pointDir.add(centre);
                plot[toAdd.getX()][toAdd.getY()] = "X";
            }
        };
        for (var y = -1; y <= 1; y++) {
            _loop_2(y);
        }
    }
    return plot;
};
var isOutsideCorner = function (plot) {
    var a = plot[0][1] == ".";
    var b = plot[1][2] == ".";
    var c = plot[2][1] == ".";
    var d = plot[1][0] == ".";
    if (a && b && c && d)
        return 4;
    if (a && b && c && !d)
        return 2;
    if (a && b && !c && d)
        return 2;
    if (a && !b && c && d)
        return 2;
    if (!a && b && c && d)
        return 2;
    if (a && !b && !c && d)
        return 1;
    if (a && b && !c && !d)
        return 1;
    if (!a && b && c && !d)
        return 1;
    if (!a && !b && c && d)
        return 1;
    return 0;
};
var isInsideCorner = function (plot) {
    var a = plot[0][1] == "X";
    var b = plot[1][2] == "X";
    var c = plot[2][1] == "X";
    var d = plot[1][0] == "X";
    var z = plot[0][0] == ".";
    var y = plot[0][2] == ".";
    var x = plot[2][0] == ".";
    var w = plot[2][2] == ".";
    var total = 0;
    if (a && b && y)
        total++;
    if (a && d && z)
        total++;
    if (c && d && x)
        total++;
    if (b && c && w)
        total++;
    return total;
};
var getSidesForRegion = function (plants) {
    return plants.map(function (plant) {
        var plot = constructPlotForPoint(plant, plants);
        var outside = isOutsideCorner(plot);
        var inside = isInsideCorner(plot);
        return outside + inside;
    });
};
var part1 = function (input) {
    var garden = input.split("\n").map(function (c) { return c.split(""); });
    var plantLocations = generateRegions(garden);
    return Object.entries(plantLocations)
        .map(function (e) { return e[1]; })
        .flatMap(function (p) {
        var regions = generateRegionForPlant(p);
        return Object.entries(regions)
            .map(function (e) { return e[1]; })
            .map(function (r) { return r.area * r.perimeter; });
    })
        .reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part1 = part1;
var part2 = function (input) {
    var garden = input.split("\n").map(function (c) { return c.split(""); });
    var plantLocations = generateRegions(garden);
    return Object.entries(plantLocations)
        .map(function (e) {
        return e[1];
    })
        .flatMap(function (p) {
        var regions = generateRegionForPlant(p);
        return Object.entries(regions)
            .map(function (e) { return e[1]; })
            .map(function (r) {
            return (r.area *
                getSidesForRegion(r.plants).reduce(function (sum, current) { return sum + current; }, 0));
        });
    })
        .reduce(function (sum, current) { return sum + current; }, 0);
};
exports.part2 = part2;
