"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moveDifferences = (scanned, real) => {
    let count = 0;
    for (let i = 0; i < real.length; i++) {
        if (scanned[i] !== real[i]) {
            count++;
        }
    }
    return count;
};
exports.default = moveDifferences;
