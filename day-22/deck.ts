export const decks = `Player 1:
25
37
35
16
9
26
17
5
47
32
11
43
40
15
7
19
36
20
50
3
21
34
44
18
22

Player 2:
12
1
27
41
4
39
13
29
38
2
33
28
10
6
24
31
42
8
23
45
46
48
49
30
14`;

export const sampleDecks = `Player 1:
9
2
6
3
1

Player 2:
5
8
4
7
10`;

export type Deck = number[];

export const parseDeck = (deck: string): Deck => {
  return deck
    .split(':\n')[1]
    .split('\n')
    .map((n) => +n);
};

export const parseDecks = () => {
  return decks.split('\n\n').map(parseDeck) as [Deck, Deck];
};
