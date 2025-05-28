import type { BasePair } from './BasePair';

import { areEqual } from './areEqual';

/**
 * Returns an array containing the base-pairs
 * that are present in the parent array of base-pairs
 * but are missing in the target array of base-pairs.
 *
 * New base-pair tuples are created
 * for the base-pairs present in the returned array.
 */
export function missing<Nucleobase>(targetPairs: BasePair<Nucleobase>[], parentPairs: BasePair<Nucleobase>[]): BasePair<Nucleobase>[] {
  let missingPairs = parentPairs.filter(pair1 => !targetPairs.find(pair2 => areEqual(pair1, pair2)));

  // return new base-pair tuples
  return missingPairs.map(pair => [...pair]);
}
