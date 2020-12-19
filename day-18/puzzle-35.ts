import { processMathHw } from './math-hw';

export const puzzle35 = () => {
  const mathHw = processMathHw();
  return mathHw.reduce((acc, ps) => {
    return acc + +simple(ps);
  }, 0);
};

const simple = (parts: string[]): string => {
  let ps: string[] = [];
  let result = '';
  while (parts.length > 0) {
    const part = parts.shift() as string;
    if (part === '(') {
      ps.push(simple(parts));
    } else if (part === ')') {
      return result;
    } else {
      ps.push(part);
    }
    if (ps.length === 3) {
      result = evalSimple(ps);
      ps = [result];
    }
  }
  return result;
};

const evalSimple = (ps: string[]) => eval(ps.join(' '));
