import type { BasePair } from './BasePair';

/**
 * An array of base-pairs that stack perfectly
 * (i.e., can be stacked with no intervening unpaired bases present on either side of the stem).
 */
export type Stem<Nucleobase> = BasePair<Nucleobase>[];
