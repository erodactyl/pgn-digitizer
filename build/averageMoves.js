"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const splitMoves_1 = __importDefault(require("./splitMoves"));
const summary_1 = __importDefault(require("./summary"));
const akopianGames_json_1 = __importDefault(require("./akopianGames.json"));
const avgs = [];
const moveCounts = [];
for (const key in akopianGames_json_1.default) {
    const pgn = akopianGames_json_1.default[key];
    const chess = new chess_js_1.Chess();
    const perMoveCount = [];
    const doubleMoves = splitMoves_1.default(pgn);
    const singleMoves = [];
    doubleMoves.forEach((doubleMove) => {
        singleMoves.push(...doubleMove.split(" "));
    });
    singleMoves.forEach((move) => {
        const { length } = chess.moves();
        perMoveCount.push(length);
        chess.move(move);
    });
    const moveCount = singleMoves.length;
    const { mean } = summary_1.default(perMoveCount);
    console.log(`Mean of game ${key} is ${mean} with move count ${moveCount}`);
    moveCounts.push(moveCount);
    avgs.push(mean);
}
console.log(summary_1.default(avgs));
console.log(summary_1.default(moveCounts));
