import fs from "fs";
import summary from "./summary";
import akopianGames from "./akopianGames.json";
import getScannedGame from "./getScannedGame";
import saveOutliers from "./saveOutliers";

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
        const diff = await getScannedGame(key);
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
  fs.writeFile("thirdAnalysis.json", json, () => {});
};

main();

// const run = async () => {
//   console.log(await getScannedGame("2"));
// };

// run();
