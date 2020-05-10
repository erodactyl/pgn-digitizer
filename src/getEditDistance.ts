const getDeletionCost = () => {
  return 1;
};

const getInsertionCost = () => {
  return 1;
};

const getSubstitutionCost = () => {
  return 1;
};

/**
 * Implements the Wagner-Fischer edit distance algorithm with custom penalties
 * https://en.wikipedia.org/wiki/Wagner%E2%80%93Fischer_algorithm
 */
export const getEditDistance = (source: string, target: string) => {
  const distances: number[][] = Array(source.length + 1)
    .fill(null)
    .map(() => Array(target.length + 1).fill(0));

  for (let i = 1; i <= source.length; i++) {
    distances[i][0] = i;
  }

  for (let j = 1; j <= target.length; j++) {
    distances[0][j] = j;
  }

  for (let j = 1; j <= target.length; j++) {
    for (let i = 1; i <= source.length; i++) {
      const substitutionCost = source[i - 1] === target[j - 1] ? 0 : 1;

      distances[i][j] = Math.min(
        distances[i - 1][j] + 1, // deletion
        distances[i][j - 1] + 1, // insertion
        distances[i - 1][j - 1] + substitutionCost // substitution
      );
    }
  }

  return distances[source.length][target.length];
};

// console.time("10000 ed");
// for (let i = 0; i <= 10000; i++) {
//   getEditDistance("kitten", "sitting");
// }
// console.timeEnd("10000 ed");

export const getClosestTarget = (source: string, targets: string[]) => {
  let min = { target: "", dist: 100 }; // Unreasonably large distance

  targets.forEach((target) => {
    const dist = getEditDistance(source, target);
    if (dist < min.dist) {
      min = { target, dist };
    }
  });

  return min;
};
