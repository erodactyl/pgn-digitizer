"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moveSeparator = new RegExp("(\\d+\\.)");
function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}
function mask(str) {
    return str.replace(/\\/g, "\\");
}
const splitMoves = (pgn) => {
    const masked = mask(pgn);
    const movesString = masked.replace(/\d+\.(\.\.)?/g, ":");
    const dirtyMoves = trim(movesString).split(new RegExp(":"));
    const moves = dirtyMoves
        .slice(1)
        .map((move) => move.trim().replace(/\s\s+/g, " "));
    return moves;
};
exports.default = splitMoves;
