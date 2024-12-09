
const example: string = "2333133121414131402"

const getData = (input: string): string[] => {
  let curr: number = 0;
  let data: string[] = [];

  for (let i = 0; i < input.length; i++) {
    if (i % 2 == 0) {
      `${curr} `.repeat(+input[i]).split(" ").filter(s => s.length > 0).forEach(c => data.push(c));
      curr++;
    } else {
      '.'.repeat(+input[i]).split("").forEach(c => data.push(c));
    }
  }

  return data;
}

interface Gap {
  idx: number;
  l: number;
}

const findGaps = (data: string[]): Gap[] => {
  let currLength: number = 0;
  let currIdx: number = -1;
  const gaps: Gap[] = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i] != '.' && currIdx != -1) {
      gaps.push({idx: currIdx, l: currLength});
      currIdx = -1;
      currLength = 0;
    }

    if (data[i] != '.') continue;

    if (currIdx == -1) {
      currIdx = i;
    }

    currLength++;
  }

  return gaps;
}

const getFirstGap = (length: number, gaps: Gap[]): number => {
  for(let i = 0; i < gaps.length; i++) {
    if (gaps[i].l >= length) {
      return i
    }
  }

  return -1;
}

const checksum = (data: string[]): number => {
  return data.map((i: string, idx: number) => (i != '.' ? +i : 0) * idx).reduce((sum, current) => sum + current, 0)
}

export const part1 = (input: string): number => {
  let data: string[] = getData(input);

  let sortedData: string[] = [];
  let remaining: number = data.length - 1;

  for (let i = 0; i <= remaining; i++) {
    if (data[i] != '.') {
      sortedData.push(data[i]);
    } else {
      while(data[remaining] == '.') {
        remaining--;
      }

      if (remaining >= i) {
        sortedData.push(data[remaining]);
        remaining--;
      }
    }
  }

  return checksum(sortedData);
}

export const part2 = (input: string): number => {
  let data: string[] = getData(input);
  let gaps: Gap[] = findGaps(data);

  let sortedData: string[] = [];
  data.forEach(c => sortedData.push(c));
  
  let currIdx: number = -1;
  let currLength: number = 0;

  for (let i = data.length - 1; i >= 0; i--) {
    if ((data[i] == '.' && currIdx != -1) || (+data[i] != currIdx && currIdx != -1)) {
      const firstGap = getFirstGap(currLength, gaps);

      if (firstGap >= 0 && gaps[firstGap].idx <= i) {
        for (let j = 0; j < currLength; j++) {
          sortedData[gaps[firstGap].idx + j] = `${currIdx}`;
          sortedData[i + 1 + j] = '.';
        }

        gaps = findGaps(sortedData);
      }
      
      currIdx = -1;
      currLength = 0;
    }

    if (data[i] == '.') continue;

    if (currIdx == -1) {
      currIdx = +data[i];
    }

    currLength++;
  }

  return checksum(sortedData);
}