import { LeadingDanglingBases } from './LeadingDanglingBases';

describe('LeadingDanglingBases class', () => {
  describe('get method', () => {
    test('an empty structure', () => {
      let targetStructure = [
        [],
        [],
      ];

      let leadingDanglingBases = new LeadingDanglingBases(...targetStructure);

      expect(() => leadingDanglingBases.get()).toThrow();
    });

    test('a nonempty structure with no paired bases', () => {
      let targetStructure = [
        'AGCUTGCGCGAUTCAUGCUT'.split('').map(letter => ({ letter })),
        [],
      ];

      let leadingDanglingBases = new LeadingDanglingBases(...targetStructure);

      expect(() => leadingDanglingBases.get()).toThrow();
    });

    test('a structure with six leading dangling bases', () => {
      let seq = 'agcutacgtutgTAUGCUATCGTUTUGACTACGUCAT'.split('').map(letter => ({ letter }));

      let targetStructure = [
        seq,
        [[seq[20], seq[12]], [seq[15], seq[6]], [seq[9], seq[22]]],
      ];

      let leadingDanglingBases = new LeadingDanglingBases(...targetStructure);

      expect(leadingDanglingBases.get().length).toBe(6);

      seq.slice(0, 6).forEach(b => {
        expect(leadingDanglingBases.get().includes(b)).toBeTruthy();
      });
    });

    test('when the first base is paired', () => {
      let seq = 'AGCUTGTUTGUCTAGACUTCAUG'.split('').map(letter => ({ letter }));

      let targetStructure = [
        seq,
        [[seq[5], seq[0]], [seq[3], seq[8]]],
      ];

      let leadingDanglingBases = new LeadingDanglingBases(...targetStructure);

      expect(leadingDanglingBases.get()).toStrictEqual([]);
    });

    test('when no paired bases are present in the sequence of the target structure', () => {
      let targetStructure = [
        'AGCTTUTUTGUATCGUTACGUCGAUT'.split('').map(letter => ({ letter })),
        [[{}, {}], [{}, {}], [{}, {}]],
      ];

      let leadingDanglingBases = new LeadingDanglingBases(...targetStructure);

      expect(() => leadingDanglingBases.get()).toThrow();
    });
  });
});
