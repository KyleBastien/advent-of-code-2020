import { MY_BAG, parseBagRules } from './bag-rules';

export const puzzle13 = () => {
  const parsedBags = parseBagRules();
  let lookup = [MY_BAG];
  const result = new Set();

  let lookupNext: string[] = [];
  do {
    lookupNext = [];
    for (const bag of lookup) {
      const bags = findAllBagsThatCanContainBag(bag, parsedBags);
      lookupNext.push(...bags);
      bags.forEach((bag) => {
        result.add(bag);
      });
    }
    lookup = lookupNext;
  } while (lookupNext.length > 0);

  return result.size;
};

export const findAllBagsThatCanContainBag = (
  bag: string,
  rules: { [key: string]: string[] }
) => {
  const bags = [];
  for (const rule of Object.keys(rules)) {
    if (rule !== bag && rules[rule].includes(bag)) {
      bags.push(rule);
    }
  }
  return bags;
};
