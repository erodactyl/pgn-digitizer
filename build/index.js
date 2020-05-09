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
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let diffs = [];
    const keys = Object.keys(akopianGames_json_1.default);
    const sliceLength = 20;
    const sliceStarts = [];
    for (let left = 0; left < keys.length; left += sliceLength) {
        sliceStarts.push(left);
    }
    for (let left of sliceStarts) {
        const currSlice = keys.slice(left, left + sliceLength);
        const currDiffs = yield Promise.all(currSlice.map((key) => __awaiter(void 0, void 0, void 0, function* () {
            const diff = yield run(Number(key));
            console.log(key, diff);
            return diff;
        })));
        diffs.push(...currDiffs);
    }
    console.log(diffs);
});
main();
