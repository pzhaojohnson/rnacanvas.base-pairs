import type { Structure } from './Structure';

import { PositionPairs } from './PositionPairs';

import { radializable as _radializable } from '@rnacanvas/position-pairs';

/**
 * Returns a deep copy of the structure with all conflicting base-pairs,
 * repeat base-pairs, self base-pairs, and pseudoknots having been omitted.
 */
export function radializable<Nucleobase>(...structure: Structure<Nucleobase>): Structure<Nucleobase> {
  let [seq, basePairs] = structure;

  let positionPairs = (new PositionPairs(...structure)).get();

  // don't forget to create a new sequence array
  return [
    [...seq],
    _radializable(positionPairs).map(([p, q]) => [seq[p - 1], seq[q - 1]]),
  ];
}
