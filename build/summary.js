"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const d3 = __importStar(require("d3"));
const summary = (arr) => {
    arr.sort((a, b) => a - b);
    const mean = d3.mean(arr);
    const firstQuartile = d3.quantile(arr, 0.25);
    const median = d3.median(arr);
    const thirdQuartile = d3.quantile(arr, 0.75);
    const [min, max] = d3.extent(arr);
    const sum = d3.sum(arr);
    return {
        mean,
        firstQuartile,
        median,
        thirdQuartile,
        min,
        max,
        sum,
    };
};
exports.default = summary;
