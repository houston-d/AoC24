import { readFileSync } from 'fs';

export const readFile = (day: number): string => {
  return readFileSync(`../src/input/${day}.txt`, 'utf-8');
};