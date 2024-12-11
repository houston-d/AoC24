const example: string = "125 17";

const transformSingleStoneOnce = (stone: number): number[] => {
    if (stone === 0) {
        return [1];
    }

    if (stone.toString().length % 2 === 0) {
        const strStone = stone.toString();
        const mid = strStone.length / 2;
        const left = parseInt(strStone.slice(0, mid), 10);
        const right = parseInt(strStone.slice(mid), 10);
        return [left, right];
    }

    return [stone * 2024];
};

const transformStoneListOnce = (stones: number[]) => {
    return stones.flatMap((s) => transformSingleStoneOnce(s));
};

interface Seen {
    [key: string]: number;
}

const seen: Seen = {};

const transformStoneList = (stones: number[], times: number): number => {
    if (times == 0) {
        return 1;
    }

    const newStones = transformStoneListOnce(stones);

    return newStones
        .map((s) => {
            if (seen[`${s}, ${times}`]) {
                return seen[`${s}, ${times}`];
            }

            const transformedStone = transformStoneList([s], times - 1);
            seen[`${s}, ${times}`] = transformedStone;
            return transformedStone;
        })
        .reduce((sum, current) => sum + current, 0);
};

export const part1 = (input: string): number => {
    const stones: number[] = input.split(" ").map(Number);

    return transformStoneList(stones, 25);
};

export const part2 = (input: string): number => {
    const stones: number[] = input.split(" ").map(Number);

    return transformStoneList(stones, 75);
};
