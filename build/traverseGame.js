"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const clone = (orig) => {
    const clonedGame = new chess_js_1.Chess();
    clonedGame.load_pgn(orig.pgn());
    return clonedGame;
};
const THRESHOLD = 0.01;
const getPossibleGames = (gameWithDistance, moveStr, getClosestTargets) => {
    const legalMoves = gameWithDistance.game.moves();
    if (legalMoves.includes(moveStr)) {
        gameWithDistance.game.move(moveStr);
        return [gameWithDistance];
    }
    else {
        const closest = getClosestTargets(moveStr, legalMoves, THRESHOLD);
        return closest.map((m) => {
            const newGame = clone(gameWithDistance.game);
            newGame.move(m.target);
            const fullGame = {
                game: newGame,
                distance: gameWithDistance.distance + m.dist,
            };
            return fullGame;
        });
    }
};
const getClosestGame = (games) => {
    if (games.length === 0)
        throw new Error("Empty");
    return games.reduce((acc, g) => (g.distance < acc.distance ? g : acc), games[0]);
};
const traverseGame = (moves, getClosestTargets) => {
    let games = [{ game: new chess_js_1.Chess(), distance: 0 }];
    for (const currMove of moves) {
        const newPossibleGames = [];
        games.forEach((game) => {
            const possibleGames = getPossibleGames(game, currMove, getClosestTargets);
            newPossibleGames.push(...possibleGames);
        });
        const closestGame = getClosestGame(newPossibleGames);
        if (closestGame.distance > 15) {
            return moves;
        }
        games = newPossibleGames.filter((g) => g.distance < closestGame.distance + THRESHOLD);
    }
    const closestGame = getClosestGame(games).game;
    return closestGame.history();
};
exports.default = traverseGame;
