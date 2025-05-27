import type { Sequence } from './Sequence';

import type { BasePair } from './BasePair';

import { parseDotBracket as parseDotBracketPP } from '@rnacanvas/position-pairs';

/**
 * Returns an iterable over the base-pairs specified by the dot-bracket notation for the sequence of bases.
 *
 * Within returned base-pairs, the upstream partner will always be ordered before the downstream partner.
 *
 * The returned iterable of base-pairs will be ordered in ascending order by upstream partner position
 * (i.e., in the order that one would encounter the base-pairs traversing the dot-bracket notation).
 *
 * Will throw if the given dot-bracket notation is longer than the sequence
 * (though the dot-bracket notation is allowed to be shorter than the sequence).
 *
 * Currently, this function is only able to handle simple dot-bracket notation
 * (i.e., that only contains the characters ".", "(" and ")").
 *
 * Will throw if the given dot-bracket notation contains additional, unrecognized characters.
 *
 * Will also throw if the given dot-bracket notation is invalid
 * (i.e., contains unmatched upstream and/or downstream brackets).
 */
export function parseDotBracket<B>(seq: Sequence<B>, dotBracket: string): Iterable<BasePair<B>> | never {
  if (dotBracket.length > seq.length) {
    throw new Error('Dot-bracket notation is longer than the sequence.');
  }

  let positionPairs = [...parseDotBracketPP(dotBracket)];

  return positionPairs.map(pp => {
    let p = pp[0];
    let q = pp[1];
    return [seq[p - 1], seq[q - 1]];
  });
}
