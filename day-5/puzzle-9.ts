import {
  BACK_HALF,
  boardingPasses,
  FRONT_HALF,
  HIGH_ROW,
  HIGH_SEAT,
  LEFT_SEATS,
  LOW_ROW,
  LOW_SEAT,
  RIGHT_SEATS,
} from './boarding-passes';

export const puzzle9 = () => {
  let highestSeatId = 0;
  for (const boardingPass of boardingPasses) {
    const seatId = getSeatId(boardingPass);
    if (seatId > highestSeatId) {
      highestSeatId = seatId;
    }
  }
  return highestSeatId;
};

export const getSeatId = (boardingPass: string): number => {
  const rowId = calculateRowId(boardingPass.substring(0, 7));
  const columnId = calculateColumnId(boardingPass.substring(7));
  const seatId = rowId * 8 + columnId;
  return seatId;
};

export const calculateRowId = (rowString: string): number => {
  const range: [number, number] = [LOW_ROW, HIGH_ROW];
  return calculateBinarySpacePartitioning(
    rowString,
    range,
    FRONT_HALF,
    BACK_HALF
  );
};

export const calculateColumnId = (columnString: string): number => {
  const range: [number, number] = [LOW_SEAT, HIGH_SEAT];
  return calculateBinarySpacePartitioning(
    columnString,
    range,
    LEFT_SEATS,
    RIGHT_SEATS
  );
};

export const calculateBinarySpacePartitioning = (
  searchString: string,
  range: [number, number],
  lowEndIndicator: string,
  highEndIndicator: string
): number => {
  let rangeCopy = range.splice(0) as [number, number];
  let result = 0;
  for (const half of searchString) {
    const isLastIteration = rangeCopy[1] - rangeCopy[0] === 1;
    if (isLastIteration && half === lowEndIndicator) {
      result = rangeCopy[0];
      break;
    } else if (isLastIteration && half === highEndIndicator) {
      result = rangeCopy[1];
      break;
    }
    rangeCopy = calculateNewRange(rangeCopy, half, lowEndIndicator);
  }
  return result;
};

export const calculateNewRange = (
  range: [number, number],
  half: string,
  lowEndIndicator: string
): [number, number] => {
  if (half === lowEndIndicator) {
    // take lower half of range
    const middle = Math.floor((range[0] + range[1]) / 2);
    return [range[0], middle];
  } else {
    // take higher half of range
    const middle = Math.ceil((range[0] + range[1]) / 2);
    return [middle, range[1]];
  }
};
