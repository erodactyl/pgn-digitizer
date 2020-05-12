import fs from "fs";
import realGames from "./akopianGames.json";
import scannedGames from "./scans.json";
import splitMoves from "./splitMoves";
import getEdits from "./getEdits";
import generateModel from "./generateModel";

class EditMemory {
  values: Record<string, number>;
  constructor() {
    this.values = {};
  }

  addValue(value: string) {
    if (this.values[value]) {
      this.values[value]++;
    } else {
      this.values[value] = 1;
    }
  }

  addValues(values: string) {
    for (let i = 0; i < values.length; i++) {
      const char = values.charAt(i);
      this.addValue(char);
    }
  }

  get elements() {
    return this.values;
  }
}

const main = (keys: string[]) => {
  let total = new EditMemory();
  let correct = new EditMemory();
  let lost = new EditMemory();
  let added = new EditMemory();
  let changed = new EditMemory();

  keys.forEach((key) => {
    try {
      const realGame = realGames[key];
      const scannedGame = scannedGames[key];
      const realMoves = splitMoves(realGame);
      const scannedMoves = splitMoves(scannedGame);

      for (let i = 0; i < realMoves.length; i++) {
        const realMove = realMoves[i];
        const scannedMove = scannedMoves[i];

        if (realMove === scannedMove) {
          correct.addValues(realMove);
        } else if (scannedMove) {
          const edits = getEdits(scannedMove, realMove);
          if (edits.length > 2) {
            // console.count("more than 2 errors");
            // console.log(`Game ${key}: ${realMove} -- ${scannedMove}\n`);
            // console.log(edits);
            break;
          }
          if (edits.length === 2) {
            // console.log(`Game ${key}: ${realMove} -- ${scannedMove}\n`);
            // console.count("2 errors");
          }
          edits.forEach((edit) => {
            switch (edit.type) {
              case "Insert":
                lost.addValue(edit.insert);
                break;
              case "Remove":
                added.addValue(edit.remove);
                break;
              case "Substitute":
                changed.addValue(`${edit.to}${edit.from}`);
                break;
            }
          });

          const correctLeft = edits.reduce((acc, edit) => {
            switch (edit.type) {
              case "Insert":
                return acc;
              case "Remove":
                return acc.replace(edit.remove, "");
              case "Substitute":
                return acc.replace(edit.from, "");
            }
          }, scannedMove);
          // console.log(correctLeft);
          correct.addValues(correctLeft);
        }
        total.addValues(realMove);
      }
    } catch (e) {
      console.log(`Game ${key} failed to split`);
    }
  });

  return {
    correct: correct.elements,
    lost: lost.elements,
    added: added.elements,
    changed: changed.elements,
    total: total.elements,
  };
};

const keys = Object.keys(realGames);
const coefficients = main(keys);

const model = generateModel(coefficients);

const json = JSON.stringify(model);
fs.writeFile("model.json", json, () => {});
