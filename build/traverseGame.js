"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const getEditDistance_1 = require("./getEditDistance");
const move = (game, moveStr) => {
    const moved = game.move(moveStr);
    if (moved === null) {
        const legalMoves = game.moves();
        const closestMove = getEditDistance_1.getClosestTarget(moveStr, legalMoves);
        game.move(closestMove.target);
    }
    return game;
};
const traverseGame = (moves) => {
    const game = new chess_js_1.Chess();
    moves.forEach((currMove) => {
        move(game, currMove);
    });
    return game.pgn();
};
exports.default = traverseGame;
