import { Chess, ChessInstance } from "chess.js";
import { getClosestTarget } from "./getEditDistance";

const move = (game: ChessInstance, moveStr: string) => {
  const moved = game.move(moveStr);
  if (moved === null) {
    // console.log("here");
    const legalMoves = game.moves();
    const closestMove = getClosestTarget(moveStr, legalMoves);
    game.move(closestMove.target);
  }

  return game;
};

const traverseGame = (moves: string[]) => {
  const game = new Chess();

  moves.forEach((currMove) => {
    // console.log(currMove);
    move(game, currMove);
  });

  // console.log(game.pgn());

  return game.pgn();
};

export default traverseGame;
