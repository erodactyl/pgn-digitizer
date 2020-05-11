"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const coefficients_json_1 = __importDefault(require("./coefficients.json"));
const getChanged = (char, i) => {
    let count = 0;
    Object.keys(coefficients_json_1.default.changed).forEach((key) => {
        if (key.charAt(i) === char) {
            count += coefficients_json_1.default.changed[key];
        }
    });
    return count;
};
const getTotal = (key) => coefficients_json_1.default.total[key];
const getCorrect = (key) => coefficients_json_1.default.correct[key];
const getAdded = (key) => coefficients_json_1.default.added[key] || 0;
const getLost = (key) => coefficients_json_1.default.lost[key] || 0;
const getChangedFrom = (key) => getChanged(key, 0);
const getChangedTo = (key) => getChanged(key, 1);
const model = {
    correct: {},
    lost: {},
    added: {},
    changed: {},
};
Object.keys(coefficients_json_1.default.total).forEach((key) => {
    const total = getTotal(key);
    const correct = getCorrect(key);
    const lost = getLost(key);
    const changedFrom = getChangedFrom(key);
    const totalB = correct + lost + changedFrom;
    if (total !== totalB) {
        console.log(`Total for ${key} is ${total}, but estimated as ${totalB}`);
    }
});
