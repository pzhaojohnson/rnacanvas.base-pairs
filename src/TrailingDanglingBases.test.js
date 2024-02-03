import { TrailingDanglingBases } from './TrailingDanglingBases';

describe('TrailingDanglingBases class', () => {
  test('an empty structure', () => {
    let targetStructure = [
      [],
      [],
    ];

    let trailingDanglingBases = new TrailingDanglingBases(...targetStructure);

    expect(() => trailingDanglingBases.get()).toThrow();
  });

  test('a nonempty structure with no paired bases', () => {
    let targetStructure = [
      'agcutcgttugtuttacug'.split('').map(letter => ({ letter })),
      [],
    ];

    let trailingDanglingBases = new TrailingDanglingBases(...targetStructure);

    expect(() => trailingDanglingBases.get()).toThrow();
  });

  test('a structure with seven trailing dangling bases', () => {
    let seq = 'AGCTGTUGAUCTguaggucatcugcutcUGAUCTAUCGAUCTUACGUCAT'.split('').map(letter => ({ letter }));

    let targetStructure = [
      seq,
      [[seq[5], seq[0]], [seq[42], seq[20]], [seq[9], seq[25]], [seq[31], seq[38]]],
    ];

    let trailingDanglingBases = new TrailingDanglingBases(...targetStructure);

    expect(trailingDanglingBases.get().length).toBe(7);

    seq.slice(-7).forEach(b => {
      expect(trailingDanglingBases.get().includes(b)).toBeTruthy();
    });
  });

  test('a structure whose last base is paired', () => {
    let seq = 'ACGUTGTGUGUATCGAUTCUAGCUTAAA'.split('').map(letter => ({ letter }));

    let targetStructure = [
      seq,
      [[seq[5], seq[27]], [seq[9], seq[18]], [seq[12], seq[8]]],
    ];

    let trailingDanglingBases = new TrailingDanglingBases(...targetStructure);

    expect(trailingDanglingBases.get()).toStrictEqual([]);
  });

  test('when no paired bases are present in the sequence of the target structure', () => {
    let targetStructure = [
      'AGCUCTGACUTAUCGUCTC'.split('').map(letter => ({ letter })),
      [[{}, {}], [{}, {}], [{}, {}]],
    ];

    let trailingDanglingBases = new TrailingDanglingBases(...targetStructure);

    expect(() => trailingDanglingBases.get()).toThrow();
  });
});
