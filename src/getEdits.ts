interface Deletion {
  delete: string;
}

interface Insertion {
  insert: string;
}

interface Substitution {
  from: string;
  to: string;
}

type Edit = Deletion | Insertion | Substitution;

/** Implements a modification of the Wagner-Fischer edit distance
 * algorithm with actually returning the necessary edits  */
export const getEdits = (source: string, target: string) => {
  /** Matrix holding all the necessary edits */
  const edits: Edit[][][] = Array(source.length + 1)
    .fill(null)
    .map(() => Array(target.length + 1).fill([]));

  edits[0][0] = [];

  /** source prefixes can be transformed into
   * empty string by dropping all characters */
  for (let i = 1; i <= source.length; i++) {
    edits[i][0] = edits[i - 1][0].concat([{ delete: source[i - 1] }]);
  }

  /** target prefixes can be reached from
   * empty source prefix by inserting every character*/
  for (let j = 1; j <= target.length; j++) {
    edits[0][j] = edits[0][j - 1].concat({ insert: target[j - 1] });
  }

  for (let j = 1; j <= target.length; j++) {
    for (let i = 1; i <= source.length; i++) {
      const substitutionCost =
        edits[i - 1][j - 1].length + (source[i - 1] === target[j - 1] ? 0 : 1);

      const deletionCost = edits[i - 1][j].length + 1;

      const insertionCost = edits[i][j - 1].length + 1;

      if (
        substitutionCost <= deletionCost &&
        substitutionCost <= insertionCost
      ) {
        if (substitutionCost === edits[i - 1][j - 1].length) {
          edits[i][j] = edits[i - 1][j - 1];
        } else {
          edits[i][j] = edits[i - 1][j - 1].concat([
            { from: source[i - 1], to: target[j - 1] },
          ]);
        }
      } else if (deletionCost < insertionCost) {
        edits[i][j] = edits[i - 1][j].concat({ delete: source[i - 1] });
      } else {
        edits[i][j] = edits[i][j - 1].concat({ insert: target[j - 1] });
      }
    }
  }

  // const distances: number[][] = edits.map((row) => row.map((el) => el.length));

  return edits[source.length][target.length];
};
