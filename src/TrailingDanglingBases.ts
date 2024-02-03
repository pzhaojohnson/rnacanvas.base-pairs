import type { Structure } from './Structure';

import { LastPairedBase } from './LastPairedBase';

/**
 * Any unpaired bases downstream of the last paired base in a target structure.
 */
export class TrailingDanglingBases<Nucleobase> {
  private targetStructure: Structure<Nucleobase>;

  constructor(...targetStructure: Structure<Nucleobase>) {
    this.targetStructure = targetStructure;
  }

  /**
   * Returns an array of all unpaired bases downstream of the last paired base in the target structure
   * (in the order that they are present in the sequence of the target structure).
   *
   * Returns an empty array if the last base in the target structure is paired.
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

    let lastPairedBase = (new LastPairedBase(...this.targetStructure)).get();

    let lastPairedBaseIndex = seq.indexOf(lastPairedBase);

    if (lastPairedBaseIndex < 0) {
      throw new Error('No paired bases present in sequence.');
    }

    return seq.slice(lastPairedBaseIndex + 1);
  }
}
