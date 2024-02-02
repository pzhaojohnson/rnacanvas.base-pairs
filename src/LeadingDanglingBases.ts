import type { Structure } from './Structure';

import { FirstPairedBase } from './FirstPairedBase';

/**
 * Unpaired bases in the target structure that precede any paired bases.
 */
export class LeadingDanglingBases<Nucleobase> {
  private targetStructure: Structure<Nucleobase>;

  constructor(...targetStructure: Structure<Nucleobase>) {
    this.targetStructure = targetStructure;
  }

  /**
   * Returns an array of all unpaired bases in the target structure
   * that precede the first paired base.
   *
   * Returns an empty array if the first base is paired.
   *
   * Throws if there are no paired bases in the target structure.
   *
   * All bases present in base-pairs in the target structure are expected
   * to also be present in the sequence of the target structure.
   */
  get(): Nucleobase[] | never {
    let seq = this.targetStructure[0];

    let basePairs = this.targetStructure[1];

    if (basePairs.length == 0) {
      throw new Error('There are no paired bases.');
    }

    let firstPairedBase = (new FirstPairedBase(...this.targetStructure)).get();

    let firstPairedBaseIndex = seq.indexOf(firstPairedBase);

    // not supposed to happen
    if (firstPairedBaseIndex < 0) {
      throw new Error('No paired bases present in sequence.');
    }

    return seq.slice(0, firstPairedBaseIndex);
  }
}
