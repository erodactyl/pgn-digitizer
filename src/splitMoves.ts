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

  /* Delete move numbers */
  const movesString = masked.replace(/\d+\.(\.\.)?/g, "");

  /* Trim and get array of moves */
  const moves = trim(movesString).split(new RegExp(/\s+/));
  /* Remove result */
  return moves.slice(0, moves.length - 1);
};

export default splitMoves;
