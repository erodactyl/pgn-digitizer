import fs from "fs";
import realGames from "./akopianGames.json";
import scannedGames from "./scans.json";
import splitMoves from "./splitMoves";
import getEdits from "./getEdits";
import generateModel from "./generateModel";
import traverseGame from "./traverseGame";
import badGames from "./badGames.json";
import summary from "./summary";
import numberOfiErrorGames from "./numberOfiErrorGames";

const main = (keys: string[]) => {
  const errors = [];

  keys.forEach((key) => {
    let currErrs = 0;
    if (badGames.includes[key]) {
      console.log("SKIPPED");
      return;
    }
    const realGame = realGames[key];
    const scannedGame = scannedGames[key];

    // console.log(realGame);
    // console.log(scannedGame);
    const realMoves = splitMoves(realGame);
    const scannedMoves = splitMoves(scannedGame);

    // console.log(scannedMoves);

    const traversed = traverseGame(scannedMoves);

    const traversedMoves = splitMoves(traversed);

    for (let i = 0; i < realMoves.length; i++) {
      const realMove = realMoves[i];
      const traversedMove = traversedMoves[i];
      if (realMove !== traversedMove) {
        // console.log(realMove, traversedMove);
        currErrs++;
      }
    }

    errors.push(currErrs);

    console.log(`Game ${key} done. Errors in this game are ${currErrs}`);
  });

  return errors;
};

const errors = main(Object.keys(realGames));

console.log(summary(errors));
console.log(numberOfiErrorGames([0], errors));
