"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getDeletionCost = () => {
    return 1;
};
const getInsertionCost = () => {
    return 1;
};
const getSubstitutionCost = () => {
    return 1;
};
exports.getEditDistance = (source, target) => {
    const distances = Array(source.length + 1)
        .fill(null)
        .map(() => Array(target.length + 1).fill(0));
    for (let i = 1; i <= source.length; i++) {
        distances[i][0] = i;
    }
    for (let j = 1; j <= target.length; j++) {
        distances[0][j] = j;
    }
    for (let j = 1; j <= target.length; j++) {
        for (let i = 1; i <= source.length; i++) {
            const substitutionCost = source[i - 1] === target[j - 1] ? 0 : 1;
            distances[i][j] = Math.min(distances[i - 1][j] + 1, distances[i][j - 1] + 1, distances[i - 1][j - 1] + substitutionCost);
        }
    }
    return distances[source.length][target.length];
};
exports.getClosestTarget = (source, targets) => {
    let min = { target: "", dist: 100 };
    targets.forEach((target) => {
        const dist = exports.getEditDistance(source, target);
        if (dist < min.dist) {
            min = { target, dist };
        }
    });
    return min;
};
