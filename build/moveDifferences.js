"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moveDifferences = (scanned, real) => {
    let count = 0;
    for (let i = 0; i < real.length; i++) {
        if (scanned[i] !== real[i]) {
            console.log(`Scanned is: ${scanned[i]} with length ${scanned[i].length}`);
            console.log(`Real is: ${real[i]} with length ${real[i].length}`);
            console.log("\n");
            count++;
        }
    }
    return count;
};
exports.default = moveDifferences;
