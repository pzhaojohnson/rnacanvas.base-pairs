import type { Structure } from './Structure';

import { mountainPlotTraversal as mountainPlotTraversalPP } from '@rnacanvas/position-pairs';

import { PositionPairs } from './PositionPairs';

/**
 * Returns the mountain plot traversal of a given structure.
 *
 * At this time, this function is only able to handle structures that are radializable
 * (i.e., no pseudoknots, conflicting pairs, repeat pairs or self-pairs).
 */
export function mountainPlotTraversal<Nucleobase>(...structure: Structure<Nucleobase>): number[] | never {
  let [seq, basePairs] = structure;

  let positionPairs = (new PositionPairs(...structure)).get();

  return mountainPlotTraversalPP(seq, positionPairs);
}
