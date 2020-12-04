import {
  parsePassports,
  PassportFieldNames,
  passports,
  validPassportFields,
} from './passports';

const byrValueRegex = /(byr:)(19[2-9][0-9]|200[0-2])/;
const iyrValueRegex = /(iyr:)(201[0-9]|2020)/;
const eyrValueRegex = /(eyr:)(202[0-9]|2030)/;
const hgtValueRegex = /(hgt:)(1[5-8]\dcm|19[0-3]cm|59in|6[0-9]in|7[0-6]in)/;
const hclValueRegex = /(hcl:)#([a-f0-9]{6})/;
const eclValueRegex = /(ecl:)(amb|blu|brn|gry|grn|hzl|oth)/;
const pidValueRegex = /(pid:)([0-9]{9})\s/;

const regexs = {
  [PassportFieldNames.byr]: byrValueRegex,
  [PassportFieldNames.iyr]: iyrValueRegex,
  [PassportFieldNames.eyr]: eyrValueRegex,
  [PassportFieldNames.hgt]: hgtValueRegex,
  [PassportFieldNames.hcl]: hclValueRegex,
  [PassportFieldNames.ecl]: eclValueRegex,
  [PassportFieldNames.pid]: pidValueRegex,
};

export const puzzle8 = () => {
  const parsedPassports = parsePassports(passports);

  let validPassports = 0;
  for (const passport of parsedPassports) {
    let validPassport = true;
    if (passport.passportBrokenUpByField.length < validPassportFields.length) {
      // Defiently not a valid passport because it's missing less than the required fields
      continue;
    } else {
      const fullPassportString = passport.fullPassportString;
      for (const validPassportField of validPassportFields) {
        if (fullPassportString.indexOf(validPassportField) < 0) {
          // Passport field is missing
          validPassport = false;
          break;
        } else {
          const valueRegex = regexs[validPassportField];
          const value =
            valueRegex
              .exec(passport.fullPassportString)?.[0]
              ?.split(':')?.[1] ?? '';
          if (!value) {
            validPassport = false;
            break;
          }
        }
      }
    }
    if (validPassport) {
      validPassports++;
    }
  }

  return validPassports;
};
