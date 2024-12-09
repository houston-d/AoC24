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

export const swapArray = (Array:any,Swap1:number,Swap2:number) : any => {
    var temp = Array[Swap1];
    Array[Swap1] = Array[Swap2]
    Array[Swap2] = temp
    return Array;
}