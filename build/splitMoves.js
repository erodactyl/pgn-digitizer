"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}
function preprocessMove(str) {
    return (str
        .replace(/\./g, " ")
        .replace(/\s\s+/g, " ")
        .trim());
}
const isChessRowNumber = (char) => {
    if (["1", "2", "3", "4", "5", "6", "7", "8"].includes(char)) {
        return true;
    }
    else
        return false;
};
const isChessColumnLetter = (char) => {
    if (["a", "b", "c", "d", "e", "f", "g", "h"].includes(char)) {
        return true;
    }
    else
        return false;
};
const dirtySplit = (doubleMove) => {
    let move1 = "";
    let move2 = "";
    for (let i = 1; i < doubleMove.length; i++) {
        if (isChessRowNumber(doubleMove[i]) &&
            isChessColumnLetter(doubleMove[i - 1])) {
            move1 = doubleMove.slice(0, i + 1);
            move2 = doubleMove.slice(i + 1);
            break;
        }
    }
    if (move1.length >= 2 && move2.length >= 2) {
        return [move1, move2];
    }
    else
        return null;
};
const splitMoves = (pgn) => {
    const movesString = (" " + pgn).replace(/\s\d+\.(\.\.)?/g, ":");
    const dirtyMoves = trim(movesString).split(new RegExp(":")).slice(1);
    const correctedMoves = dirtyMoves.map((dm) => preprocessMove(dm));
    const moves = [];
    correctedMoves.forEach((m, idx) => {
        if (!m.includes(" ")) {
            if (idx === correctedMoves.length - 1) {
                moves.push(m);
            }
            else {
                const split = dirtySplit(m);
                if (split === null) {
                    throw new Error("Game can't be split");
                }
                else {
                    const [move1, move2] = split;
                    moves.push(move1, move2);
                }
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
