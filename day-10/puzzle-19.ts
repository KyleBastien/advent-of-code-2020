import { sortJoltAdapters } from './joltage-adapters';

export const puzzle19 = () => {
  const jolts = sortJoltAdapters();
  // add the device jolts
  jolts.push(jolts[jolts.length - 1] + 3);
  // add the walls jolts
  jolts.unshift(0);

  let differenceOneJolt = 0;
  let differenceTwoJolt = 0;

  for (let i = 0; i < jolts.length; i++) {
    const diff = jolts[i] - jolts[i - 1];
    if (diff === 1) {
      differenceOneJolt++;
    }
    if (diff === 3) {
      differenceTwoJolt++;
    }
  }
  return differenceOneJolt * differenceTwoJolt;
};
