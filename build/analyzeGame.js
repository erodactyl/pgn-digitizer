"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const akopianGames_json_1 = __importDefault(require("./akopianGames.json"));
const scans_json_1 = __importDefault(require("./scans.json"));
const splitMoves_1 = __importDefault(require("./splitMoves"));
const getEdits_1 = __importDefault(require("./getEdits"));
class EditMemory {
    constructor() {
        this.values = {};
    }
    addValue(value) {
        if (this.values[value]) {
            this.values[value]++;
        }
        else {
            this.values[value] = 1;
        }
    }
    addValues(values) {
        for (let i = 0; i < values.length; i++) {
            const char = values.charAt(i);
            this.addValue(char);
        }
    }
    get elements() {
        return this.values;
    }
}
const main = (keys) => {
    let correct = new EditMemory();
    let lost = new EditMemory();
    let added = new EditMemory();
    let changed = new EditMemory();
    keys.forEach((key) => {
        const realGame = akopianGames_json_1.default[key];
        const scannedGame = scans_json_1.default[key];
        const realMoves = splitMoves_1.default(realGame);
        const scannedMoves = splitMoves_1.default(scannedGame);
        for (let i = 0; i < realMoves.length; i++) {
            const realMove = realMoves[i];
            const scannedMove = scannedMoves[i];
            if (realMove === scannedMove) {
                correct.addValues(realMove);
            }
            else if (scannedMove) {
                const edits = getEdits_1.default(scannedMove, realMove);
                if (edits.length > 2) {
                    break;
                }
                if (edits.length === 2) {
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
                correct.addValues(correctLeft);
            }
        }
    });
    return {
        correct: correct.elements,
        lost: lost.elements,
        added: added.elements,
        changed: changed.elements,
    };
};
const keys = Object.keys(akopianGames_json_1.default);
const model = main(keys);
console.log(model);
const json = JSON.stringify(model);
fs_1.default.writeFile("coefficients.json", json, () => { });
