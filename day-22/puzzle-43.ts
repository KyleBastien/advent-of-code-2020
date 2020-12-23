import { Deck, parseDecks } from './deck';

export const puzzle43 = () => {
  const decks = parseDecks();
  return deckScore(combat(...decks));
};

export const deckScore = (d: Deck) =>
  d.reduce((s, c, i) => s + c * (d.length - i), 0);

export const combat = (d1: Deck, d2: Deck): Deck => {
  while (d1.length > 0 && d2.length > 0) {
    const c1 = d1.shift() as number;
    const c2 = d2.shift() as number;
    if (c1 > c2) {
      d1.push(c1);
      d1.push(c2);
    } else {
      d2.push(c2);
      d2.push(c1);
    }
  }
  return d1.length ? d1 : d2;
};
