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
const fs_1 = __importDefault(require("fs"));
const testGames_json_1 = __importDefault(require("./testGames.json"));
const getScannedGame_1 = __importDefault(require("./getScannedGame"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let pgns = {};
    const keys = Object.keys(testGames_json_1.default);
    const batchSize = 20;
    const batchStarts = [];
    for (let left = 0; left < keys.length; left += batchSize) {
        batchStarts.push(left);
    }
    for (let left of batchStarts) {
        const currBatch = keys.slice(left, left + batchSize);
        yield Promise.all(currBatch.map((key) => __awaiter(void 0, void 0, void 0, function* () {
            const pgn = yield getScannedGame_1.default(key);
            pgns[key] = pgn;
        })));
        console.log(`Diffs for batch ${left}-${left + batchSize} `);
    }
    const json = JSON.stringify(pgns);
    fs_1.default.writeFile("testScans.json", json, () => { });
});
main();
