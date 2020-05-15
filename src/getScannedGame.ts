import scanImage from "./scanImage";
import path from "path";
import splitMoves from "./splitMoves";
import getGameById from "./getGameById";
import traverseGame from "./traverseGame";
import moveDifferences from "./moveDifferences";

const getScannedGame = async (id: string, debug?: boolean): Promise<string> => {
  try {
    const scannedPgn = await scanImage(
      path.join(__dirname, "..", "testImages", `${id}.png`)
    );

    return scannedPgn;
  } catch (e) {
    console.error(e);
  }
};

export default getScannedGame;
