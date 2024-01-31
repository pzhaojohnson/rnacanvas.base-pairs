import type { BasePair } from './BasePair';

export type Sequence<Nucleobase> = Nucleobase[];

/**
 * A sequence of bases and pairs among those bases.
 *
 * Is not supposed to contain invalid pairs,
 * such as contradictory pairs (i.e., multiple different pairs containing the same position),
 * repeat pairs (i.e., the same pair being present multiple times),
 * pairs that pair a single base with itself,
 * and pairs that contain bases not in the sequence of the structure.
 */
export type Structure<Nucleobase> = [Sequence<Nucleobase>, BasePair<Nucleobase>[]];
