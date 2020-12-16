import { parseTicketInfo } from './ticket-info';

export const puzzle31 = () => {
  const parsedTicketInfo = parseTicketInfo();
  const tickets = parsedTicketInfo.tickets;
  const rulesAll = parsedTicketInfo.rulesAll;
  let sum = 0;
  for (let i = 1; i < tickets.length; i++) {
    const values = tickets[i].split(',').map(Number);
    values.forEach((value) => {
      if (
        !rulesAll.some((ranges) =>
          ranges.some(([low, high]) => value >= low && value <= high)
        )
      ) {
        sum += value;
      }
    });
  }

  return sum;
};
