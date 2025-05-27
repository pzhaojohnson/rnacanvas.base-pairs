import type { Sequence } from './Sequence';

import type { BasePair } from './BasePair';

/**
 * Returns an array of bases
 * if the sequence of bases were split in half
 * and the two halves paired up anti-parallel.
 *
 * For sequences with odd numbers of bases,
 * no base-pair will be returned containing the middle base.
 */
export function antiParallelPairs<Nucleobase>(seq: Sequence<Nucleobase>): BasePair<Nucleobase>[] {
  let pairs: BasePair<Nucleobase>[] = [];

  for (let i = 0; i < Math.floor(seq.length / 2); i++) {
    let b1 = seq[i];
    let b2 = seq[seq.length - i - 1];
    pairs.push([b1, b2]);
  }

  return pairs;
}
