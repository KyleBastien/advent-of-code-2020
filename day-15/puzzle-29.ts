import { numbers } from './numbers';

export const puzzle29 = () => {
  return getNumberInSequenceAtIndex(2020);
};

export const getNumberInSequenceAtIndex = (index: number) => {
  const lastSpokenTurn = new Map<number, number>();
  const previousSpokenTurn = new Map<number, number>();
  const timesSpoken = new Map<number, number>();
  let turn = 1;
  let lastNumber = 0;
  for (const num of numbers) {
    lastSpokenTurn.set(num, turn);
    timesSpoken.set(num, 1);
    lastNumber = num;
    turn++;
  }

  while (turn < index + 1) {
    let thisNumber: number;
    if (timesSpoken.get(lastNumber) === 1) {
      thisNumber = 0;
    } else {
      thisNumber =
        (lastSpokenTurn.get(lastNumber) ?? 0) -
        (previousSpokenTurn.get(lastNumber) ?? 0);
    }

    if (lastSpokenTurn.has(thisNumber)) {
      previousSpokenTurn.set(thisNumber, lastSpokenTurn.get(thisNumber) ?? 0);
      lastSpokenTurn.set(thisNumber, turn);
    }

    lastSpokenTurn.set(thisNumber, turn);
    timesSpoken.set(
      thisNumber,
      timesSpoken.has(thisNumber) ? (timesSpoken.get(thisNumber) ?? 0) + 1 : 1
    );
    lastNumber = thisNumber;
    turn++;
  }

  return lastNumber;
};
