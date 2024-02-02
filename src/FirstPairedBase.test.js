import { FirstPairedBase } from './FirstPairedBase';

describe('FirstPairedBase class', () => {
  describe('get method', () => {
    test('an empty structure', () => {
      let targetStructure = [
        [],
        [],
      ];

      let firstPairedBase = new FirstPairedBase(...targetStructure);

      expect(() => firstPairedBase.get()).toThrow();
    });

    test('a structure with no paired bases', () => {
      let targetStructure = [
        'AGCTAUGCCUGCAUCGUAGCTCGAUCGUTG'.split('').map(letter => ({ letter })),
        [],
      ];

      let firstPairedBase = new FirstPairedBase(...targetStructure);

      expect(() => firstPairedBase.get()).toThrow();
    });

    test('a structure with six paired bases', () => {
      let seq = 'agctgauctcguctaucgauctaugcuactuagcuatcuagcutac'.split('').map(letter => ({ letter }));

      let targetStructure = [
        seq,
        [[seq[10], seq[20]], [seq[15], seq[7]], [seq[12], seq[25]]],
      ];

      let firstPairedBase = new FirstPairedBase(...targetStructure);

      expect(firstPairedBase.get()).toBe(seq[7]);

      expect(seq[7]).toBeTruthy();
    });

    test('when no paired bases are present in the sequence of the target structure', () => {
      let targetStructure = [
        'AGCUATCGUATCAUGCTGCUATCU'.split('').map(letter => ({ letter })),
        [[{}, {}], [{}, {}], [{}, {}], [{}, {}]],
      ];

      let firstPairedBase = new FirstPairedBase(...targetStructure);

      expect(() => firstPairedBase.get()).toThrow();
    });
  });
});
