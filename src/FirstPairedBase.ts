import type { Structure } from './Structure';

/**
 * The first paired base in a target structure.
 */
export class FirstPairedBase<Nucleobase> {
  private targetStructure: Structure<Nucleobase>;

  constructor(...targetStructure: Structure<Nucleobase>) {
    this.targetStructure = targetStructure;
  }

  /**
   * Throws if there are no paired bases in the target structure.
   *
   * All bases present in base-pairs in the target structure are expected
   * to also be present in the sequence of the target structure.
   */
  get(): Nucleobase | never {
    let seq = this.targetStructure[0];

    let basePairs = this.targetStructure[1];

    if (basePairs.length == 0) {
      throw new Error('There are no paired bases.');
    }

    let pairedBases = basePairs.flat();

    let firstPairedBaseIndex = seq.findIndex(b => pairedBases.includes(b));

    if (firstPairedBaseIndex < 0) {
      throw new Error('No paired bases present in sequence.');
    }

    return seq[firstPairedBaseIndex];
  }
}
