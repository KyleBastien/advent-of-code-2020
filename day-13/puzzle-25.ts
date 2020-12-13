import { processBusNotes } from './bus-notes';

export const puzzle25 = () => {
  const busNotes = processBusNotes();
  const departTime = busNotes.departTimeStamp;
  let smallestLeaveTime = Infinity;
  let foundBusId = 0;
  for (const leaveTime of busNotes.busLeaveTimes) {
    const multiplier = Math.ceil(departTime / leaveTime);
    const firstLeaveTimeForBus = multiplier * leaveTime;
    if (firstLeaveTimeForBus < smallestLeaveTime) {
      smallestLeaveTime = firstLeaveTimeForBus;
      foundBusId = leaveTime;
    }
  }
  return foundBusId * (smallestLeaveTime - departTime);
};
