function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function preprocessMove(str: string) {
  return (
    str
      .trim()
      // 0 is an illegal character in SAN, best estimate is the O from O-O of O-O-O
      .replace(/0/g, "O")
      // . is an illegal character, replace it
      .replace(/\./g, " ")
      // trim double spaces
      .replace(/\s\s+/g, " ")
  );
}

/**
 * Collect all moves (e.g. e2 e4) from a pgn string into an array
 * @param pgn
 */
const splitMoves = (pgn: string): string[] => {
  /* Delete move numbers */
  const movesString = pgn.replace(/\d+\.(\.\.)?/g, ":");

  /* Trim and get array of moves */
  const dirtyMoves = trim(movesString).split(new RegExp(":"));

  const correctedMoves = [];
  // Start from 1, as first dirty move is an empty string

  for (let i = 1; i < dirtyMoves.length; i++) {
    const trimmed = preprocessMove(dirtyMoves[i]);
    // chess moves can't be of length less than 2, combine with next
    if (trimmed.length < 2 && dirtyMoves[i + 1]) {
      const nextTrimmed = preprocessMove(dirtyMoves[i + 1]);
      correctedMoves.push(trimmed + nextTrimmed);
      i++;
    } else {
      correctedMoves.push(trimmed);
    }
  }

  /* Remove result */
  return correctedMoves;
};

export default splitMoves;
