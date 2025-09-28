# Installation

With `npm`:

```
npm install @rnacanvas/base-pairs
```

# Usage

All exports of this package can be accessed as named imports.

```javascript
// some example imports
import { knotless, radializable } from '@rnacanvas/base-pairs';
import { missing } from '@rnacanvas/base-pairs';
import { parseDotBracket } from '@rnacanvas/base-pairs';
```

## `function mountainPlotTraversal()`

Returns the mountain plot traversal for a given structure,
which is an array of numbers indicating the mountain plot height for each position in the structure.

At this time, this function should only be input radializable structures
(i.e., structures with no pseudoknots, repeat pairs, conflicitng pairs or self-pairs).

```javascript
// an array of nucleobase objects
var seq = [...'1234567890123456'].map(() => ({}));

var basePairs = parseDotBracket(seq, '..(((....))).');

var structure = [seq, basePairs];

mountainPlotTraversal(...structure); // [0, 0, 0, 1, 2, 3, 3, 3, 3, 3, 2, 0, 0]
```
