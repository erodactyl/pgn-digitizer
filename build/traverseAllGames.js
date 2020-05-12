"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const akopianGames_json_1 = __importDefault(require("./akopianGames.json"));
const scans_json_1 = __importDefault(require("./scans.json"));
const splitMoves_1 = __importDefault(require("./splitMoves"));
const traverseGame_1 = __importDefault(require("./traverseGame"));
const badGames_json_1 = __importDefault(require("./badGames.json"));
const summary_1 = __importDefault(require("./summary"));
const numberOfiErrorGames_1 = __importDefault(require("./numberOfiErrorGames"));
const main = (keys) => {
    const errors = [];
    keys.forEach((key) => {
        let currErrs = 0;
        if (badGames_json_1.default.includes[key]) {
            console.log("SKIPPED");
            return;
        }
        const realGame = akopianGames_json_1.default[key];
        const scannedGame = scans_json_1.default[key];
        const realMoves = splitMoves_1.default(realGame);
        const scannedMoves = splitMoves_1.default(scannedGame);
        const traversed = traverseGame_1.default(scannedMoves);
        const traversedMoves = splitMoves_1.default(traversed);
        for (let i = 0; i < realMoves.length; i++) {
            const realMove = realMoves[i];
            const traversedMove = traversedMoves[i];
            if (realMove !== traversedMove) {
                currErrs++;
            }
        }
        errors.push(currErrs);
        console.log(`Game ${key} done. Errors in this game are ${currErrs}`);
    });
    return errors;
};
const errors = main(Object.keys(akopianGames_json_1.default));
console.log(summary_1.default(errors));
console.log(numberOfiErrorGames_1.default([0], errors));
