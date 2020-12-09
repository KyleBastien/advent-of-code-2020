import { PREAMBLE_LENGTH, xMasData } from './xmas-data';

export const puzzle17 = () => {
  const queueOfTwentyFive = [];
  for (let i = 0; i < PREAMBLE_LENGTH; i++) {
    queueOfTwentyFive.push(xMasData[i]);
  }

  for (let i = PREAMBLE_LENGTH; i < xMasData.length; i++) {
    if (!hasSumInList(queueOfTwentyFive, xMasData[i])) {
      return xMasData[i];
    }

    queueOfTwentyFive.shift();
    queueOfTwentyFive.push(xMasData[i]);
  }
  // No non-sum found in xMasData
  return undefined;
};

const hasSumInList = (queue: Array<number>, numberToCheck: number): boolean => {
  for (const first of queue) {
    for (const second of queue) {
      if (first + second === numberToCheck) {
        return true;
      }
    }
  }
  return false;
};
