import { customsAnswers } from './customs-answers';

export const puzzle11 = () => {
  let uniqueAnswers = new Set<string>();
  let result = 0;
  for (const answer of customsAnswers) {
    if (answer === '') {
      result += uniqueAnswers.size;
      uniqueAnswers = new Set();
    } else {
      for (const letter of answer) {
        uniqueAnswers.add(letter);
      }
    }
  }
  result += uniqueAnswers.size;
  return result;
};
