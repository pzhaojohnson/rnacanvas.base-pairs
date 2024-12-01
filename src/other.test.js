import { other } from './other';

test('`function other()`', () => {
  let bs = [1, 2, 3, 4, 5].map(() => new NucleobaseMock());

  // the base is the first base in the base-pair
  expect(other(bs[2], [bs[2], bs[4]])).toBe(bs[4]);

  // the base is the second base in the base-pair
  expect(other(bs[3], [bs[2], bs[3]])).toBe(bs[2]);

  // the base is not present in the base-pair
  expect(() => other(bs[2], [bs[1], bs[4]])).toThrow();
});

class NucleobaseMock {
  id = Math.random();
}
