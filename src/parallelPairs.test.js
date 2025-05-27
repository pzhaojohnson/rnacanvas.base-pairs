import { parallelPairs } from './parallelPairs';

test('`function parallelPairs()`', () => {
  // an empty sequence
  expect(parallelPairs([])).toStrictEqual([]);

  // a sequence with an even number of bases
  var seq = [1, 2, 3, 4, 5, 6].map(() => new NucleobaseMock());
  expect(parallelPairs(seq)).toStrictEqual([[0, 3], [1, 4], [2, 5]].map(([i, j]) => [seq[i], seq[j]]));

  // a sequence with an odd number of bases
  var seq = [1, 2, 3, 4, 5, 6, 7].map(() => new NucleobaseMock());
  expect(parallelPairs(seq)).toStrictEqual([[0, 4], [1, 5], [2, 6]].map(([i, j]) => [seq[i], seq[j]]));

  // a sequence with one base
  var seq = [new NucleobaseMock()];
  expect(parallelPairs(seq)).toStrictEqual([]);
});

class NucleobaseMock {
  // make each base unique in some way
  id = Math.random();
}
