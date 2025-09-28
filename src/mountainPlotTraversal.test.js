import { mountainPlotTraversal } from './mountainPlotTraversal';

import { parseDotBracket } from './parseDotBracket';

test('`function mountainPlotTraversal()`', () => {
  // an empty structure
  var structure = [[], []];
  expect(mountainPlotTraversal(...structure)).toStrictEqual([]);

  // an unstructured structure
  var seq = [...'1234567890'].map(() => new NucleobaseMock());
  expect(mountainPlotTraversal(seq, [])).toStrictEqual([...'1234567890'].map(() => 0));

  // a structure containing a hairpin
  var seq = [...'1234567890123456'].map(() => new NucleobaseMock());
  var basePairs = parseDotBracket(seq, '..((((.....)))).');
  expect(mountainPlotTraversal(seq, basePairs)).toStrictEqual([0, 0, 0, 1, 2, 3, 4, 4, 4, 4, 4, 3, 2, 1, 0, 0]);

  // a structure containing a multi-branch loop
  var seq = [...'123456789012345678901234567890123456'].map(() => new NucleobaseMock());
  var basePairs = parseDotBracket(seq, '.(((...(((....)))....(((...))).)))..');
  expect(mountainPlotTraversal(seq, basePairs)).toStrictEqual([0, 0, 1, 2, 3, 3, 3, 3, 4, 5, 6, 6, 6, 6, 5, 4, 3, 3, 3, 3, 3, 3, 4, 5, 6, 6, 6, 5, 4, 3, 3, 2, 1, 0, 0, 0]);
});

class NucleobaseMock {
  /**
   * Make each instance unique.
   */
  id = Math.random();
}
