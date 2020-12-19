import { parseRulesAndMessages } from './messages';

export const puzzle37 = () => {
  const { ruleBook, words } = parseRulesAndMessages();
  return words.filter((word) => matchRule(word, ruleBook, 0) === word.length)
    .length;
};

const matchRule = (
  line: string,
  ruleBook: Map<number, number[][] | string>,
  ruleIndex = 0,
  wordIndex = 0
): number | undefined => {
  const currentRule = ruleBook.get(ruleIndex);
  if (!currentRule) {
    return undefined;
  }
  if (typeof currentRule === 'string') {
    return line[wordIndex] === currentRule ? wordIndex + 1 : undefined;
  } else {
    for (const rule of currentRule) {
      let i = wordIndex;
      let failed = false;
      for (const r of rule) {
        const nextIndex = matchRule(line, ruleBook, r, i);
        if (nextIndex === undefined) {
          failed = true;
          break;
        } else {
          i = nextIndex;
        }
      }
      if (!failed) {
        return i;
      }
    }
  }
  return undefined;
};
