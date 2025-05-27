import type { Sequence } from './Sequence';

import type { BasePair } from './BasePair';

/**
 * Returns an array of base-pairs
 * if the sequence were split in half
 * and the two halves paired up in parallel.
 *
 * For a sequence with an odd number of bases,
 * no base-pair will be returned containing the middle base.
 */
export function parallelPairs<Nucleobase>(seq: Sequence<Nucleobase>): BasePair<Nucleobase>[] {
  let pairs: BasePair<Nucleobase>[] = [];

  // the last index in the first half of the sequence
  // (does not include the middle index for sequences with odd numbers of bases)
  let firstHalfEnd = Math.floor(seq.length / 2) - 1;

  // the first index in the second half of the sequence
  // (does not include the middle index for sequences with odd numbers of bases)
  let secondHalfStart = Math.ceil(seq.length / 2);

  for (let i = 0; i <= firstHalfEnd; i++) {
    let b1 = seq[i];
    let b2 = seq[secondHalfStart + i];
    pairs.push([b1, b2]);
  }

  return pairs;
}
