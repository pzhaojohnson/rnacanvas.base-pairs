import { radializable } from './radializable';

test('`function radializable()`', () => {
  // an empty structure
  var seq = [];
  var basePairs = [];
  expect(radializable(seq, basePairs)).toStrictEqual([[], []]);

  // does not modify the input structure
  var seq = [{ id: 94 }, { id: 21 }, { id: 35 }, { id: 26 }, { id: 107 }, { id: 87 }, { id: 110 }];
  // contain a pseudoknot and conflicting pairs
  var basePairs = [[1, 4], [2, 5], [2, 7]].map(([p, q]) => [seq[p - 1], seq[q - 1]]);
  radializable(seq, basePairs);
  expect(seq).toStrictEqual([{ id: 94 }, { id: 21 }, { id: 35 }, { id: 26 }, { id: 107 }, { id: 87 }, { id: 110 }]);
  expect(basePairs).toStrictEqual([[1, 4], [2, 5], [2, 7]].map(([p, q]) => [seq[p - 1], seq[q - 1]]));

  // returns a deep copy of the structure
  var seq = [1, 2, 3, 4, 5].map(() => new NucleobaseMock());
  var basePairs = [[1, 5], [2, 4]].map(([p, q]) => [seq[p - 1], seq[q - 1]]);
  expect(radializable(seq, basePairs)).toStrictEqual([seq, basePairs.reverse()]);
  expect(radializable(seq, basePairs)[0]).not.toBe(seq);
  expect(radializable(seq, basePairs)[1]).not.toBe(basePairs);
  basePairs.forEach(bp => expect(radializable(seq, basePairs)[1].includes(bp)).toBeFalsy());

  // an already radializable structure
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => new NucleobaseMock());
  var basePairs = [[2, 9], [3, 8], [4, 7]].map(([p, q]) => [seq[p - 1], seq[q - 1]]);
  expect(radializable(seq, basePairs)[0]).toStrictEqual(seq);
  expect(radializable(seq, basePairs)[1]).toStrictEqual([[2, 9], [3, 8], [4, 7]].map(([p, q]) => [seq[p - 1], seq[q - 1]]).reverse());

  // omits conflicting pairs
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => new NucleobaseMock());
  var basePairs = [[3, 6], [9, 3]].map(([p, q]) => [seq[p - 1], seq[q - 1]]);
  expect(radializable(seq, basePairs)[0]).toStrictEqual(seq);
  expect(radializable(seq, basePairs)[1]).toStrictEqual([[3, 6]].map(([p, q]) => [seq[p - 1], seq[q - 1]]));

  // omits repeat pairs
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => new NucleobaseMock());
  var basePairs = [[2, 7], [7, 2]].map(([p, q]) => [seq[p - 1], seq[q - 1]]);
  expect(radializable(seq, basePairs)[0]).toStrictEqual(seq);
  expect(radializable(seq, basePairs)[1]).toStrictEqual([[2, 7]].map(([p, q]) => [seq[p - 1], seq[q - 1]]));

  // omits self-pairs
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => new NucleobaseMock());
  var basePairs = [[3, 3]].map(([p, q]) => [seq[p - 1], seq[q - 1]]);
  expect(radializable(seq, basePairs)[0]).toStrictEqual(seq);
  expect(radializable(seq, basePairs)[1]).toStrictEqual([]);

  // omits pseudoknots
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => new NucleobaseMock());
  var basePairs = [[1, 6], [5, 2], [4, 9], [3, 10]].map(([p, q]) => [seq[p - 1], seq[q - 1]]);
  expect(radializable(seq, basePairs)[0]).toStrictEqual(seq);
  expect(radializable(seq, basePairs)[1]).toStrictEqual([[1, 6], [5, 2]].map(([p, q]) => [seq[p - 1], seq[q - 1]]).reverse());
});

class NucleobaseMock {
  // make each instance unique in some way
  id = Math.random();
}
