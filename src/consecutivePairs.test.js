import { consecutivePairs } from './consecutivePairs';

class NucleobaseMock {
  constructor() {
    // make unique
    this.id = Math.random();
  }
}

describe('consecutivePairs function', () => {
  test('an empty sequence', () => {
    let seq = [];

    expect(consecutivePairs(seq)).toStrictEqual([]);
  });

  test('a sequence of length one', () => {
    let seq = [new NucleobaseMock()];

    expect(consecutivePairs(seq)).toStrictEqual([]);
  });

  test('a sequence of length two', () => {
    let seq = [new NucleobaseMock(), new NucleobaseMock()];

    expect(consecutivePairs(seq)).toStrictEqual([
      [seq[0], seq[1]],
    ]);
  });

  test('a sequence of length three', () => {
    let seq = [new NucleobaseMock(), new NucleobaseMock(), new NucleobaseMock()];

    expect(consecutivePairs(seq)).toStrictEqual([
      [seq[0], seq[1]],
      [seq[1], seq[2]],
    ]);
  });

  test('a sequence of length nine', () => {
    let seq = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => new NucleobaseMock());
    expect(seq.length).toBe(9);

    expect(consecutivePairs(seq)).toStrictEqual(
      [0, 1, 2, 3, 4, 5, 6, 7].map(i => [seq[i], seq[i + 1]])
    );
  });
});
