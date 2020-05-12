import { Chess, ChessInstance } from "chess.js";

type GetClosestTarget = (
  source: string,
  targets: string[]
) => {
  target: string;
  dist: number;
};

const move = (
  game: ChessInstance,
  moveStr: string,
  getClosestTarget: GetClosestTarget
) => {
  let dist = 0;
  const moved = game.move(moveStr);
  if (moved === null) {
    // console.log("here");
    const legalMoves = game.moves();
    const closestMove = getClosestTarget(moveStr, legalMoves);
    game.move(closestMove.target);
    dist = closestMove.dist;
  }

  return dist;
};

const traverseGame = (moves: string[], getClosestTarget: GetClosestTarget) => {
  let totalDist = 0;
  const game = new Chess();

  for (const currMove of moves) {
    totalDist += move(game, currMove, getClosestTarget);
    if (totalDist > 10) {
      break;
    }
  }

  if (totalDist > 10) {
    return moves;
  }

  return game.history();
};

export default traverseGame;
