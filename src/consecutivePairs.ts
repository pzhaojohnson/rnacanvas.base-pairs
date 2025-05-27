import type { Sequence } from './Sequence';

import type { BasePair } from './BasePair';

/**
 * Returns all consecutive pairs of bases in the sequence of bases.
 *
 * Pairs are returned in ascending order by sequence position
 * (both in terms of the two bases within each pair
 * and the ordering of pairs within the returned array of base-pairs).
 *
 * Returns an empty array if the sequence length is less than two.
 */
export function consecutivePairs<Nucleobase>(seq: Sequence<Nucleobase>): BasePair<Nucleobase>[] {
  if (seq.length < 2) {
    return [];
  }

  return seq.slice(0, -1).map((b, i) => [seq[i], seq[i + 1]]);
}
