/**
 * A region linking two consecutive stem sides
 * (i.e., two stem sides for which there are no paired bases between them).
 *
 * In the case of a linker that is a hairpin loop,
 * the two stem sides being linked are part of the same stem.
 *
 * All linkers will contain at least two bases,
 * those being the two closest bases within the two stem sides being linked.
 *
 * Linkers will also contain all unpaired bases between the two stem sides being linked.
 *
 * Leading and trailing unpaired bases in a structure are not considered to part of any linkers
 * according to this definition.
 */
export type Linker<Nucleobase> = Nucleobase[];
