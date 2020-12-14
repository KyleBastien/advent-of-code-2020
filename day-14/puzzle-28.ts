import { memoryValues } from './memory-values';

export const puzzle28 = () => {
  const mem: { [key: number]: number } = {};
  let mask = '';
  let alts: number[] = [];
  for (const i of memoryValues) {
    let cmd: string | (string | number)[] | number = i.split(' = ')[0];
    let val: string | number = i.split(' = ')[1];

    if (cmd == 'mask') {
      mask = val;
      alts = [0];
      for (let j = 0; j < 36; j++) {
        if (mask[j] == 'X') {
          const altsb = [];
          for (const k of alts) {
            altsb.push(2 ** (35 - j) + k);
          }
          alts = alts.concat(altsb);
        }
      }
      continue;
    }
    cmd = parseInt(cmd.substr(4)).toString(2).split('');
    val = parseInt(val);
    while (cmd.length < 36) {
      cmd.unshift(0);
    }

    for (let j = 0; j < 36; j++) {
      if (mask[j] == '0') {
        continue;
      }
      if (mask[j] == '1') {
        cmd[j] = 1;
      }
      if (mask[j] == 'X') {
        cmd[j] = 0;
      }
    }
    cmd = parseInt(cmd.join().replace(/,/g, ''), 2);

    for (const k of alts) {
      mem[cmd + k] = val;
    }
  }

  let sum = 0;
  for (const i in mem) {
    sum += mem[i];
  }
  return sum;
};
