import { missing } from './missing';

test('`function missing()`', () => {
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => new NucleobaseMock());

  var b1 = seq[0];
  var b2 = seq[1];
  var b3 = seq[2];
  var b4 = seq[3];
  var b5 = seq[4];
  var b6 = seq[5];
  var b7 = seq[6];
  var b8 = seq[7];
  var b9 = seq[8];
  var b10 = seq[9];

  expect(missing([], [])).toStrictEqual([]);

  // empty parent pairs
  var targetPairs = [[b1, b2], [b3, b4]];
  var parentPairs = [];
  expect(missing(targetPairs, parentPairs)).toStrictEqual([]);

  // empty target pairs
  var targetPairs = [];
  var parentPairs = [[b1, b2], [b3, b4]];
  expect(missing(targetPairs, parentPairs)).toStrictEqual([[b1, b2], [b3, b4]]);

  // parent pairs contain all target pairs and more
  var targetPairs = [[b2, b5], [b3, b8]];
  var parentPairs = [[b2, b5], [b9, b1], [b3, b8], [b7, b10]];
  expect(missing(targetPairs, parentPairs)).toStrictEqual([[b9, b1], [b7, b10]]);

  // target pairs contain some pairs not in parent pairs
  var targetPairs = [[b6, b2], [b1, b9], [b4, b8], [b10, b3]];
  var parentPairs = [[b10, b3], [b1, b9], [b2, b5]];
  expect(missing(targetPairs, parentPairs)).toStrictEqual([[b2, b5]]);

  // returns new base-pair tuples
  var targetPairs = [[b5, b6], [b7, b5]];
  var parentPairs = [[b3, b2], [b1, b10], [b6, b5], [b5, b7], [b4, b9]];
  expect(missing(targetPairs, parentPairs)).toStrictEqual([[b3, b2], [b1, b10], [b4, b9]]);
  missing(targetPairs, parentPairs).forEach(pair => expect(targetPairs.includes(pair)).toBeFalsy());
  missing(targetPairs, parentPairs).forEach(pair => expect(parentPairs.includes(pair)).toBeFalsy());
});

class NucleobaseMock {
  // make each base unique
  id = Math.random();
}
