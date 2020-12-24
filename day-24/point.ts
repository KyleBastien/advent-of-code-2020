export class Point2D {
  constructor(public x: number, public y: number) {}

  public toString(): string {
    return `${this.x},${this.y}`;
  }
}

export const HexDirection: { [key: string]: [number, number] } = {
  E: [0, 1],
  W: [0, -1],
  NE: [1, 0],
  NW: [1, -1],
  SE: [-1, 1],
  SW: [-1, 0],
};
