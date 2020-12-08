import { Instruction, JMP, NOP, parseInstructions } from './instructions';
import { getResultForInstructions } from './puzzle-15';

export const puzzle16 = () => {
  const parsedInstructions = parseInstructions();
  for (let i = 0; i < parsedInstructions.length; i++) {
    const patched: Instruction[] = parsedInstructions.map(
      ([justInstruction, value, isNegative]) => [
        justInstruction,
        value,
        isNegative,
      ]
    );

    if (parsedInstructions[i][0] === JMP) {
      patched[i][0] = NOP;
    } else if (parsedInstructions[i][0] === NOP) {
      patched[i][0] = JMP;
    } else {
      continue;
    }

    const accForPatchedInstructions = getResultForInstructions(patched);
    if (accForPatchedInstructions.currentIndex >= patched.length) {
      return accForPatchedInstructions.accValue;
    }
  }
};
