"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const move = (game, moveStr, getClosestTarget) => {
    let dist = 0;
    const moved = game.move(moveStr);
    if (moved === null) {
        const legalMoves = game.moves();
        const closestMove = getClosestTarget(moveStr, legalMoves);
        game.move(closestMove.target);
        dist = closestMove.dist;
    }
    return dist;
};
const traverseGame = (moves, getClosestTarget) => {
    let totalDist = 0;
    const game = new chess_js_1.Chess();
    for (const currMove of moves) {
        totalDist += move(game, currMove, getClosestTarget);
        if (totalDist > 10) {
            break;
        }
    }
    if (totalDist > 10) {
        return moves;
    }
    return game.history();
};
exports.default = traverseGame;
