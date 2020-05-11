import scanImage from "./scanImage";
import path from "path";
import splitMoves from "./splitMoves";
import getGameById from "./getGameById";
import traverseGame from "./traverseGame";
import moveDifferences from "./moveDifferences";

const getScannedGame = async (id: string, debug?: boolean): Promise<number> => {
  try {
    const scannedPgn = await scanImage(
      path.join(__dirname, "..", "images", `${id}.png`)
    );

    const moves = splitMoves(scannedPgn);

    const realMoves = splitMoves(getGameById(id));

    if (debug) {
      console.log("Scanned: ", scannedPgn, "\n");
      console.log("Real: ", getGameById(id), "\n");
      for (let i = 0; i < Math.max(moves.length, realMoves.length); i++) {
        // console.log(`${i} scanned is ${moves[i]}, real is ${realMoves[i]}`);
      }
    }

    // const pgn = traverseGame(moves);

    // console.log(pgn);

    // const traversedMoves = splitMoves(pgn);

    return moveDifferences(moves, realMoves);
  } catch (e) {
    console.error(e);
  }
};

export default getScannedGame;
