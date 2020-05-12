import { Chess, ChessInstance } from "chess.js";

const move = (
  game: ChessInstance,
  moveStr: string,
  getClosestTarget: (
    source: string,
    targets: string[]
  ) => {
    target: string;
    dist: number;
  }
) => {
  const moved = game.move(moveStr);
  if (moved === null) {
    // console.log("here");
    const legalMoves = game.moves();
    const closestMove = getClosestTarget(moveStr, legalMoves);
    game.move(closestMove.target);
  }

  return game;
};

const traverseGame = (
  moves: string[],
  getClosestTarget: (
    source: string,
    targets: string[]
  ) => {
    target: string;
    dist: number;
  }
) => {
  const game = new Chess();

  moves.forEach((currMove) => {
    // console.log(currMove);
    move(game, currMove, getClosestTarget);
  });

  // console.log(game.pgn());

  return game.pgn();
};

export default traverseGame;
