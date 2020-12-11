import { Grid } from './grid';
import { processSeats } from './seats';

export const puzzle22 = () => {
  const seats = new Grid(processSeats());
  return seats.run(2);
};
