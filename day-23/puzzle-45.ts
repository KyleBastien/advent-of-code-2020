import { CircularNode } from './CircularNode';
import { gameInput } from './game-input';

export const puzzle45 = () => {
  let prev: CircularNode<number> | null = null;
  const cups = new Map<number, CircularNode<number>>();

  let curr = -1;
  const maxVal = 9;

  for (const c of gameInput) {
    const v = parseInt(c, 36);
    const n = new CircularNode<number>(v);
    if (prev === null) {
      curr = v;
    } else {
      prev.insertAfter(n);
    }
    prev = n;
    cups.set(v, n);
  }

  for (let i = 0; i < 100; i++) {
    const ccup = cups.get(curr);
    if (!ccup) {
      continue;
    }
    const a = ccup.next.remove();
    const b = ccup.next.remove();
    const c = ccup.next.remove();

    let dest = curr - 1;
    if (dest < 1) {
      dest = maxVal;
    }
    let dcup = cups.get(dest);
    while (dcup === a || dcup === b || dcup === c) {
      dest = dest - 1;
      if (dest < 1) {
        dest = maxVal;
      }
      dcup = cups.get(dest);
    }
    if (!dcup) {
      continue;
    }
    dcup.insertAfter(c);
    dcup.insertAfter(b);
    dcup.insertAfter(a);
    curr = ccup.next.value;
  }

  const cupAt1 = cups.get(1);
  if (!cupAt1) {
    return;
  }
  let o = cupAt1.next;
  let result = '';
  while (!(o.value === 1)) {
    result += o.value;
    o = o.next;
  }
  return result;
};
