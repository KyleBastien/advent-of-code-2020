import { getBusTimes } from './bus-notes';

export const puzzle26 = () => {
  const buses = getBusTimes();
  let t = 100000000000000;
  let i = 0;
  let s = 1;
  while (i < buses.length) {
    if (buses[i] == 'x') {
      i++;
    } else {
      if ((t + i) % Number(buses[i]) == 0) {
        s *= Number(buses[i]);
        i++;
      } else {
        t += s;
      }
    }
  }
  return t;
};
