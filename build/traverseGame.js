"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const move = (game, moveStr, getClosestTarget) => {
    const moved = game.move(moveStr);
    if (moved === null) {
        const legalMoves = game.moves();
        const closestMove = getClosestTarget(moveStr, legalMoves);
        game.move(closestMove.target);
    }
    return game;
};
const traverseGame = (moves, getClosestTarget) => {
    const game = new chess_js_1.Chess();
    moves.forEach((currMove) => {
        move(game, currMove, getClosestTarget);
    });
    return game.pgn();
};
exports.default = traverseGame;
