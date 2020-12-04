import { parsePassports, passports, validPassportFields } from './passports';

export const puzzle7 = () => {
  const parsedPassports = parsePassports(passports);

  let validPassports = 0;
  for (const parsedPassport of parsedPassports) {
    if (
      parsedPassport.passportBrokenUpByField.length < validPassportFields.length
    ) {
      // Defiently not a valid passport because it's missing less than the required fields
      continue;
    } else {
      const fullPassportString = parsedPassport.fullPassportString;
      let validPassport = true;
      for (const passportField of validPassportFields) {
        if (fullPassportString.indexOf(passportField) < 0) {
          // Field is missing in passport
          validPassport = false;
          break;
        }
      }
      if (validPassport) {
        validPassports++;
      }
    }
  }

  return validPassports;
};
