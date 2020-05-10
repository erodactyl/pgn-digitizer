import scanImage from "./scanImage";
import path from "path";
import splitMoves from "./splitMoves";
import fs from "fs";
import traverseGame from "./traverseGame";
import { Chess } from "chess.js";
import leven from "leven";
import summary from "./summary";
import akopianGames from "./akopianGames.json";

const moveDifferences = (scanned: string[], real: string[]) => {
  let count = 0;
  for (let i = 0; i < scanned.length; i++) {
    if (scanned[i] !== real[i]) {
      // console.log(`Scanned is: ${scanned[i]} with length ${scanned[i].length}`);
      // console.log(`Real is: ${real[i]} with length ${real[i].length}`);
      // console.log("\n");
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

const saveOutliers = (outliers: { id: string; diff: number }[]) => {
  const obj = { outliers };
  const json = JSON.stringify(obj);
  fs.writeFile("outliers.json", json, () => {});
};

const main = async () => {
  let diffs: number[] = [];
  const keys = Object.keys(akopianGames);

  /** Batching for performance gain */
  const batchSize = 20;
  const batchStarts: number[] = [];

  const outlierGames: { id: string; diff: number }[] = [];

  for (let left = 0; left < keys.length; left += batchSize) {
    batchStarts.push(left);
  }

  for (let left of batchStarts) {
    const currBatch = keys.slice(left, left + batchSize);

    const currDiffs = await Promise.all(
      currBatch.map(async (key) => {
        const diff = await run(Number(key));
        if (diff > 10) {
          console.log(`Difference for game ${key} is ${diff}`);
          outlierGames.push({ id: key, diff });
        }
        return diff;
      })
    );

    console.log(`Diffs for batch ${left}-${left + batchSize} are ${currDiffs}`);
    diffs.push(...currDiffs);
  }

  const diffsSummary = summary(diffs);
  console.log("\n\n");
  console.log(diffsSummary);

  saveOutliers(outlierGames);

  const json = JSON.stringify({ diffs });
  fs.writeFile("firstAnalysis.json", json, () => {});
};

main();
