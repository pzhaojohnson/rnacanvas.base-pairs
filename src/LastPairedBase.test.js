import { LastPairedBase } from './LastPairedBase';

describe('LastPairedBase class', () => {
  describe('get method', () => {
    test('an empty structure', () => {
      let targetStructure = [
        [],
        [],
      ];

      let lastPairedBase = new LastPairedBase(...targetStructure);

      expect(() => lastPairedBase.get()).toThrow();
    });

    test('a nonempty structure with no paired bases', () => {
      let targetStructure = [
        'ACUGTUGAUCGGAUCGCUAGC'.split('').map(letter => ({ letter })),
        [],
      ];

      let lastPairedBase = new LastPairedBase(...targetStructure);

      expect(() => lastPairedBase.get()).toThrow();
    });

    test('a structure with eight paired bases', () => {
      let seq = 'agcuatcgututututugactaguatugaGAUCTAUCGAUCT'.split('').map(letter => ({ letter }));

      let targetStructure = [
        seq,
        [[seq[12], seq[8]], [seq[24], seq[10]], [seq[3], seq[18]], [seq[4], seq[22]]],
      ];

      let lastPairedBase = new LastPairedBase(...targetStructure);

      expect(lastPairedBase.get()).toBe(seq[24]);

      expect(seq[24]).toBeTruthy();
    });

    test('when no paired bases are present in the sequence of the target structure', () => {
      let targetStructure = [
        'agcuagcutgtutgutgauctaucg'.split('').map(letter => ({ letter })),
        [[{}, {}], [{}, {}], [{}, {}]],
      ];

      let lastPairedBase = new LastPairedBase(...targetStructure);

      expect(() => lastPairedBase.get()).toThrow();
    });
  });
});
