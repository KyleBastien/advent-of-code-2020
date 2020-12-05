import { boardingPasses } from './boarding-passes';
import { getSeatId } from './puzzle-9';

export const puzzle10 = () => {
  const seatIds: number[] = [];
  for (const boardingPass of boardingPasses) {
    const seatId = getSeatId(boardingPass);
    seatIds.push(seatId);
  }
  seatIds.sort((a, b) => {
    return a - b;
  });
  let mySeatId = 0;
  for (const [index, seatId] of seatIds.entries()) {
    if (seatIds[index + 1] - seatId !== 1) {
      mySeatId = seatIds[index + 1] - 1;
      break;
    }
  }
  return mySeatId;
};
