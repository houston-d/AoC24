import { Point } from "../util";

const example =
    "p=0,4 v=3,-3\np=6,3 v=-1,-3\np=10,3 v=-1,2\np=2,0 v=2,-1\np=0,0 v=1,3\np=3,0 v=-2,-2\np=7,6 v=-1,-3\np=3,0 v=-1,-2\np=9,3 v=2,3\np=7,3 v=-1,2\np=2,4 v=2,-3\np=9,5 v=-3,-3";

interface Robot {
    p: Point;
    v: Point;
}

interface Variance2D {
    x: number;
    y: number;
}

const parseInput = (input: string): Robot[] => {
    const lines: string[] = input.trim().split("\n");

    return lines
        .map((line) => {
            const matches = line.match(/-?\d+/g);
            return matches ? matches.map(Number) : [];
        })
        .map((values: number[]) => {
            return {
                p: new Point(values[1], values[0]),
                v: new Point(values[3], values[2]),
            };
        });
};

const moveRobotForTime = (
    robot: Robot,
    time: number,
    x: number,
    y: number
): Point => {
    return robot.v.multiply(time).add(robot.p).modulo(x, y);
};

const calculateVariance = (coordinates: Point[]): Variance2D => {
    const xCoords: number[] = coordinates.map((coord) => coord.getX());
    const yCoords: number[] = coordinates.map((coord) => coord.getY());

    const mean = (arr: number[]): number =>
        arr.reduce((sum, value) => sum + value, 0) / arr.length;

    const variance = (arr: number[]): number => {
        const meanValue = mean(arr);
        return (
            arr.reduce(
                (sum, value) => sum + Math.pow(value - meanValue, 2),
                0
            ) / arr.length
        );
    };

    const varianceX: number = variance(xCoords);
    const varianceY: number = variance(yCoords);

    return { x: varianceX, y: varianceY };
};

export const part1 = (input: string): number => {
    let xSize: number = 103;
    let ySize: number = 101;
    const timePeriod: number = 100;

    const robots: Robot[] = parseInput(input);

    const robotQuads: number[] = robots
        .map((r: Robot) => moveRobotForTime(r, timePeriod, xSize, ySize))
        .filter(
            (p: Point) =>
                p.getX() != (xSize - 1) / 2 && p.getY() != (ySize - 1) / 2
        )
        .map((p: Point) => {
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

    const a: number = robotQuads.filter((x) => x == 0).length;
    const b: number = robotQuads.filter((x) => x == 1).length;
    const c: number = robotQuads.filter((x) => x == 2).length;
    const d: number = robotQuads.filter((x) => x == 3).length;

    return a * b * c * d;
};

export const part2 = (input: string): number => {
    let xSize: number = 103;
    let ySize: number = 101;
    const timePeriod: number = 1;

    const robots: Robot[] = parseInput(input);
    let positions: Point[] = [];

    for (let i = 0; i < 101 * 103; i++) {
        positions = robots.map((r) =>
            moveRobotForTime(r, timePeriod * i, xSize, ySize)
        );

        const variance: Variance2D = calculateVariance(positions);

        if (variance.x < 500 && variance.y < 500) {
            return i;
        }
    }

    console.log("Not found");

    return -1;
};

const drawPoints = (points: Point[], x: number, y: number) => {
    const matrix: string[][] = "."
        .repeat(y)
        .concat("\n")
        .repeat(x)
        .split("\n")
        .map((s) => s.split(""));
    points.forEach((p) => (matrix[p.getX()][p.getY()] = "X"));
    matrix.forEach((l) => console.log(l.join("")));
    console.log();
};
