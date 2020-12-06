import { customsAnswers } from './customs-answers';

export const puzzle12 = () => {
  let answerCountByLetter = new Map<string, number>();
  let countOfPeople = 0;
  let result = 0;
  for (const answer of customsAnswers) {
    if (answer === '') {
      result += getNumbersOfAnswers(answerCountByLetter, countOfPeople);
      answerCountByLetter = new Map<string, number>();
      countOfPeople = 0;
    } else {
      countOfPeople++;
      for (const letter of answer) {
        const currentValue = answerCountByLetter.get(letter) ?? 0;
        answerCountByLetter.set(letter, currentValue + 1);
      }
    }
  }
  result += getNumbersOfAnswers(answerCountByLetter, countOfPeople);
  return result;
};

export const getNumbersOfAnswers = (
  answerCountByLetter: Map<string, number>,
  countOfPeople: number
) => {
  let result = 0;
  for (const letter of answerCountByLetter.keys()) {
    const numberOfAnswers = answerCountByLetter.get(letter);
    if (numberOfAnswers === countOfPeople) {
      result++;
    }
  }
  return result;
};
