const moveSeparator = new RegExp("(\\d+\\.)");

function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function mask(str) {
  return str.replace(/\\/g, "\\");
}

/**
 * Collect all moves (e.g. e2 e4) from a pgn string into an array
 * @param pgn
 */
const splitMoves = (pgn: string) => {
  const masked = mask(pgn);

  /* Delete move numbers */
  const movesString = masked.replace(/\d+\.(\.\.)?/g, ":");

  /* Trim and get array of moves */
  const dirtyMoves = trim(movesString).split(new RegExp(":"));

  const moves = dirtyMoves.slice(1).map((move) => move.trim());

  /* Remove result */
  return moves;
};

export default splitMoves;
