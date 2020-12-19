import { processMathHw } from './math-hw';

export const puzzle36 = () => {
  const mathHw = processMathHw();
  return mathHw.reduce((acc, ps) => {
    return acc + +advanced(ps);
  }, 0);
};

const advanced = (parts: string[]): string => {
  let e = '';
  while (parts.length > 0) {
    const p = parts.shift() as string;
    if (p === '(') {
      e = e + advanced(parts);
    } else if (p === ')') {
      return evalAdvanced(e);
    } else {
      e = e + p;
    }
  }
  return evalAdvanced(e);
};

const plusSign = /\+/g;
const sumEquation = /\d+\+\d+/g;
const sumIt = (e: string) => eval(e);
const evalAdvanced = (e: string) => {
  while (e.match(plusSign)) {
    e = e.replace(sumEquation, sumIt);
  }
  return eval(e);
};
