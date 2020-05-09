import scanImage from "./scanImage";
import path from "path";
import splitMoves from "./splitMoves";
import traverseGame from "./traverseGame";
import { Chess } from "chess.js";
import leven from "leven";
import akopianGames from "./akopianGames.json";

const moveDifferences = (scanned: string[], real: string[]) => {
  let count = 0;
  for (let i = 0; i < scanned.length; i++) {
    if (scanned[i] !== real[i]) {
      // console.log(scanned[i], real[i]);
      count++;
    }
  }

  // console.log(count);
  return count;
};

const getGame = (id: number) => {
  return akopianGames[id.toString()];
};

const run = async (id: number): Promise<number> => {
  try {
    const scannedPgn = await scanImage(
      path.join(__dirname, "..", "images", `${id}.png`)
    );

    const moves = splitMoves(scannedPgn);

    const realMoves = splitMoves(getGame(id));

    return moveDifferences(moves, realMoves);

    // const pgn = traverseGame(moves);
  } catch (e) {
    console.error(e);
  }
};

const main = async () => {
  let diffs: number[] = [];
  const keys = Object.keys(akopianGames);

  /** Batching for performance gain */
  const sliceLength = 20;
  const sliceStarts: number[] = [];

  for (let left = 0; left < keys.length; left += sliceLength) {
    sliceStarts.push(left);
  }

  for (let left of sliceStarts) {
    const currSlice = keys.slice(left, left + sliceLength);

    const currDiffs = await Promise.all(
      currSlice.map(async (key) => {
        const diff = await run(Number(key));
        console.log(key, diff);
        return diff;
      })
    );

    diffs.push(...currDiffs);
  }

  console.log(diffs);
};

main();
