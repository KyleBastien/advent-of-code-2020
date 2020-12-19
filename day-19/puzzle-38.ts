import { parseRulesAndMessages } from './messages';

export const puzzle38 = () => {
  const { ruleBook, words } = parseRulesAndMessages();

  ruleBook.set(8, [[42], [42, 8]]);
  ruleBook.set(11, [
    [42, 31],
    [42, 11, 31],
  ]);

  return words.filter((word) => matchRule(word, ruleBook, 0)[0] === word.length)
    .length;
};

const matchRule = (
  line: string,
  rules: Map<number, number[][] | string>,
  ruleIndex = 0,
  wordIndex = 0
): number[] => {
  const rule = rules.get(ruleIndex);
  if (!rule) {
    return [];
  }
  if (typeof rule === 'string') {
    return line[wordIndex] === rule ? [wordIndex + 1] : [];
  } else {
    return rule.flatMap((r) =>
      r.reduce(
        (acc, n) => {
          return acc.flatMap((ir) => matchRule(line, rules, n, ir));
        },
        [wordIndex]
      )
    );
  }
};
