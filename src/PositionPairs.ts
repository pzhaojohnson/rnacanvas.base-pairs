import type { Structure } from './Structure';

import type { PositionPair } from '@rnacanvas/position-pairs';

/**
 * The position pairs of a target structure
 * (i.e., which positions in the sequence of a target structure are paired).
 */
export class PositionPairs<Nucleobase> {
  private targetStructure: Structure<Nucleobase>;

  constructor(...targetStructure: Structure<Nucleobase>) {
    this.targetStructure = targetStructure;
  }

  /**
   * All bases present in base-pairs in the target structure are supposed to
   * also be present in the sequence of the target structure.
   */
  get(): PositionPair[] {
    let seq = this.targetStructure[0];

    let basePairs = this.targetStructure[1];

    let positionPairs: PositionPair[] = basePairs.map(bp => [
      seq.indexOf(bp[0]) + 1,
      seq.indexOf(bp[1]) + 1,
    ]);

    return positionPairs;
  }
}
