import { EMPTY_SEAT, FLOOR, TAKEN_SEAT } from './seats';

export class Grid {
  private grid: string[][];
  constructor(initialGridState: string[][]) {
    this.grid = [...initialGridState];
  }

  getFirstInDir(
    values: string[],
    x: number,
    y: number,
    [h, v]: [number, number]
  ): [number, number] {
    let _x = x + h;
    let _y = y + v;
    while (this.grid[_y] && this.grid[_y][_x]) {
      if (values.includes(this.grid[_y][_x])) {
        return [_x, _y];
      }
      _x += h;
      _y += v;
    }

    return [-1, -1];
  }

  getVisualNeighbors(x: number, y: number): string[] {
    return [
      this.getFirstInDir([TAKEN_SEAT, EMPTY_SEAT], x, y, [0, -1]), // top
      this.getFirstInDir([TAKEN_SEAT, EMPTY_SEAT], x, y, [1, -1]), // top right
      this.getFirstInDir([TAKEN_SEAT, EMPTY_SEAT], x, y, [1, 0]), // right
      this.getFirstInDir([TAKEN_SEAT, EMPTY_SEAT], x, y, [1, 1]), // bottom right
      this.getFirstInDir([TAKEN_SEAT, EMPTY_SEAT], x, y, [0, 1]), // bottom
      this.getFirstInDir([TAKEN_SEAT, EMPTY_SEAT], x, y, [-1, 1]), // bottom left
      this.getFirstInDir([TAKEN_SEAT, EMPTY_SEAT], x, y, [-1, 0]), // left
      this.getFirstInDir([TAKEN_SEAT, EMPTY_SEAT], x, y, [-1, -1]), // top left
    ]
      .filter((v) => {
        return v[0] !== -1 && v[1] !== -1;
      })
      .filter(
        ([_x, _y]) =>
          typeof (this.grid[_y] && this.grid[_y][_x]) !== 'undefined'
      )
      .map(([_x, _y]) => this.grid[_y][_x]);
  }

  getNeighbors(x: number, y: number) {
    // prettier-ignore
    const neighbors = [
            [x, y - 1],     // top
            [x + 1, y - 1], // top right
            [x + 1, y],     // right
            [x + 1, y + 1], // bottom right
            [x, y + 1],     // bottom
            [x - 1, y + 1], // bottom left
            [x - 1, y],     // left
            [x - 1, y - 1], // top left
        ].filter(([_x, _y]) => typeof (this.grid[_y] && this.grid[_y][_x]) !== 'undefined');

    return neighbors.map(([_x, _y]) => this.grid[_y][_x]);
  }

  run(part: number) {
    let changed;
    do {
      const newGridState: string[][] = Array(this.grid.length)
        .fill(undefined)
        .map(() => Array(this.grid[0].length).fill(undefined));
      changed = false;

      for (let y = 0; y < this.grid.length; y++) {
        for (let x = 0; x < this.grid[0].length; x++) {
          const cell = this.grid[y][x];

          const neighbors =
            part === 1
              ? this.getNeighbors(x, y)
              : this.getVisualNeighbors(x, y);
          let occupiedNeighbors = 0;

          neighbors.forEach((n) => {
            if (n === TAKEN_SEAT) {
              occupiedNeighbors++;
            }
          });

          if (cell === FLOOR) {
            newGridState[y][x] = FLOOR;
          } else if (cell === EMPTY_SEAT) {
            if (occupiedNeighbors === 0) {
              newGridState[y][x] = TAKEN_SEAT;
              changed = true;
            } else newGridState[y][x] = EMPTY_SEAT;
          } else if (cell === TAKEN_SEAT) {
            if (occupiedNeighbors >= (part === 1 ? 4 : 5)) {
              newGridState[y][x] = EMPTY_SEAT;
              changed = true;
            } else newGridState[y][x] = TAKEN_SEAT;
          } else {
            console.error('Huh?', cell);
          }
        }
      }

      // Update our real grid
      this.grid = newGridState;
    } while (changed);

    return this.countType();
  }

  countType(type = TAKEN_SEAT) {
    let count = 0;
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[0].length; x++) {
        if (this.grid[y][x] === type) {
          count++;
        }
      }
    }

    return count;
  }
}
