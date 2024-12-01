import type { BasePair } from './BasePair';

/**
 * Returns the other base in the base-pair.
 *
 * Throws if the given base is not present in the provided base-pair.
 *
 * @param b
 * @param parentBasePair The base-pair that the base is in.
 */
export function other<Nucleobase>(b: Nucleobase, parentBasePair: BasePair<Nucleobase>): Nucleobase | never {
  if (!parentBasePair.includes(b)) {
    throw new Error('The given base is not present in the provided base-pair.');
  }

  return b === parentBasePair[0] ? parentBasePair[1] : parentBasePair[0];
}
