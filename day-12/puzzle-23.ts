import { Action, Directions, parseShipInstructions } from './instructions';

const leftProgressDirections = [
  Directions.E,
  Directions.N,
  Directions.W,
  Directions.S,
];

const rightProgressDirection = [
  Directions.E,
  Directions.S,
  Directions.W,
  Directions.N,
];

export const puzzle23 = () => {
  let eastValue = 0;
  let northValue = 0;
  let currentDirection = Directions.E;

  const instructions = parseShipInstructions();

  for (const instruction of instructions) {
    const action = instruction[0];
    const value = instruction[1];
    switch (action) {
      case Action.N: {
        northValue += value;
        break;
      }
      case Action.S: {
        northValue -= value;
        break;
      }
      case Action.E: {
        eastValue += value;
        break;
      }
      case Action.W: {
        eastValue -= value;
        break;
      }
      case Action.L: {
        const valueBy90 = value / 90;
        const currentIndex = leftProgressDirections.indexOf(currentDirection);
        const newIndex =
          (currentIndex + valueBy90) % leftProgressDirections.length;
        currentDirection = leftProgressDirections[newIndex];
        break;
      }
      case Action.R: {
        const valueBy90 = value / 90;
        const currentIndex = rightProgressDirection.indexOf(currentDirection);
        const newIndex =
          (currentIndex + valueBy90) % rightProgressDirection.length;
        currentDirection = rightProgressDirection[newIndex];
        break;
      }
      case Action.F: {
        if (currentDirection === Directions.N) {
          northValue += value;
        } else if (currentDirection === Directions.W) {
          eastValue -= value;
        } else if (currentDirection === Directions.S) {
          northValue -= value;
        } else if (currentDirection === Directions.E) {
          eastValue += value;
        }
        break;
      }
    }
  }

  return Math.abs(eastValue) + Math.abs(northValue);
};
