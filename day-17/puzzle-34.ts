import { parseCubes } from './cubes';
import { solve } from './puzzle-33';

export const puzzle34 = () => {
  const grid = parseCubes();
  return solve(grid, true);
};
