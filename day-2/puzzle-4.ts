import { ParsedPassword, parsePassword, passwords } from './passwords';

export const puzzle4 = () => {
  let validPasswords = 0;
  for (const password of passwords) {
    const parsedPassword = parsePassword(password);
    if (doesPasswordHaveCharacterInPositions(parsedPassword)) {
      validPasswords++;
    }
  }
  return validPasswords;
};

export const doesPasswordHaveCharacterInPositions = (
  password: ParsedPassword
) => {
  const firstPosition = password.minimumNumberOfLetters - 1;
  const secondPosition = password.maximumNumberOfLetters - 1;
  const letterAtFirstPosition = password.password[firstPosition];
  const letterAtSecondPosition = password.password[secondPosition];
  let countOfLetters = 0;
  if (letterAtFirstPosition === password.letterToFind) {
    countOfLetters++;
  }
  if (letterAtSecondPosition === password.letterToFind) {
    countOfLetters++;
  }
  if (countOfLetters === 1) {
    return true;
  }
  return false;
};

if (process.argv[1].indexOf('puzzle-4') > -1) {
  console.log(puzzle4());
}
