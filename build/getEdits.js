"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const remove = (remove) => {
    return { type: "Remove", remove };
};
const insert = (insert) => {
    return { type: "Insert", insert };
};
const substitute = (from, to) => {
    return { type: "Substitute", from, to };
};
exports.getEdits = (source, target) => {
    const edits = Array(source.length + 1)
        .fill(null)
        .map(() => Array(target.length + 1).fill([]));
    edits[0][0] = [];
    for (let i = 1; i <= source.length; i++) {
        edits[i][0] = edits[i - 1][0].concat([remove(source[i - 1])]);
    }
    for (let j = 1; j <= target.length; j++) {
        edits[0][j] = edits[0][j - 1].concat([insert(target[j - 1])]);
    }
    for (let j = 1; j <= target.length; j++) {
        for (let i = 1; i <= source.length; i++) {
            const substitutionCost = edits[i - 1][j - 1].length + (source[i - 1] === target[j - 1] ? 0 : 1);
            const removalCost = edits[i - 1][j].length + 1;
            const insertionCost = edits[i][j - 1].length + 1;
            if (substitutionCost <= removalCost &&
                substitutionCost <= insertionCost) {
                if (substitutionCost === edits[i - 1][j - 1].length) {
                    edits[i][j] = edits[i - 1][j - 1];
                }
                else {
                    edits[i][j] = edits[i - 1][j - 1].concat([
                        substitute(source[i - 1], target[j - 1]),
                    ]);
                }
            }
            else if (removalCost < insertionCost) {
                edits[i][j] = edits[i - 1][j].concat([remove(source[i - 1])]);
            }
            else {
                edits[i][j] = edits[i][j - 1].concat([insert(target[j - 1])]);
            }
        }
    }
    return edits[source.length][target.length];
};
exports.default = exports.getEdits;
