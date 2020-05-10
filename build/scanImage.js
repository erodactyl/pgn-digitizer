"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const scanImage = (path) => {
    return new Promise(function (res, rej) {
        const scanner = child_process_1.spawn("python", [path_1.default.join(__dirname, "../ocr.py"), path]);
        scanner.stdout.on("data", function (data) {
            res(data.toString());
        });
        scanner.stderr.on("data", (data) => {
            rej(data.toString());
        });
    });
};
exports.default = scanImage;
