"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chess_js_1 = require("chess.js");
const lastLetters = new Set();
for (let i = 0; i <= 3; i++) {
    const chess = new chess_js_1.Chess();
    while (!chess.game_over()) {
        const moves = chess.moves();
        moves.forEach((m) => lastLetters.add(m));
        const move = moves[Math.floor(Math.random() * moves.length)];
        chess.move(move);
    }
    console.log(lastLetters);
}
console.log(lastLetters);
