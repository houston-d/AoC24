import { Point } from "../util";

const example: string =
    "Button A: X+94, Y+34\nButton B: X+22, Y+67\nPrize: X=8400, Y=5400\nButton A: X+26, Y+66\nButton B: X+67, Y+21\nPrize: X=12748, Y=12176\n\nButton A: X+17, Y+86\nButton B: X+84, Y+37\nPrize: X=7870, Y=6450\n\nButton A: X+69, Y+23\nButton B: X+27, Y+71\nPrize: X=18641, Y=10279";

interface Machine {
    A: Point;
    B: Point;
    P: Point;
}

const parseInput = (input: string, offset: number) => {
    const regex =
        /Button A: X\+(\d+), Y\+(\d+)\nButton B: X\+(\d+), Y\+(\d+)\nPrize: X=(\d+), Y=(\d+)/g;
    let match;
    const machines: Machine[] = [];

    while ((match = regex.exec(input)) !== null) {
        const machine: Machine = {
            A: new Point(parseInt(match[1], 10), parseInt(match[2], 10)),
            B: new Point(parseInt(match[3], 10), parseInt(match[4], 10)),
            P: new Point(
                parseInt(match[5], 10) + offset,
                parseInt(match[6], 10) + offset
            ),
        };
        machines.push(machine);
    }

    return machines;
};

const calculateCostForMachine = (machine: Machine): number => {
    const b = Math.floor(
        (machine.P.getY() * machine.A.getX() -
            machine.P.getX() * machine.A.getY()) /
            (machine.B.getY() * machine.A.getX() -
                machine.B.getX() * machine.A.getY())
    );
    const a = Math.floor(
        (machine.P.getX() - machine.B.getX() * b) / machine.A.getX()
    );

    if (
        a >= 0 &&
        b >= 0 &&
        a * machine.A.getX() + b * machine.B.getX() == machine.P.getX() &&
        a * machine.A.getY() + b * machine.B.getY() == machine.P.getX()
    )
        return 3 * a + b;

    return 0;
};

export const part1 = (input: string): number => {
    const machines: Machine[] = parseInput(input, 0);

    return machines
        .map((m) => calculateCostForMachine(m))
        .reduce((sum, current) => sum + current, 0);
};

export const part2 = (input: string): number => {
    const machines: Machine[] = parseInput(input, 10000000000000);

    return machines
        .map((m) => calculateCostForMachine(m))
        .reduce((sum, current) => sum + current, 0);
};
