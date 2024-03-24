import { parseDotBracket } from './parseDotBracket';

function createSequenceMock(sequenceString) {
  // make a unique object for each position in the sequence
  return [...sequenceString].map(character => ({ character }));
}

describe('parseDotBracket function', () => {
  test('empty sequence and empty dot-bracket notation', () => {
    let seq = [];
    let dotBracket = '';

    expect(parseDotBracket(seq, dotBracket)).toStrictEqual([]);
  });

  test('nonempty sequence and empty dot-bracket notation', () => {
    let seq = createSequenceMock('AUGC');
    let dotBracket = '';

    expect(parseDotBracket(seq, dotBracket)).toStrictEqual([]);
  });

  test('dot-bracket notation shorter than sequence', () => {
    let seq = createSequenceMock('AGCUAGGCGUCACUGAUCGUCGUGAC');
    let dotBracket = '..((..)).';
    expect(dotBracket.length).toBeLessThan(seq.length);

    expect([...parseDotBracket(seq, dotBracket)].map(bp => bp.map(b => seq.indexOf(b)))).toStrictEqual([
      [2, 7], [3, 6],
    ]);
  });

  test('sequence and dot-bracket notation of equal, nonzero length', () => {
    let seq = createSequenceMock('AGCUGACGUCGACA');
    let dotBracket = '..(((.....))).';
    expect(dotBracket.length).toBe(seq.length);

    expect([...parseDotBracket(seq, dotBracket)].map(bp => bp.map(b => seq.indexOf(b)))).toStrictEqual([
      [2, 12], [3, 11], [4, 10],
    ]);
  });

  test('dot-bracket notation longer than the sequence', () => {
    let seq = createSequenceMock('AGCUA');
    let dotBracket = '....................';
    expect(dotBracket.length).toBeGreaterThan(seq.length);

    expect(() => parseDotBracket(seq, dotBracket)).toThrow();
  });

  test('dot-bracket notation with no pairs', () => {
    let seq = createSequenceMock('ACGUAGCUUCGAUCGAUGC');
    let dotBracket = '........';

    expect([...parseDotBracket(seq, dotBracket)]).toStrictEqual([]);
  });

  test('dot-bracket notations with just a single pair', () => {
    let seq = createSequenceMock('AGCUAGCUGCUGUACGC');

    expect([...parseDotBracket(seq, '()')].map(bp => bp.map(b => seq.indexOf(b)))).toStrictEqual([
      [0, 1],
    ]);

    expect([...parseDotBracket(seq, '..(...)....')].map(bp => bp.map(b => seq.indexOf(b)))).toStrictEqual([
      [2, 6],
    ]);
  });

  test('a three base-pair hairpin', () => {
    let seq = createSequenceMock('GGGCGCAGCUGGACACGUACACGUCGAGCUAGCUGAUCUGAGCAUGCUGAC');
    let dotBracket = '(((.....)))';

    expect([...parseDotBracket(seq, dotBracket)].map(bp => bp.map(b => seq.indexOf(b)))).toStrictEqual([
      [0, 10], [1, 9], [2, 8],
    ]);
  });

  test('enclosed stems', () => {
    let seq = createSequenceMock('GGGCGCAGCUGGACACGUACACGUCGAGCUAGCUGAUCUGAGCAUGCUGAC');
    let dotBracket = '..(((((...(((.....))))))...)).....';

    expect([...parseDotBracket(seq, dotBracket)].map(bp => bp.map(b => seq.indexOf(b)))).toStrictEqual([
      [2, 28], [3, 27],
      [4, 23], [5, 22], [6, 21],
      [10, 20], [11, 19], [12, 18],
    ]);
  });

  test('sibling hairpins', () => {
    let seq = createSequenceMock('GGGCGCAGCUGGACACGUACACGUCGAGCUAGCUGAUCUGAGCAUGCUGAC');
    let dotBracket = '..((((....))))...((....))....';

    expect([...parseDotBracket(seq, dotBracket)].map(bp => bp.map(b => seq.indexOf(b)))).toStrictEqual([
      [2, 13], [3, 12], [4, 11], [5, 10],
      [17, 24], [18, 23],
    ]);
  });

  test('dot-bracket notations with unmatched upstream and/or downstream partner(s)', () => {
    let seq = createSequenceMock('UGCUAGCUGUGCUGCAGCUGAUGCUGAUCAGC');

    expect(() => parseDotBracket(seq, '(')).toThrow();
    expect(() => parseDotBracket(seq, ')')).toThrow();
    expect(() => parseDotBracket(seq, '..(...')).toThrow();
    expect(() => parseDotBracket(seq, '...)......')).toThrow();
    expect(() => parseDotBracket(seq, '(((....))')).toThrow();
    expect(() => parseDotBracket(seq, '((....)))')).toThrow();
  });

  test('dot-bracket notations with unrecognized characters', () => {
    let seq = createSequenceMock('GGCUAGCUGCUCGGAUCUACGCAUGCUGUCGAUCG');

    expect(() => parseDotBracket(seq, '1 ..((....))..')).toThrow();
    expect(() => parseDotBracket(seq, '..(((...))).._...')).toThrow();
    expect(() => parseDotBracket(seq, 'asdf')).toThrow();
  });
});
