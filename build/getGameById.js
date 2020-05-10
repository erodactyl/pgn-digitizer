"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const akopianGames_json_1 = __importDefault(require("./akopianGames.json"));
const getGameById = (id) => {
    return akopianGames_json_1.default[id];
};
exports.default = getGameById;
