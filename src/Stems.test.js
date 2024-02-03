import { Stems } from './Stems';

describe('Stems class', () => {
  test('an empty structure', () => {
    let targetStructure = [
      [],
      [],
    ];

    let stems = new Stems(...targetStructure);

    expect(stems.get()).toStrictEqual([]);
  });

  test('a nonempty structure with no stems', () => {
    let targetStructure = [
      'AGCGTUAGUGTUAGUTG'.split('').map(letter => ({ letter })),
      [],
    ];

    let stems = new Stems(...targetStructure);

    expect(stems.get()).toStrictEqual([]);
  });

  test('a structure with three unknotted stems', () => {
    let seq = 'ACGUTGUACGagcuaggtugutguAGCUGTUAGTUGAUGgauguctaucgauctaucgtg'.split('').map(letter => ({ letter }));

    let targetStructure = [
      seq,
      [
        [seq[3], seq[30]], [seq[4], seq[29]], [seq[5], seq[28]],
        [seq[8], seq[22]], [seq[9], seq[21]], [seq[10], seq[20]], [seq[11], seq[19]],
        [seq[39], seq[49]], [seq[40], seq[48]], [seq[41], seq[47]],
      ],
    ];

    let stems = new Stems(...targetStructure);

    expect(stems.get()).toStrictEqual([
      [[seq[3], seq[30]], [seq[4], seq[29]], [seq[5], seq[28]]],
      [[seq[8], seq[22]], [seq[9], seq[21]], [seq[10], seq[20]], [seq[11], seq[19]]],
      [[seq[39], seq[49]], [seq[40], seq[48]], [seq[41], seq[47]]],
    ]);
  });

  test('a structure with two pseudoknotted stems', () => {
    let seq = 'acutgaugtuctagcUGAUGCUTGUAGUGTUGUAGCUGTGugaucguagc'.split('').map(letter => ({ letter }));

    let targetStructure = [
      seq,
      [
        [seq[5], seq[25]], [seq[6], seq[24]], [seq[7], seq[23]],
        [seq[16], seq[36]], [seq[17], seq[35]], [seq[18], seq[34]],
      ],
    ];

    let stems = new Stems(...targetStructure);

    expect(stems.get()).toStrictEqual([
      [[seq[5], seq[25]], [seq[6], seq[24]], [seq[7], seq[23]]],
      [[seq[16], seq[36]], [seq[17], seq[35]], [seq[18], seq[34]]],
    ]);
  });
});
