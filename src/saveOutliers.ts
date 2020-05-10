import fs from "fs";

const saveOutliers = (outliers: { id: string; diff: number }[]) => {
  const obj = { outliers };
  const json = JSON.stringify(obj);
  fs.writeFile("outliers.json", json, () => {});
};

export default saveOutliers;
