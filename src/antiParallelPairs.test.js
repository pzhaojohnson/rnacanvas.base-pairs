import { antiParallelPairs } from './antiParallelPairs';

test('`function antiParallelPairs()`', () => {
  // an empty sequence
  expect(antiParallelPairs([])).toStrictEqual([]);

  // a sequence with an even number of bases
  var seq = [1, 2, 3, 4, 5, 6].map(() => new NucleobaseMock());
  expect(antiParallelPairs(seq)).toStrictEqual([[0, 5], [1, 4], [2, 3]].map(([i, j]) => [seq[i], seq[j]]));

  // a sequence with an odd number of bases
  var seq = [1, 2, 3, 4, 5, 6, 7].map(() => new NucleobaseMock());
  expect(antiParallelPairs(seq)).toStrictEqual([[0, 6], [1, 5], [2, 4]].map(([i, j]) => [seq[i], seq[j]]));

  // a sequence with one base
  var seq = [new NucleobaseMock()];
  expect(antiParallelPairs(seq)).toStrictEqual([]);
});

class NucleobaseMock {
  // make each base unique
  id = Math.random();
}
