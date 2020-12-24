import { getCounts } from './directions';
import { HexDirection, Point2D } from './point';

export const puzzle48 = () => {
  const counts = getCounts();

  let black = new Set<string>();
  for (const k of counts.keys()) {
    const value = counts.get(k);
    if (value && value[1] % 2 === 1) {
      black.add(value[0].toString());
    }
  }

  for (let i = 0; i < 100; i++) {
    const nCounts = new Map<string, number>();
    for (const b of black) {
      const pointNumbers = b.split(',').map((num) => parseInt(num, 10));
      const newPoint = new Point2D(pointNumbers[0], pointNumbers[1]);
      const existingNCount = nCounts.get(b.toString());
      if (!existingNCount) {
        nCounts.set(b.toString(), 0);
      }
      for (const h of Object.keys(HexDirection)) {
        const point = new Point2D(
          newPoint.x + HexDirection[h][0],
          newPoint.y + HexDirection[h][1]
        );
        const existingValue = nCounts.get(point.toString());
        if (existingValue) {
          nCounts.set(point.toString(), existingValue + 1);
        } else {
          nCounts.set(point.toString(), 1);
        }
      }
    }

    const newBlack = new Set<string>();
    for (const k of nCounts.keys()) {
      const value = nCounts.get(k);
      if (value && black.has(k)) {
        if (value === 1 || value === 2) {
          newBlack.add(k);
        }
      } else if (value) {
        if (value === 2) {
          newBlack.add(k);
        }
      }
    }
    black = newBlack;
  }

  return black.size;
};
