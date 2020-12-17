export const cubes = [
  '.##...#.',
  '.#.###..',
  '..##.#.#',
  '##...#.#',
  '#..#...#',
  '#..###..',
  '.##.####',
  '..#####.',
];

export const parseCubes = () => {
  return cubes.map((x) => x.split(''));
};
