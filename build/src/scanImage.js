"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const scanImage = (path) => {
    return new Promise(function (res, rej) {
        const scanner = child_process_1.spawn("python", ["./ocr.py", path]);
        scanner.stdout.on("data", function (data) {
            res(data.toString());
        });
        scanner.stderr.on("data", (data) => {
            rej(data.toString());
        });
    });
};
exports.default = scanImage;
