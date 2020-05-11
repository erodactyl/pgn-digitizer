"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateModel(coeffs) {
    const getChanged = (char, i) => {
        let count = 0;
        Object.keys(coeffs.changed).forEach((key) => {
            if (key.charAt(i) === char) {
                count += coeffs.changed[key];
            }
        });
        return count;
    };
    const getTotal = (key) => coeffs.total[key] || 0;
    const getCorrect = (key) => coeffs.correct[key] || 0;
    const getAdded = (key) => coeffs.added[key] || 0;
    const getLost = (key) => coeffs.lost[key] || 0;
    const getChangedFrom = (key) => getChanged(key, 0);
    const getChangedTo = (key) => getChanged(key, 1);
    const getChangedFull = (from, to) => coeffs.changed[`${from}${to}`] || 0;
    const model = {
        correct: {},
        lost: {},
        added: {},
        changed: {},
    };
    Object.keys(coeffs.correct).forEach((key) => {
        const correct = getCorrect(key);
        const added = getAdded(key);
        const changedTo = getChangedTo(key);
        const probability = correct / (correct + added + changedTo);
        model.correct[key] = probability;
    });
    Object.keys(coeffs.lost).forEach((key) => {
        const lost = getLost(key);
        const total = getTotal(key);
        const probability = lost / total;
        model.lost[key] = probability;
    });
    Object.keys(coeffs.added).forEach((key) => {
        const correct = getCorrect(key);
        const added = getAdded(key);
        const changedTo = getChangedTo(key);
        const probability = added / (correct + added + changedTo);
        model.added[key] = probability;
    });
    Object.keys(coeffs.changed).forEach((key) => {
        const from = key.charAt(0);
        const to = key.charAt(1);
        const changedFromTo = getChangedFull(from, to);
        const correct = getCorrect(to);
        const added = getAdded(to);
        const changedTo = getChangedTo(to);
        const probability = changedFromTo / (correct + added + changedTo);
        model.changed[key] = probability;
    });
    return model;
}
exports.default = generateModel;
