import {
  chunkTilesByBlankLine,
  flipGrid,
  nessie,
  rotateGrid,
  Tile,
} from './tiles';

const NHEIGHT = nessie.length;
const NWIDTH = nessie[0].length;
let usedGrid: boolean[][] = [];

export const puzzle40 = () => {
  const tilesChunkedByLines = chunkTilesByBlankLine();
  const WIDTH = 10;
  const tiles = [];
  for (const chunk of tilesChunkedByLines) {
    tiles.push(new Tile(chunk));
  }

  const counts = new Map<number, number>();
  for (const tile of tiles) {
    for (const i of tile.edgeVals) {
      const existingValue = counts.get(i);
      if (!existingValue) {
        counts.set(i, 1);
      } else {
        counts.set(i, existingValue + 1);
      }
    }
  }

  const TWIDTH = Math.sqrt(tiles.length);
  const tileGrid: Tile[][] = [];

  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];
    if (!tile.isCorner(counts)) {
      continue;
    }

    while (counts.get(tile.getEdgeVal(3)) !== 1) {
      tile.rotate();
    }
    if (counts.get(tile.getEdgeVal(0)) !== 1) {
      tile.flipVertical();
    }

    if (!tileGrid[0]) {
      tileGrid[0] = [];
    }
    tileGrid[0][0] = tile;
    tiles.splice(i, 1);
    break;
  }

  for (let y = 1; y < TWIDTH; y++) {
    const tgt = tileGrid[0][y - 1].getEdgeVal(2);
    for (let t = 0; t < tiles.length; t++) {
      const tile = tiles[t];
      if (tile.edgeVals.indexOf(tgt) > -1) {
        for (let i = 0; i < 3; i++) {
          if (tile.getEdgeVal(0) === tgt) {
            break;
          }
          tile.rotate();
        }
        if (tile.getEdgeVal(0) !== tgt) {
          tile.flipVertical();
        }
        for (let i = 0; i < 3; i++) {
          if (tile.getEdgeVal(0) === tgt) {
            break;
          }
          tile.rotate();
        }
        if (tile.getEdgeVal(0) !== tgt) {
          console.log("Couldn't match!");
        }

        tileGrid[0][y] = tile;
        tiles.splice(t, 1);
        break;
      }
    }
  }

  for (let y = 0; y < TWIDTH; y++) {
    for (let x = 1; x < TWIDTH; x++) {
      const tgt = tileGrid[x - 1][y].getEdgeVal(1);
      for (let t = 0; t < tiles.length; t++) {
        const tile = tiles[t];
        if (tile.edgeVals.indexOf(tgt) > -1) {
          for (let i = 0; i < 3; i++) {
            if (tile.getEdgeVal(3) === tgt) {
              break;
            }
            tile.rotate();
          }
          if (tile.getEdgeVal(3) !== tgt) {
            tile.flipVertical();
          }
          for (let i = 0; i < 3; i++) {
            if (tile.getEdgeVal(3) === tgt) {
              break;
            }
            tile.rotate();
          }
          if (tile.getEdgeVal(3) !== tgt) {
            console.log("Couldn't match!");
          }

          if (!tileGrid[x]) {
            tileGrid[x] = [];
          }
          tileGrid[x][y] = tile;
          tiles.splice(t, 1);
          break;
        }
      }
    }
  }

  const BWIDTH = TWIDTH * (WIDTH - 2);
  usedGrid = [];
  for (let y = 0; y < BWIDTH; y++) {
    usedGrid.push([]);
  }

  let cgrid: boolean[][] = [];
  for (let tx = 0; tx < TWIDTH; tx++) {
    for (let ty = 0; ty < TWIDTH; ty++) {
      for (let x = 0; x < WIDTH - 2; x++) {
        for (let y = 0; y < WIDTH - 2; y++) {
          if (!cgrid[tx * (WIDTH - 2) + x]) {
            cgrid[tx * (WIDTH - 2) + x] = [];
          }
          cgrid[tx * (WIDTH - 2) + x][ty * (WIDTH - 2) + y] =
            tileGrid[tx][ty].data[x + 1][y + 1];
        }
      }
    }
  }

  let result = 0;
  for (let i = 0; i < 4; i++) {
    const v = findMonster(cgrid);
    const gmResult = gm(cgrid, usedGrid);
    if (v > 0) {
      result = gmResult;
    }
    cgrid = rotateGrid(cgrid);
  }
  cgrid = flipGrid(cgrid);
  for (let i = 0; i < 4; i++) {
    const v = findMonster(cgrid);
    const gmResult = gm(cgrid, usedGrid);
    if (v > 0) {
      result = gmResult;
    }
    cgrid = rotateGrid(cgrid);
  }
  return result;
};

export const findMonster = (grid: boolean[][]): number => {
  let count = 0;
  const width = grid.length;
  for (let y = 0; y < width - (NHEIGHT - 1); y++) {
    outer: for (let x = 0; x < width - (NWIDTH - 1); x++) {
      for (let ny = 0; ny < NHEIGHT; ny++) {
        const nline = nessie[ny];
        for (let nx = 0; nx < NWIDTH; nx++) {
          if (nline.charAt(nx) !== '#') {
            continue;
          }

          if (!grid[x + nx][y + ny]) {
            continue outer;
          }
        }
      }
      count++;

      for (let ny = 0; ny < NHEIGHT; ny++) {
        const nline = nessie[ny];
        for (let nx = 0; nx < NWIDTH; nx++) {
          if (nline.charAt(nx) !== '#') {
            continue;
          }
          usedGrid[x + nx][y + ny] = true;
        }
      }
    }
  }

  return count;
};

export const gm = (grid: boolean[][], usedGrid: boolean[][]) => {
  const width = grid.length;
  let count = 0;
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < width; x++) {
      if (!usedGrid[x]) {
        usedGrid[x] = [];
      }
      if (grid[x][y] && !usedGrid[x][y]) {
        count++;
      }
    }
  }
  return count;
};
