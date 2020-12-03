import { expenses, TARGET_VALUE } from './expenses';
import { puzzle1 } from './puzzle-1';

export const puzzle2 = () => {
  let product;
  for (const expense of expenses) {
    const complement = TARGET_VALUE - expense;
    const result = puzzle1(complement);
    if (result) {
      product = result * expense;
      break;
    }
  }
  return product;
};
