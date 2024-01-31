/**
 * A pairing of two bases in a nucleic acid structure.
 *
 * Bases are typically expected to be some kind of truthy value (e.g., an object)
 * and each base is expected to be unique within the sequence of its parent structure.
 */
export type BasePair<Nucleobase> = [Nucleobase, Nucleobase];
