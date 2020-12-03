import { treeMap } from './map';
import { calculateTreesGivenSlope } from './puzzle-5';

export const puzzle6 = () => {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  let result = 1;
  for (const slope of slopes) {
    const trees = calculateTreesGivenSlope(treeMap, slope[0], slope[1]);
    result = result * trees;
  }

  return result;
};
