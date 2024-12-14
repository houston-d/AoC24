import { Point } from "../util";

const example: string =
    "RRRRIICCFF\nRRRRIICCCF\nVVRRRCCFFF\nVVRCCCJFFF\nVVVVCJJCFE\nVVIVCCJJEE\nVVIIICJJEE\nMIIIIIJJEE\nMIIISIJEEE\nMMMISSJEEE";

interface Location {
    [key: string]: Point[];
}

const nullPoint = new Point(-1, -1);

const dirs: Point[] = [
    new Point(-1, 0),
    new Point(0, 1),
    new Point(1, 0),
    new Point(0, -1),
];

interface Regions {
    [key: number]: AP;
}

interface AP {
    plants: Point[];
    area: number;
    perimeter: number;
}

const generateRegionForPlant = (locations: Point[]): Regions => {
    const regions: Regions = {};
    let currRegion: number = 0;

    while (locations.length > 0) {
        const queue: Point[] = [locations.shift() ?? nullPoint];
        const seen: Point[] = [];
        let perimeter: number = 0;

        while (queue.length != 0) {
            const currPoint: Point = queue.shift() ?? nullPoint;
            if (currPoint.equals(nullPoint)) {
                regions[currRegion] = { plants: [], area: 0, perimeter: 0 };
            }

            perimeter += 4;
            seen.push(currPoint);

            for (let i = 0; i < dirs.length; i++) {
                const nextPoint: Point = currPoint.add(dirs[i]);
                const idx = locations.findIndex((point) =>
                    point.equals(nextPoint)
                );

                if (idx >= 0) {
                    const [toAdd] = locations.splice(idx, 1);
                    queue.push(toAdd);
                }

                const idx_ = seen.findIndex((point) => point.equals(nextPoint));

                if (idx_ >= 0) {
                    perimeter -= 2;
                }
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

const generateRegions = (garden: string[][]) => {
    const plantLocations: Location = {};

    for (let x = 0; x < garden.length; x++) {
        for (let y = 0; y < garden[0].length; y++) {
            const plant: string = garden[x][y];
            if (plantLocations[plant]) {
                plantLocations[plant].push(new Point(x, y));
            } else {
                plantLocations[plant] = [new Point(x, y)];
            }
        }
    }

    return plantLocations;
};

const constructPlotForPoint = (
    plant: Point,
    allPlants: Point[]
): string[][] => {
    const plot: string[][] = [
        [".", ".", "."],
        [".", "X", "."],
        [".", ".", "."],
    ];

    const centre: Point = new Point(1, 1);
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            const pointDir: Point = new Point(x, y);
            const z: Point = plant.add(pointDir);
            const exists: boolean =
                allPlants.filter(
                    (p) => p.getX() == z.getX() && p.getY() == z.getY()
                ).length > 0;

            if (exists) {
                const toAdd = pointDir.add(centre);
                plot[toAdd.getX()][toAdd.getY()] = "X";
            }
        }
    }

    return plot;
};

const isOutsideCorner = (plot: string[][]): number => {
    const a: boolean = plot[0][1] == ".";
    const b: boolean = plot[1][2] == ".";
    const c: boolean = plot[2][1] == ".";
    const d: boolean = plot[1][0] == ".";

    if (a && b && c && d) return 4;
    if (a && b && c && !d) return 2;
    if (a && b && !c && d) return 2;
    if (a && !b && c && d) return 2;
    if (!a && b && c && d) return 2;
    if (a && !b && !c && d) return 1;
    if (a && b && !c && !d) return 1;
    if (!a && b && c && !d) return 1;
    if (!a && !b && c && d) return 1;

    return 0;
};

const isInsideCorner = (plot: string[][]): number => {
    const a: boolean = plot[0][1] == "X";
    const b: boolean = plot[1][2] == "X";
    const c: boolean = plot[2][1] == "X";
    const d: boolean = plot[1][0] == "X";
    const z: boolean = plot[0][0] == ".";
    const y: boolean = plot[0][2] == ".";
    const x: boolean = plot[2][0] == ".";
    const w: boolean = plot[2][2] == ".";

    let total: number = 0;

    if (a && b && y) total++;
    if (a && d && z) total++;
    if (c && d && x) total++;
    if (b && c && w) total++;

    return total;
};

const getSidesForRegion = (plants: Point[]): number[] => {
    return plants.map((plant: Point) => {
        const plot: string[][] = constructPlotForPoint(plant, plants);
        const outside: number = isOutsideCorner(plot);
        const inside: number = isInsideCorner(plot);

        return outside + inside;
    });
};

export const part1 = (input: string) => {
    const garden: string[][] = input.split("\n").map((c) => c.split(""));

    const plantLocations: Location = generateRegions(garden);

    return Object.entries(plantLocations)
        .map((e) => e[1])
        .flatMap((p: Point[]) => {
            const regions: Regions = generateRegionForPlant(p as Point[]);

            return Object.entries(regions)
                .map((e) => e[1])
                .map((r: AP) => r.area * r.perimeter);
        })
        .reduce((sum, current) => sum + current, 0);
};

export const part2 = (input: string): number => {
    const garden: string[][] = input.split("\n").map((c) => c.split(""));
    const plantLocations: Location = generateRegions(garden);

    return Object.entries(plantLocations)
        .map((e) => {
            return e[1];
        })
        .flatMap((p: Point[]) => {
            const regions: Regions = generateRegionForPlant(p as Point[]);
            return Object.entries(regions)
                .map((e) => e[1])
                .map((r: AP) => {
                    return (
                        r.area *
                        getSidesForRegion(r.plants).reduce(
                            (sum, current) => sum + current,
                            0
                        )
                    );
                });
        })
        .reduce((sum, current) => sum + current, 0);
};
