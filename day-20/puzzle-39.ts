import { chunkTilesByBlankLine, Tile } from './tiles';

export const puzzle39 = () => {
  const tilesChunkedByLines = chunkTilesByBlankLine();
  const tiles: Tile[] = [];
  for (const chunk of tilesChunkedByLines) {
    tiles.push(new Tile(chunk));
  }

  const counts: Map<number, number> = new Map();
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

  let answer = 1;
  for (const tile of tiles) {
    let count = 0;
    for (const i of tile.edgeVals) {
      if (counts.get(i) === 1) {
        count++;
      }
    }
    if (count > 2) {
      answer *= tile.id;
    }
  }

  return answer;
};
