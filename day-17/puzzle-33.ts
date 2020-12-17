import { parseCubes } from './cubes';

export const puzzle33 = () => {
  const grid = parseCubes();
  return solve(grid, false);
};

export const solve = (input: string[][], isPuzzle34: boolean) => {
  let map: { [key: string]: boolean } = {};
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
      if (input[y][x] === '#') {
        map[`${x},${y},0,0`] = true;
      }
    }
  }
  const height = [0, input.length];
  const width = [0, input[0].length];
  const depth = [0, 1];
  const hyper = [0, 1];
  for (let t = 0; t < 6; t++) {
    const newMap: { [key: string]: boolean } = {};
    depth[0]--;
    depth[1]++;
    width[0]--;
    width[1]++;
    height[0]--;
    height[1]++;
    if (isPuzzle34) {
      hyper[0]--;
      hyper[1]++;
    }
    for (let w = hyper[0]; w < hyper[1]; w++) {
      for (let z = depth[0]; z < depth[1]; z++) {
        for (let y = width[0]; y < width[1]; y++) {
          for (let x = height[0]; x < height[1]; x++) {
            const neigh = countAround(x, y, z, w, map, isPuzzle34);
            const isActive = map[`${x},${y},${z},${w}`];
            if (neigh === 3 || (neigh === 2 && isActive)) {
              newMap[`${x},${y},${z},${w}`] = true;
            }
          }
        }
      }
    }

    map = newMap;
  }
  return Object.keys(map).length;
};

const countAround = (
  x: number,
  y: number,
  z: number,
  w: number,
  map: { [key: string]: boolean },
  isPuzzle34: boolean
) => {
  let count = 0;
  for (let ww = isPuzzle34 ? w - 1 : 0; ww <= (isPuzzle34 ? w + 1 : 0); ww++) {
    for (let zz = z - 1; zz <= z + 1; zz++) {
      for (let yy = y - 1; yy <= y + 1; yy++) {
        for (let xx = x - 1; xx <= x + 1; xx++) {
          if (
            (xx !== x || yy !== y || zz !== z || ww !== w) &&
            map[`${xx},${yy},${zz},${ww}`]
          ) {
            count++;
          }
        }
      }
    }
  }
  return count;
};
