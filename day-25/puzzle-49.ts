import { handshakeValues } from './handshake-values';

export const puzzle49 = () => {
  const cardPub = parseInt(handshakeValues[0], 10);
  const doorPub = parseInt(handshakeValues[1], 10);

  let v = 1;
  let i = 0;
  while (v !== cardPub) {
    v = (7 * v) % 20201227;
    i++;
  }

  v = 1;
  for (let j = 0; j < i; j++) {
    v = (doorPub * v) % 20201227;
  }

  return v;
};
