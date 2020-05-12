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
const getGameById_1 = __importDefault(require("./getGameById"));
const moveDifferences_1 = __importDefault(require("./moveDifferences"));
const getScannedGame = (id, debug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scannedPgn = yield scanImage_1.default(path_1.default.join(__dirname, "..", "testImages", `${id}.png`));
        return scannedPgn;
        const moves = splitMoves_1.default(scannedPgn);
        const realMoves = splitMoves_1.default(getGameById_1.default(id));
        if (debug) {
            console.log("Scanned: ", scannedPgn, "\n");
            console.log("Real: ", getGameById_1.default(id), "\n");
            for (let i = 0; i < Math.max(moves.length, realMoves.length); i++) {
            }
        }
        return moveDifferences_1.default(moves, realMoves);
    }
    catch (e) {
        console.error(e);
    }
});
exports.default = getScannedGame;
