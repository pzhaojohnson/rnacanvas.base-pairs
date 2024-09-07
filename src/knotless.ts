import type { BasePair } from './BasePair';

import type { Structure } from './Structure';

import { PositionPairs } from './PositionPairs';

import { knotless as knotlessPPs } from '@rnacanvas/position-pairs';

import { areKnotless as areKnotlessPPs } from '@rnacanvas/position-pairs';

/**
 * Returns a new structure with base-pairs causing pseudoknots having been omitted.
 *
 * Base-pairs are omitted/retained according to the incremental range heuristic
 * reported by Smit et al., 2008.
 *
 * This function does not modify the input structure at all,
 * insteading returning a new structure tuple
 * with new sequence and base-pair arrays and base-pair tuples.
 *
 * (Nucleobase objects are simply copied over by reference
 * from the input structure to the newly created structure that is returned).
 *
 * This function returns the complete knotless structure
 * to assist with chaining with other functions that take structures as input
 * (even though it's only the base-pairs that might differ between the input structure
 * and the structure returned by this function).
 */
export function knotless<Nucleobase>(...structure: Structure<Nucleobase>): Structure<Nucleobase> {
  let [seq, basePairs] = structure;

  let pps = (new PositionPairs(...structure)).get();

  if (!areKnotlessPPs(pps)) {
    pps = knotlessPPs(pps);
  }

  let knotlessBPs: BasePair<Nucleobase>[] = pps.map(pp => [seq[pp[0] - 1], seq[pp[1] - 1]]);

  // don't forget to make a new sequence array
  return [[...seq], knotlessBPs];
}
