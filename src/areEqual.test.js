import { areEqual } from './areEqual';

test('`function areEqual()`', () => {
  var seq = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => new NucleobaseMock());

  var b1 = seq[0];
  var b2 = seq[1];
  var b3 = seq[2];
  var b4 = seq[3];

  expect(areEqual([b1, b2], [b1, b2])).toBe(true);
  expect(areEqual([b1, b2], [b2, b1])).toBe(true);
  expect(areEqual([b2, b1], [b1, b2])).toBe(true);
  expect(areEqual([b2, b1], [b2, b1])).toBe(true);

  expect(areEqual([b1, b2], [b1, b3])).toBe(false);
  expect(areEqual([b1, b2], [b3, b2])).toBe(false);
  expect(areEqual([b1, b3], [b1, b2])).toBe(false);
  expect(areEqual([b3, b2], [b1, b2])).toBe(false);

  expect(areEqual([b1, b2], [b3, b4])).toBe(false);

  // a base paired with itself
  expect(areEqual([b1, b1], [b1, b1])).toBe(true);
  expect(areEqual([b1, b1], [b1, b2])).toBe(false);
});

class NucleobaseMock {
  // make each base unique
  id = Math.random();
}
