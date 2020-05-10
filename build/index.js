"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scanImage_1 = __importDefault(require("./scanImage"));
const path_1 = __importDefault(require("path"));
const splitMoves_1 = __importDefault(require("./splitMoves"));
const fs_1 = __importDefault(require("fs"));
const summary_1 = __importDefault(require("./summary"));
const akopianGames_json_1 = __importDefault(require("./akopianGames.json"));
const moveDifferences = (scanned, real) => {
    let count = 0;
    for (let i = 0; i < scanned.length; i++) {
        if (scanned[i] !== real[i]) {
            count++;
        }
    }
    return count;
};
const getGame = (id) => {
    return akopianGames_json_1.default[id.toString()];
};
const run = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scannedPgn = yield scanImage_1.default(path_1.default.join(__dirname, "..", "images", `${id}.png`));
        const moves = splitMoves_1.default(scannedPgn);
        const realMoves = splitMoves_1.default(getGame(id));
        return moveDifferences(moves, realMoves);
    }
    catch (e) {
        console.error(e);
    }
});
const saveOutliers = (outliers) => {
    const obj = { outliers };
    const json = JSON.stringify(obj);
    fs_1.default.writeFile("outliers.json", json, () => { });
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let diffs = [];
    const keys = Object.keys(akopianGames_json_1.default);
    const batchSize = 20;
    const batchStarts = [];
    const outlierGames = [];
    for (let left = 0; left < keys.length; left += batchSize) {
        batchStarts.push(left);
    }
    for (let left of batchStarts) {
        const currBatch = keys.slice(left, left + batchSize);
        const currDiffs = yield Promise.all(currBatch.map((key) => __awaiter(void 0, void 0, void 0, function* () {
            const diff = yield run(Number(key));
            if (diff > 10) {
                console.log(`Difference for game ${key} is ${diff}`);
                outlierGames.push({ id: key, diff });
            }
            return diff;
        })));
        console.log(`Diffs for batch ${left}-${left + batchSize} are ${currDiffs}`);
        diffs.push(...currDiffs);
    }
    const diffsSummary = summary_1.default(diffs);
    console.log("\n\n");
    console.log(diffsSummary);
    saveOutliers(outlierGames);
    const json = JSON.stringify({ diffs });
    fs_1.default.writeFile("firstAnalysis.json", json, () => { });
});
main();
