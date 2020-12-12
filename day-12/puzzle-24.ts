import { Action, parseShipInstructions } from './instructions';

export const puzzle24 = () => {
  const waypoint = {
    xValue: 10,
    yValue: 1,
    rotation: 0,
  };
  let shipNorthValue = 0;
  let shipEastValue = 0;

  const instructions = parseShipInstructions();

  for (const instruction of instructions) {
    const action = instruction[0];
    const value = instruction[1];
    switch (action) {
      case Action.N: {
        switch (waypoint.rotation) {
          case 0:
            waypoint.yValue += value;
            break;
          case 90:
            waypoint.xValue -= value;
            break;
          case 180:
            waypoint.yValue -= value;
            break;
          case 270:
            waypoint.xValue += value;
            break;
        }
        break;
      }
      case Action.S: {
        switch (
          waypoint.rotation // same as N but *-1
        ) {
          case 0:
            waypoint.yValue -= value;
            break;
          case 90:
            waypoint.xValue += value;
            break;
          case 180:
            waypoint.yValue += value;
            break;
          case 270:
            waypoint.xValue -= value;
            break;
        }
        break;
      }
      case Action.E: {
        switch (waypoint.rotation) {
          case 0:
            waypoint.xValue += value;
            break;
          case 90:
            waypoint.yValue += value;
            break;
          case 180:
            waypoint.xValue -= value;
            break;
          case 270:
            waypoint.yValue -= value;
            break;
        }
        break;
      }
      case Action.W: {
        switch (
          waypoint.rotation // -1 * East
        ) {
          case 0:
            waypoint.xValue -= value;
            break;
          case 90:
            waypoint.yValue -= value;
            break;
          case 180:
            waypoint.xValue += value;
            break;
          case 270:
            waypoint.yValue += value;
            break;
        }
        break;
      }
      case Action.L: {
        waypoint.rotation -= value;
        if (waypoint.rotation < 0) {
          waypoint.rotation += 360;
        }
        break;
      }
      case Action.R: {
        waypoint.rotation += value;
        if (waypoint.rotation > 270) {
          waypoint.rotation -= 360;
        }
        break;
      }
      case Action.F: {
        switch (waypoint.rotation) {
          case 0:
            shipEastValue += waypoint.xValue * value;
            shipNorthValue += waypoint.yValue * value;
            break;
          case 90:
            shipEastValue += waypoint.yValue * value;
            shipNorthValue += waypoint.xValue * value * -1;
            break;
          case 180:
            shipEastValue += waypoint.xValue * value * -1;
            shipNorthValue += waypoint.yValue * value * -1;
            break;
          case 270:
            shipEastValue += waypoint.yValue * value * -1;
            shipNorthValue += waypoint.xValue * value;
            break;
        }
        break;
      }
    }
  }

  return Math.abs(shipNorthValue) + Math.abs(shipEastValue);
};
