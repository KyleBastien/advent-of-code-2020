import { xMasData } from './xmas-data';

export const puzzle18 = () => {
  const sumToFind = 22406676;

  for (let i = 0; i < xMasData.length; i++) {
    for (let j = i + 1; j < xMasData.length; j++) {
      const subSet = xMasData.slice(i, j);
      const sumOfSubSet = subSet.reduce((a, b) => {
        return a + b;
      });
      if (sumOfSubSet === sumToFind) {
        const min = Math.min(...subSet);
        const max = Math.max(...subSet);
        return min + max;
      }
    }
  }

  // never found num in list
  return undefined;
};
