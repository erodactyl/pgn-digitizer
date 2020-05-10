import outliersObj from "./firstAbove10.json";
import getScannedGame from "./getScannedGame";
import getGameById from "./getGameById";

const getOutliers = async (ids: string[], debug?: boolean) => {
  for (let id of ids) {
    await getScannedGame(id, debug);
    console.log(`Game ${id} done \n`);
  }
};

// getOutliers(outliersObj.outliers.map(o => o.id));

getOutliers(["34"], true);
