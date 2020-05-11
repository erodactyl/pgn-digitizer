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
const secondAbove10_json_1 = __importDefault(require("./secondAbove10.json"));
const getScannedGame_1 = __importDefault(require("./getScannedGame"));
const summary_1 = __importDefault(require("./summary"));
const getOutliers = (ids, debug) => __awaiter(void 0, void 0, void 0, function* () {
    const diffs = [];
    for (let id of ids) {
        const diff = yield getScannedGame_1.default(id, debug);
        console.log(`Game ${id} done with difference ${diff} \n`);
        diffs.push(diff);
    }
    console.log(summary_1.default(diffs));
});
getOutliers(secondAbove10_json_1.default.outliers.map((o) => o.id), true);
