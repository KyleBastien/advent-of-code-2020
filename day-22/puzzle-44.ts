import { Deck, parseDecks } from './deck';
import { deckScore } from './puzzle-43';

export const puzzle44 = () => {
  return deckScore(recursiveCombat(...parseDecks())[1]);
};

export const recursiveCombat = (d1: Deck, d2: Deck): [number, Deck] => {
  const seen = new Set();
  while (d1.length > 0 && d2.length > 0) {
    const state = `${d1}:${d2}`;
    if (seen.has(state)) {
      return [1, d1];
    }
    seen.add(state);

    const c1 = d1.shift() as number;
    const c2 = d2.shift() as number;

    let winner;
    if (d1.length >= c1 && d2.length >= c2) {
      winner = recursiveCombat(d1.slice(0, c1), d2.slice(0, c2))[0];
    } else {
      winner = c1 > c2 ? 1 : 2;
    }

    if (winner == 1) {
      d1.push(c1);
      d1.push(c2);
    } else {
      d2.push(c2);
      d2.push(c1);
    }
  }

  return [d1.length > 0 ? 1 : 2, d1.length > 0 ? d1 : d2];
};
