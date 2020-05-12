"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testGames_json_1 = __importDefault(require("./testGames.json"));
const testScans_json_1 = __importDefault(require("./testScans.json"));
const splitMoves_1 = __importDefault(require("./splitMoves"));
const traverseGame_1 = __importDefault(require("./traverseGame"));
const summary_1 = __importDefault(require("./summary"));
const numberOfiErrorGames_1 = __importDefault(require("./numberOfiErrorGames"));
const getEditDistance_1 = __importDefault(require("./getEditDistance"));
const model_json_1 = __importDefault(require("./model.json"));
const getEditDistance = getEditDistance_1.default(model_json_1.default);
const main = (keys) => {
    const errors = [];
    keys.forEach((key) => {
        try {
            let currErrs = 0;
            const realGame = testGames_json_1.default[key];
            const scannedGame = testScans_json_1.default[key];
            const realMoves = splitMoves_1.default(realGame);
            const scannedMoves = splitMoves_1.default(scannedGame);
            const traversed = traverseGame_1.default(scannedMoves, getEditDistance.getClosestTarget);
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
        }
        catch (e) {
            console.log(`Game ${key} failes`);
        }
    });
    return errors;
};
const errors = main(Object.keys(testGames_json_1.default));
console.log(summary_1.default(errors));
console.log(numberOfiErrorGames_1.default([0], errors));
