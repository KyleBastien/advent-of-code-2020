import { ACC, Instruction, JMP, NOP, parseInstructions } from './instructions';

export const puzzle15 = () => {
  const parsedInstructions = parseInstructions();
  return getResultForInstructions(parsedInstructions).accValue;
};

export const getResultForInstructions = (instructions: Instruction[]) => {
  let currentIndex = 0;
  const visitedIndices = new Set<number>();
  let currentAccValue = 0;
  while (
    !visitedIndices.has(currentIndex) &&
    currentIndex < instructions.length
  ) {
    visitedIndices.add(currentIndex);
    const [justInstruction, value, isNegative] = instructions[currentIndex];
    if (justInstruction === NOP) {
      currentIndex++;
    } else if (justInstruction === JMP) {
      isNegative ? (currentIndex -= value) : (currentIndex += value);
    } else if (justInstruction === ACC) {
      isNegative ? (currentAccValue -= value) : (currentAccValue += value);
      currentIndex++;
    }
  }
  return {
    accValue: currentAccValue,
    currentIndex: currentIndex,
  };
};
