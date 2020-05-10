"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const saveOutliers = (outliers) => {
    const obj = { outliers };
    const json = JSON.stringify(obj);
    fs_1.default.writeFile("outliers.json", json, () => { });
};
exports.default = saveOutliers;
