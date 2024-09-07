import { knotless } from './knotless';

import { PositionPairs } from './PositionPairs';

import { sorted } from '@rnacanvas/position-pairs';

class NucleobaseMock {
  // make each instance unique in some way
  id = Math.random();
}

describe('`knotless()` function', () => {
  test('an empty structure', () => {
    let structure = [[], []];

    expect(knotless(...structure)).toStrictEqual([[], []]);
  });

  test('a structure with no pseudoknots', () => {
    let seq = [...'1234567789012345678901234567890123456'].map(() => new NucleobaseMock());

    let basePairs = [
      [2, 19], [3, 18], [4, 17],
      [6, 14], [7, 13],
      [22, 35], [23, 34], [24, 33], [25, 32],
    ].map(pp => pp.map(p => seq[p - 1]));

    let [_, bps] = knotless(seq, basePairs);

    let pps = (new PositionPairs(seq, bps)).get();

    expect(sorted(pps)).toStrictEqual([
      [2, 19], [3, 18], [4, 17],
      [6, 14], [7, 13],
      [22, 35], [23, 34], [24, 33], [25, 32],
    ]);
  });

  test('a structure with some pseudoknots', () => {
    let seq = [...'1234567789012345678901234567890123456'].map(() => new NucleobaseMock());

    // an H-type pseudoknot
    let basePairs = [
      [2, 19], [3, 18], [4, 17],
      [8, 20], [9, 19], [10, 18],
      [22, 35], [23, 34], [24, 33], [25, 32],
    ].map(pp => pp.map(p => seq[p - 1]));

    let [_, bps] = knotless(seq, basePairs);

    let pps = (new PositionPairs(seq, bps)).get();

    expect(sorted(pps)).toStrictEqual([
      [8, 20], [9, 19], [10, 18],
      [22, 35], [23, 34], [24, 33], [25, 32],
    ]);
  });

  it('returns an equivalent sequence array', () => {
    let seq = [...'1234567789012345678901234567890123456'].map(() => new NucleobaseMock());
    expect(seq.length).toBe(37);

    let baseIDs = seq.map(b => b.id);
    seq.forEach(b => expect(b.id).toBeTruthy());

    // an H-type pseudoknot
    let basePairs = [
      [2, 19], [3, 18], [4, 17],
      [8, 20], [9, 19], [10, 18],
      [22, 35], [23, 34], [24, 33], [25, 32],
    ].map(pp => pp.map(p => seq[p - 1]));

    expect(knotless(seq, basePairs)[0].map(b => b.id)).toStrictEqual(baseIDs);
  });

  it('returns a new structure', () => {
    let seq = [...'1234567789012345678901234567890123456'].map(() => new NucleobaseMock());

    // no pseudoknots
    let basePairs = [
      [2, 19], [3, 18], [4, 17],
      [6, 14], [7, 13],
      [22, 35], [23, 34], [24, 33], [25, 32],
    ].map(pp => pp.map(p => seq[p - 1]));

    expect(knotless(seq, basePairs)[0]).not.toBe(seq);

    expect(knotless(seq, basePairs)[1]).not.toBe(basePairs);

    knotless(seq, basePairs)[1].forEach(bp => {
      expect(basePairs.includes(bp)).toBeFalsy();
    });
  });

  it('does not modify the input structure', () => {
    let seq = [...'1234567789012345678901234567890123456'].map(() => new NucleobaseMock());
    expect(seq.length).toBe(37);

    let baseIDs = seq.map(b => b.id);
    seq.forEach(b => expect(b.id).toBeTruthy());

    // an H-type pseudoknot
    let basePairs = [
      [2, 19], [3, 18], [4, 17],
      [8, 20], [9, 19], [10, 18],
      [22, 35], [23, 34], [24, 33], [25, 32],
    ].map(pp => pp.map(p => seq[p - 1]));

    knotless(seq, basePairs);

    expect(seq.map(b => b.id)).toStrictEqual(baseIDs);

    let pps = (new PositionPairs(seq, basePairs)).get();

    expect(sorted(pps)).toStrictEqual([
      [2, 19], [3, 18], [4, 17],
      [8, 20], [9, 19], [10, 18],
      [22, 35], [23, 34], [24, 33], [25, 32],
    ]);
  });
});
