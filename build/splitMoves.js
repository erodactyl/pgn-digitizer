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
    const movesString = masked.replace(/\d+\.(\.\.)?/g, "");
    const moves = trim(movesString).split(new RegExp(/\s+/));
    return moves.slice(0, moves.length - 1);
};
exports.default = splitMoves;
