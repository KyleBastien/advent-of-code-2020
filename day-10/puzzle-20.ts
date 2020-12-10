import { sortJoltAdapters } from './joltage-adapters';

export const puzzle20 = () => {
  const jolts = sortJoltAdapters();
  // add the device jolts
  jolts.push(jolts[jolts.length - 1] + 3);
  // add the walls jolts
  jolts.unshift(0);

  const numOfRoutes: { [key: number]: number } = {};

  numOfRoutes[jolts[jolts.length - 1]] = 1;

  for (let i = jolts.length - 2; i >= 0; i--) {
    numOfRoutes[jolts[i]] = 0;
    for (let j = i + 1; j < jolts.length && j <= i + 3; j++) {
      if (jolts[j] - jolts[i] <= 3) {
        numOfRoutes[jolts[i]] += numOfRoutes[jolts[j]];
      }
    }
  }

  return numOfRoutes[0];
};
