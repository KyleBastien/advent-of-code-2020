import { MY_BAG, parseBagRulesForCount } from './bag-rules';

export const puzzle14 = () => {
  const parsedBags = parseBagRulesForCount();
  return getNumberOfBagsForBag(MY_BAG, parsedBags);
};

export const getNumberOfBagsForBag = (
  bag: string,
  rules: { [key: string]: [string, number][] }
) => {
  let count = 0;
  if (rules[bag] && rules[bag].length > 0) {
    rules[bag].forEach(([innerBag, num]) => {
      count += num + getNumberOfBagsForBag(innerBag, rules) * num;
    });
  }
  return count;
};
