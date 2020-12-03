import { parsePassword, passwords } from './passwords';

export const puzzle3 = () => {
  let validPasswords = 0;
  for (const password of passwords) {
    const parsedPassword = parsePassword(password);
    const countOfLetterInPassword = countNumberOfLettersInPassword(
      parsedPassword.password,
      parsedPassword.letterToFind
    );

    if (
      countOfLetterInPassword >= parsedPassword.minimumNumberOfLetters &&
      countOfLetterInPassword <= parsedPassword.maximumNumberOfLetters
    ) {
      validPasswords++;
    }
  }
  return validPasswords;
};

export const countNumberOfLettersInPassword = (
  password: string,
  letterToFind: string
) => {
  let count = 0;
  for (const letter of password) {
    if (letter === letterToFind) {
      count++;
    }
  }
  return count;
};
