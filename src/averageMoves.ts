import { Chess } from "chess.js";
import splitMoves from "./splitMoves";
import summary from "./summary";
import akopianGames from "./akopianGames.json";

const avgs = [];
const moveCounts = [];

for (const key in akopianGames) {
  const pgn = akopianGames[key];
  const chess = new Chess();
  const perMoveCount = [];

  const doubleMoves = splitMoves(pgn);

  const singleMoves = [];

  doubleMoves.forEach((doubleMove) => {
    singleMoves.push(...doubleMove.split(" "));
  });

  singleMoves.forEach((move) => {
    const { length } = chess.moves();
    perMoveCount.push(length);
    chess.move(move);
  });

  const moveCount = singleMoves.length;
  const { mean } = summary(perMoveCount);
  console.log(`Mean of game ${key} is ${mean} with move count ${moveCount}`);
  moveCounts.push(moveCount);
  avgs.push(mean);
}

console.log(summary(avgs));
console.log(summary(moveCounts));
