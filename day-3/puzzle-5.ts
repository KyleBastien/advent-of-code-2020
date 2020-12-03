import { TREE, treeMap } from './map';

const X_SLOPE = 3;
const Y_SLOPE = 1;

export const puzzle5 = () => {
  return calculateTreesGivenSlope(treeMap, X_SLOPE, Y_SLOPE);
};

export const calculateTreesGivenSlope = (
  treeMap: string[],
  slopeX: number,
  slopeY: number
) => {
  const width = treeMap[0].length;
  const height = treeMap.length;
  let x = 0;
  let y = 0;
  let treeCount = 0;
  while (y < height) {
    if (treeMap[y][x] === TREE) {
      treeCount++;
    }
    x = (x + slopeX) % width;
    y = y + slopeY;
  }
  return treeCount;
};
