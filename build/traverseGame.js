"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const leven_1 = __importDefault(require("leven"));
const getClosestMove = (illegalStr, legalMoves) => {
    const movesByCloseness = legalMoves.map((move) => {
        const dist = leven_1.default(illegalStr, move);
        return { move, dist };
    });
    movesByCloseness.sort((a, b) => {
        if (a.dist > b.dist)
            return 1;
        else if (a.dist < b.dist)
            return -1;
        return 0;
    });
    return movesByCloseness[0].move;
};
const move = (game, moveStr) => {
    try {
        const moved = game.move(moveStr);
        if (moved === null) {
            throw new Error("Illegal move");
        }
        return moved;
    }
    catch (e) {
        const legalMoves = game.moves();
        const closestMove = getClosestMove(moveStr, legalMoves);
        return game.move(closestMove);
    }
};
const traverseGame = (moves) => {
    const game = new chess_js_1.Chess();
    moves.forEach((currMove) => {
        move(game, currMove);
    });
    console.log(game.pgn());
};
exports.default = traverseGame;
