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
const splitMoves_1 = __importDefault(require("./splitMoves"));
const traverseGame_1 = __importDefault(require("./traverseGame"));
const chess_js_1 = require("chess.js");
const leven_1 = __importDefault(require("leven"));
const game1 = "1.e4 e6 2.d4 d5 3.Nd2 Nf6 4.e5 Nfd7 5.f4 c5 6.c3 Nc6 7.Ndf3 cxd4 8.cxd4 f6 9.Bd3 Bb4+ 10.Bd2 Qb6 11.Ne2 fxe5 12.fxe5 O-O 13.a3 Be7 14.Qc2 Rxf3 15.gxf3 Nxd4 16.Nxd4 Qxd4 17.O-O-O Nxe5 18.Bxh7+ Kh8 19.Kb1 Qh4 20.Bc3 Bf6 21.f4 Nc4 22.Bxf6 Qxf6 23.Bd3 b5 24.Qe2 Bd7 25.Rhg1 Be8 26.Rde1 Bf7 27.Rg3 Rc8 28.Reg1 Nd6 29.Rxg7 Nf5 30.R7g5 Rc7 31.Bxf5 exf5 32.Rh5+";
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scannedPgn = yield scanImage_1.default(1);
        const moves = splitMoves_1.default(scannedPgn);
        const pgn = traverseGame_1.default(moves);
        const realGame = new chess_js_1.Chess();
        realGame.load_pgn(game1);
        const realPgn = realGame.pgn();
        console.log(pgn, "\n\n", realPgn);
        console.log(leven_1.default(pgn, realGame.pgn()));
    }
    catch (e) {
        console.error(e);
    }
});
main();
