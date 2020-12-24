import { getCounts } from './directions';

export const puzzle47 = () => {
  const counts = getCounts();

  let count = 0;
  for (const i of counts.values()) {
    const number = i[1];
    if (number % 2 === 1) {
      count++;
    }
  }
  return count;
};
