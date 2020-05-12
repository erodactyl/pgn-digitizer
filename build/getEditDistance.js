"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createEditDistancesFromModel(model) {
    const getIdentityCost = (char) => {
        const prob = model.correct[char] || 0;
        return Math.pow(1 - prob, 2);
    };
    const getDeletionCost = (char) => {
        const prob = model.added[char] || 0;
        return Math.pow(1 - prob, 2);
    };
    const getInsertionCost = (char) => {
        const prob = model.lost[char] || 0;
        return Math.pow(1 - prob, 2);
    };
    const getSubstitutionCost = (from, to) => {
        const prob = model.changed[`${to}${from}`] || 0;
        return Math.pow(1 - prob, 2);
    };
    const getEditDistance = (source, target) => {
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
    const getClosestTargets = (source, targets) => {
        const targetDistances = targets.map((target) => {
            const dist = getEditDistance(source, target);
            return { target, dist };
        });
        targetDistances.sort((a, b) => a.dist - b.dist);
        return targetDistances;
    };
    const getClosestTarget = (source, targets) => {
        let min = { target: "", dist: 100 };
        targets.forEach((target) => {
            const dist = getEditDistance(source, target);
            if (dist < min.dist) {
                min = { target, dist };
            }
        });
        return min;
    };
    const getClosestTargetsByThreshold = (source, targets, threshold) => {
        if (targets.length === 0)
            return [];
        const targetDistances = targets.map((target) => {
            const dist = getEditDistance(source, target);
            return { target, dist };
        });
        targetDistances.sort((a, b) => a.dist - b.dist);
        const closest = targetDistances[0].dist;
        return targetDistances.filter((t) => t.dist - closest <= threshold);
    };
    return {
        getEditDistance,
        getClosestTarget,
        getClosestTargets,
        getClosestTargetsByThreshold,
    };
}
exports.default = createEditDistancesFromModel;
