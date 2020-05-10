"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const getEditDistance_1 = require("./getEditDistance");
const getLegalDoubleMovesFromPosition = (game) => {
    const currMoves = game.moves();
    const doubleMoves = [];
    currMoves.forEach((currMove) => {
        game.move(currMove);
        const secondMoves = game.moves();
        const currDoubleMoves = secondMoves.map((sm) => `${currMove} ${sm}`);
        doubleMoves.push(...currDoubleMoves);
        game.undo();
    });
    return doubleMoves;
};
const move = (game, doubleMoveStr) => {
    const singleMoves = doubleMoveStr.split(" ");
    try {
        const moved = game.move(singleMoves[0]);
        if (moved === null) {
            throw new Error("Illegal first move");
        }
        const secondMoved = game.move(singleMoves[1]);
        if (secondMoved === null) {
            throw new Error("Illegal second move");
        }
        return game;
    }
    catch (e) {
        if (e.message === "Illegal first move") {
            const legalMoves = getLegalDoubleMovesFromPosition(game);
            const closestMoves = getEditDistance_1.getClosestTarget(doubleMoveStr, legalMoves);
            const singleMoves = closestMoves.target.split(" ");
            console.log(`Swapping out ${doubleMoveStr} for ${closestMoves.target}`);
            game.move(singleMoves[0]);
            game.move(singleMoves[1]);
        }
        else if (e.message === "Illegal second move") {
            const legalMoves = game.moves();
            const closestMove = getEditDistance_1.getClosestTarget(singleMoves[1], legalMoves);
            game.move(closestMove.target);
        }
        return game;
    }
};
const traverseGame = (moves) => {
    const game = new chess_js_1.Chess();
    moves.forEach((currMove) => {
        move(game, currMove);
    });
    console.log(game.pgn());
    return game.pgn();
};
exports.default = traverseGame;
