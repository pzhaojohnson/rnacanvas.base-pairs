import type { Structure } from './Structure';

import type { Linker } from './Linker';

import { PositionPairs } from './PositionPairs';

/**
 * Linkers composed of sequence position numbers.
 */
import { Linkers as LinkersP } from '@rnacanvas/position-pairs';

/**
 * All linkers in a target structure.
 */
export class Linkers<Nucleobase> {
  private targetStructure: Structure<Nucleobase>;

  constructor(...targetStructure: Structure<Nucleobase>) {
    this.targetStructure = targetStructure;
  }

  /**
   * Linkers are returned already sorted
   * (i.e., linkers are arranged in ascending order according to their 5'-most bases/positions
   * and bases within linkers are arranged in ascending order according to sequence position
   * within the target structure).
   *
   * Returns an empty array if there are no linkers in the target structure.
   *
   * Assumes that the target structure is valid.
   *
   * It is not currently firmly defined what the behavior is if the target structure is invalid
   * (e.g., contains contradictory base-pairs, repeat base-pairs, etc.).
   */
  get(): Linker<Nucleobase>[] {
    let seq = this.targetStructure[0];

    let positionPairs = (new PositionPairs(...this.targetStructure)).get();

    let linkersP = (new LinkersP(seq, positionPairs)).get();

    return linkersP.map(li => (
      li.map(p => seq[p - 1])
    ));
  }
}
