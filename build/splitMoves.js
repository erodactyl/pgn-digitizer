"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}
function preprocessMove(str) {
    return (str
        .replace(/0/g, "O")
        .replace(/\./g, " ")
        .replace(/9/g, "g")
        .replace(/\s\s+/g, " ")
        .trim());
}
const splitMoves = (pgn) => {
    const movesString = pgn.replace(/\s\d+\.(\.\.)?/g, ":");
    const dirtyMoves = trim(movesString).split(new RegExp(":")).slice(1);
    const correctedMoves = dirtyMoves.map((dm) => preprocessMove(dm));
    const moves = [];
    correctedMoves.forEach((m, idx) => {
        if (!m.includes(" ")) {
            if (idx === correctedMoves.length - 1) {
                moves.push(m);
            }
            else {
                console.log(`\nERROR SPACE in ${m}`);
                console.count("error space");
            }
        }
        else {
            const [move1, move2] = m.split(" ");
            moves.push(move1, move2);
        }
    });
    return moves;
};
exports.default = splitMoves;
