import type { Structure } from './Structure';

import type { Stem } from './Stem';

import { PositionPairs } from './PositionPairs';

/**
 * Stems composed of position pairs.
 */
import { Stems as StemsPP } from '@rnacanvas/position-pairs';

/**
 * All stems present in a target structure.
 */
export class Stems<Nucleobase> {
  private targetStructure: Structure<Nucleobase>;

  constructor(...targetStructure: Structure<Nucleobase>) {
    this.targetStructure = targetStructure;
  }

  /**
   * Stems will be returned already sorted
   * (i.e., stems will be returned in ascending order by 5'-most base/position
   * and base-pairs within stems will be in ascending order by 5' base/position).
   *
   * Assumes that the target structure is valid.
   *
   * (It is currently not firmly defined what the behavior is when the target structure is invalid.)
   */
  get(): Stem<Nucleobase>[] {
    let seq = this.targetStructure[0];

    let positionPairs = (new PositionPairs(...this.targetStructure)).get();

    let stemsPP = (new StemsPP(seq, positionPairs)).get();

    return stemsPP.map(st => (
      st.map(pp => [
        seq[pp[0] - 1],
        seq[pp[1] - 1],
      ])
    ));
  }
}
