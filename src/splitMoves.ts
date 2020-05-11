function trim(str) {
  return str.replace(/^\s+|\s+$/g, "");
}

function preprocessMove(str: string) {
  return (
    str
      // 0 is an illegal character in SAN, best estimate is the O from O-O of O-O-O
      .replace(/0/g, "O")
      // . is an illegal character, replace it
      .replace(/\./g, " ")
      // Can't have 9, statistically best guess is a g
      .replace(/9/g, "g")
      // trim double spaces
      .replace(/\s\s+/g, " ")
      .trim()
  );
}

/**
 * Collect all moves (e.g. e2 e4) from a pgn string into an array
 * @param pgn
 */
const splitMoves = (pgn: string): string[] => {
  /* Delete move numbers */
  const movesString = pgn.replace(/\s\d+\.(\.\.)?/g, ":");

  /* Trim and get array of moves, remove first empty string element */
  const dirtyMoves = trim(movesString).split(new RegExp(":")).slice(1);

  const correctedMoves = dirtyMoves.map((dm) => preprocessMove(dm));

  const moves = [];
  correctedMoves.forEach((m, idx) => {
    if (!m.includes(" ")) {
      if (idx === correctedMoves.length - 1) {
        // Last move
        moves.push(m);
      } else {
        console.log(`\nERROR SPACE in ${m}`);
        console.count("error space");
      }
    } else {
      const [move1, move2] = m.split(" ");
      moves.push(move1, move2);
    }
  });

  /* Remove result */
  return moves;
};

export default splitMoves;
