import { PositionPairs } from './PositionPairs';

describe('PositionPairs class', () => {
  describe('get method', () => {
    test('an empty structure', () => {
      let targetStructure = [
        [],
        [],
      ];

      let positionPairs = new PositionPairs(...targetStructure);

      expect(positionPairs.get()).toStrictEqual([]);
    });

    test('a structure with no base-pairs', () => {
      let targetStructure = [
        'AGCUGCGATCGUAC'.split('').map(letter => ({ letter })),
        [],
      ];

      let positionPairs = new PositionPairs(...targetStructure);

      expect(positionPairs.get()).toStrictEqual([]);
    });

    test('a structure with five base-pairs', () => {
      let seq = 'agcutacgtcuguactguactcagcut'.split('').map(letter => ({ letter }));

      let targetStructure = [
        seq,
        [[seq[0], seq[10]], [seq[1], seq[9]], [seq[3], seq[19]], [seq[4], seq[18]], [seq[5], seq[17]]],
      ];

      let positionPairs = new PositionPairs(...targetStructure);

      expect(positionPairs.get()).toStrictEqual([
        [1, 11], [2, 10], [4, 20], [5, 19], [6, 18],
      ]);
    });

    test('when paired bases are not present in the sequence of the target structure', () => {
      let seq = 'AGCUATCGTGCUGACUTCGA'.split('').map(letter => ({ letter }));

      let targetStructure = [
        seq,
        [[seq[5], {}], [{}, seq[6]], [{}, {}], [seq[2], seq[10]]],
      ];

      let positionPairs = new PositionPairs(...targetStructure);

      expect(positionPairs.get()).toStrictEqual([
        [6, 0], [0, 7], [0, 0], [3, 11]
      ]);
    });
  });
});
