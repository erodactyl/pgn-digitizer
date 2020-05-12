"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const thirdAnalysis_json_1 = __importDefault(require("./thirdAnalysis.json"));
const numberOfiErrorGames = (is, analysis) => {
    let errors = new Array(is.length).fill(0);
    for (let game of analysis || thirdAnalysis_json_1.default.diffs) {
        for (let i of is) {
            if (game === i) {
                errors[i]++;
            }
        }
    }
    errors.forEach((err, idx) => {
        console.log(`Number of games with ${is[idx]} errors is ${err}`);
    });
};
exports.default = numberOfiErrorGames;
