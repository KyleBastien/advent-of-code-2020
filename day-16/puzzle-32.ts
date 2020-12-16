import { parseTicketInfo } from './ticket-info';

export const puzzle32 = () => {
  const parsedTicketInfo = parseTicketInfo();
  const groups = parsedTicketInfo.groups;
  const tickets = parsedTicketInfo.filteredTickets;
  const rules = parsedTicketInfo.rules;

  const mine = groups[1].split(/\n/)[1].split(',').map(Number);
  tickets.unshift(mine);

  const allFieldNames = Object.keys(rules);
  let candidates = Array.from({ length: tickets[0]?.length ?? 0 }, () => [
    ...allFieldNames,
  ]);

  tickets.forEach((values) =>
    values?.forEach((v, ind) => {
      candidates[ind] = candidates[ind].filter((name) =>
        rules[name].some(([low, high]) => v >= low && v <= high)
      );
    })
  );

  do {
    const found = candidates
      .filter((options) => options.length === 1)
      .map((options) => options[0]);
    candidates = candidates.map((options) =>
      options.length === 1
        ? options
        : options.filter((name) => !found.includes(name))
    );
    if (found.length === allFieldNames.length) break;
  } while (true);

  const result = candidates.reduce(
    (acc, [name], ind) =>
      name.startsWith('departure') ? acc * mine[ind] : acc,
    1
  );

  return result;
};
