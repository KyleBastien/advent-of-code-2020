import { memoryValues } from './memory-values';

export const puzzle27 = () => {
  const mem: { [key: number]: number } = {};
  let mask = '';

  for (const i of memoryValues) {
    let cmd: string | number = i.split(' = ')[0];
    let val: string | string[] | number = i.split(' = ')[1];

    if (cmd === 'mask') {
      mask = val;
      continue;
    }
    cmd = parseInt(cmd.substring(4));
    val = parseInt(val).toString(2).split('');
    while (val.length < 36) val.unshift('0');
    for (let j = 0; j < 36; j++) {
      if (mask[j] == 'X') {
        continue;
      }
      val[j] = mask[j];
    }
    val = parseInt(val.join().replace(/,/g, ''), 2);

    mem[cmd] = val;
  }

  let sum = 0;
  for (const i in mem) {
    sum += mem[i];
  }

  return sum;
};
