import outliersObj from "./secondAbove10.json";
import getScannedGame from "./getScannedGame";
import getGameById from "./getGameById";
import summary from "./summary";

const getOutliers = async (ids: string[], debug?: boolean) => {
  const diffs = [];
  for (let id of ids) {
    const diff = await getScannedGame(id, debug);
    console.log(`Game ${id} done with difference ${diff} \n`);
    diffs.push(diff);
  }

  console.log(summary(diffs));
};

getOutliers(
  outliersObj.outliers.map((o) => o.id),
  true
);

// getOutliers(["34"], true);
