import fs from "fs";
import realGames from "./testGames.json";
import scannedGames from "./testScans.json";
import splitMoves from "./splitMoves";
import traverseGame from "./traverseGame";
import summary from "./summary";
import numberOfiErrorGames from "./numberOfiErrorGames";
import createEditDistanceFromModel from "./getEditDistance";
import model from "./model.json";

const getEditDistance = createEditDistanceFromModel(model);

const main = (keys: string[]) => {
  const errors = [];

  keys.forEach((key) => {
    try {
      let currErrs = 0;
      const realGame = realGames[key];
      const scannedGame = scannedGames[key];

      // console.log(realGame);
      // console.log(scannedGame);
      const realMoves = splitMoves(realGame);
      const scannedMoves = splitMoves(scannedGame);

      // console.log(scannedMoves);

      const traversed = traverseGame(
        scannedMoves,
        getEditDistance.getClosestTargetsByThreshold
      );

      for (let i = 0; i < realMoves.length; i++) {
        const realMove = realMoves[i];
        const traversedMove = traversed[i];
        if (realMove !== traversedMove) {
          // console.log(realMove, traversedMove);
          currErrs++;
        }
      }

      errors.push(currErrs);

      console.log(`Game ${key} done. Errors in this game are ${currErrs}`);
    } catch (e) {
      console.log(`Game ${key} failes`);
    }
  });

  return errors;
};

const errors = main(Object.keys(realGames));

console.log(summary(errors));
numberOfiErrorGames([0, 1, 2, 3], errors);

const json = JSON.stringify(errors);
fs.writeFile("branchedErrors15.json", json, () => {});
