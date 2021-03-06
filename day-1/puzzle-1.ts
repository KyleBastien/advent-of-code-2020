import { expenses, TARGET_VALUE } from './expenses';

export const puzzle1 = (target = TARGET_VALUE) => {
  const workingSet = new Set();
  let product;
  for (const expense of expenses) {
    const complement = target - expense;
    if (workingSet.has(complement)) {
      product = expense * complement;
      break;
    }
    workingSet.add(expense);
  }
  return product;
};
