import fs from "fs";
import testGames from "./testGames.json";
import getScannedGame from "./getScannedGame";

const main = async () => {
  let pgns: Record<string, string> = {};
  const keys = Object.keys(testGames);

  /** Batching for performance gain */
  const batchSize = 20;
  const batchStarts: number[] = [];

  for (let left = 0; left < keys.length; left += batchSize) {
    batchStarts.push(left);
  }

  for (let left of batchStarts) {
    const currBatch = keys.slice(left, left + batchSize);

    await Promise.all(
      currBatch.map(async (key) => {
        const pgn = await getScannedGame(key);
        pgns[key] = pgn;
      })
    );

    console.log(`Diffs for batch ${left}-${left + batchSize} `);
  }

  const json = JSON.stringify(pgns);
  fs.writeFile("testScans.json", json, () => {});
};

main();
