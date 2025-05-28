import type { BasePair } from './BasePair';

/**
 * Returns true if the two base-pairs are equal
 * (i.e., they pair the same bases with each other).
 */
export function areEqual<Nucleobase>(pair1: BasePair<Nucleobase>, pair2: BasePair<Nucleobase>): boolean {
  return (
    (pair1[0] === pair2[0] && pair1[1] === pair2[1])
    || (pair1[0] === pair2[1] && pair1[1] === pair2[0])
  );
}
