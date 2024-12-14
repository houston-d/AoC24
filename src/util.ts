import { existsSync, readFileSync, writeFileSync } from 'fs';
import axios from 'axios';

export const readFile = async (day: number): Promise<string> => {
  const path: string = `../src/input/${day}.txt`;

  if (existsSync(path)) {
    return readFileSync(path, 'utf-8');
  }

  const sessionPath: string = '../session.txt';

  if (!existsSync(sessionPath)) {
    console.error("No session id found. Please create a \'session.txt\' at the root of the project");
    throw ReferenceError();
  }

  const sessionId: string = readFileSync(sessionPath, 'utf-8');

  if (sessionId.length == 0) {
    console.error("Session id is empty. Please add a session id");
    throw ReferenceError();
  }

  const url: string = `https://adventofcode.com/2024/day/${day}/input`;
  const sessionStr = 'session='.concat(sessionId); 

  const input: string = await axios.get(url, { headers: { Cookie: sessionStr } })
  .then(response => {
      writeFileSync(path, `${response.data}`);
      return `${response.data}`;
    })
  .catch((error) => {
      console.error('Error while fetching input ' + error);
      throw Error();
    });
  

  return input;
};

export const sortStringList = (input: string[], reverse: boolean = false): string[] => {
  return input.sort((a: string, b: string) => {
    if (reverse) {
      return a > b ? -1 : 1;
    }
    return a > b ? 1 : -1;
  });
}

export const permutator = (inputArr: any[]): any[][] => {
  let result: any[][] = [];

  const permute = (arr: any[], m: any[] = []) => {
    if (arr.length === 0 && !!m) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
     }
   }
 }

 permute(inputArr);

 return result;
}

export const swapArray = (arr: any[], s1: number, s2: number): any[] => {
    const temp = arr[s1];
    arr[s1] = arr[s2];
    arr[s2] = temp;

    return arr;
}

export const getAllIndexesForValue = (val: any, arr: any[]): number[] => {
  const indexes: number[] = [];
  let i: number = -1;

  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }

  return indexes;
}


export class Point {
    private x: number;
    private y: number;

    constructor(x_: number, y_: number) {
        this.x = x_;
        this.y = y_;
    }

    add(other: Point): Point {
        return new Point(this.x + other.x, this.y + other.y);
    }

    equals(other: Point): boolean {
        return this.x == other.x && this.y == other.y;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }

    multiply(v: number): Point {
        return new Point(this.x * v, this.y * v);
    }

    modulo(xMod: number, yMod: number): Point {
        let xNew: number = this.x % xMod;
        let yNew: number = this.y % yMod;

        if (xNew < 0) {
            xNew = xMod + xNew;
        }

        if (yNew < 0) {
            yNew = yMod + yNew;
        }

        return new Point(xNew, yNew);
    }
}