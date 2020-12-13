export const busNotes = [
  '1007153',
  '29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,433,x,x,x,x,x,x,x,x,x,x,x,x,13,17,x,x,x,x,19,x,x,x,23,x,x,x,x,x,x,x,977,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,41',
];

interface BusNotes {
  departTimeStamp: number;
  busLeaveTimes: number[];
}

export const processBusNotes = (): BusNotes => {
  const departTimeStamp = Number(busNotes[0]);
  const busLeaveTimesAsStrings = busNotes[1].split(',');
  const busLeaveTimes: number[] = [];
  for (const busLeaveTime of busLeaveTimesAsStrings) {
    if (!(busLeaveTime === 'x')) {
      busLeaveTimes.push(Number(busLeaveTime));
    }
  }
  return {
    departTimeStamp,
    busLeaveTimes,
  };
};

export const getBusTimes = (): string[] => {
  return busNotes[1].split(',');
};
