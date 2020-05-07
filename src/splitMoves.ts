const moveSeparator = new RegExp("(\\d+\\.)");

function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function mask(str) {
  return str.replace(/\\/g, "\\");
}

/**
 * Collect all moves from a pgn string into an array
 * @param pgn
 */
const splitMoves = (pgn: string) => {
  const masked = mask(pgn);

  /* delete move numbers */
  const movesString = masked.replace(/\d+\.(\.\.)?/g, "");

  /* trim and get array of moves */
  const moves = trim(movesString).split(new RegExp(/\s+/));
  return moves;
};

export default splitMoves;
