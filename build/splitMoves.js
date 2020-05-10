"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}
function preprocessMove(str) {
    return (str
        .trim()
        .replace(/0/g, "O")
        .replace(/\./g, " ")
        .replace(/\s\s+/g, " "));
}
const splitMoves = (pgn) => {
    const movesString = pgn.replace(/\d+\.(\.\.)?/g, ":");
    const dirtyMoves = trim(movesString).split(new RegExp(":"));
    const correctedMoves = [];
    for (let i = 1; i < dirtyMoves.length; i++) {
        const trimmed = preprocessMove(dirtyMoves[i]);
        if (trimmed.length < 2 && dirtyMoves[i + 1]) {
            const nextTrimmed = preprocessMove(dirtyMoves[i + 1]);
            correctedMoves.push(trimmed + nextTrimmed);
            i++;
        }
        else {
            correctedMoves.push(trimmed);
        }
    }
    return correctedMoves;
};
exports.default = splitMoves;
