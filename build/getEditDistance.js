"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_json_1 = __importDefault(require("./model.json"));
const getIdentityCost = (char) => {
    const prob = model_json_1.default.correct[char] || 0;
    return 1 - prob;
};
const getDeletionCost = (char) => {
    const prob = model_json_1.default.added[char] || 0;
    return 1 - prob;
};
const getInsertionCost = (char) => {
    const prob = model_json_1.default.lost[char] || 0;
    return 1 - prob;
};
const getSubstitutionCost = (from, to) => {
    const prob = model_json_1.default.changed[`${to}${from}`] || 0;
    return 1 - prob;
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
            const substitutionCost = source[i - 1] === target[j - 1]
                ? getIdentityCost(source[i - 1])
                : getSubstitutionCost(source[i - 1], target[j - 1]);
            distances[i][j] = Math.min(distances[i - 1][j] + getDeletionCost(source[i - 1]), distances[i][j - 1] + getInsertionCost(target[j - 1]), distances[i - 1][j - 1] + substitutionCost);
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
