import { Grid } from './grid';
import { processSeats } from './seats';

export const puzzle21 = () => {
  const seats = new Grid(processSeats());
  return seats.run(1);
};
