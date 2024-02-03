import { Linkers } from './Linkers';

describe('Linkers class', () => {
  describe('get method', () => {
    test('an empty structure', () => {
      let targetStructure = [
        [],
        [],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([]);
    });

    test('a nonempty structure with no linkers', () => {
      let targetStructure = [
        'AGCUTGUAGCUGGTUGUGTUAGC'.split('').map(letter => ({ letter })),
        [],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([]);
    });

    test('an unknotted structure with five linkers', () => {
      let seq = 'CGTAUCGTGTUGACTCUTUGTUATUAGCacgacuttgugauctacgutagcutgccUA'.split('').map(letter => ({ letter }));

      let targetStructure = [
        seq,
        [
          [seq[3], seq[12]], [seq[4], seq[11]], [seq[5], seq[10]], [seq[6], seq[9]],
          [seq[16], seq[45]], [seq[17], seq[44]],
          [seq[23], seq[36]], [seq[24], seq[35]], [seq[25], seq[34]],
        ],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        seq.slice(6, 10),
        seq.slice(12, 17),
        seq.slice(17, 24),
        seq.slice(25, 35),
        seq.slice(36, 45),
      ]);
    });

    test('a structure with a pseudoknot', () => {
      let seq = 'aguctcgautcgutugatUAGCUTCTAGCGAACACAGCTAGCTRUGAUTCU'.split('').map(letter => ({ letter }));

      let targetStructure = [
        seq,
        [
          [seq[12], seq[25]], [seq[13], seq[24]], [seq[14], seq[23]],
          [seq[18], seq[29]], [seq[19], seq[28]],
        ],
      ];

      let linkers = new Linkers(...targetStructure);

      expect(linkers.get()).toStrictEqual([
        seq.slice(14, 19),
        seq.slice(19, 24),
        seq.slice(25, 29),
      ]);
    });
  });
});
