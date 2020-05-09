import { Chess, ChessInstance, Move } from "chess.js";
import leven from "leven";

const getClosestMove = (illegalStr: string, legalMoves: string[]) => {
  const movesByCloseness = legalMoves.map((move) => {
    const dist = leven(illegalStr, move);
    return { move, dist };
  });

  movesByCloseness.sort((a, b) => {
    if (a.dist > b.dist) return 1;
    else if (a.dist < b.dist) return -1;
    return 0;
  });

  return movesByCloseness[0].move;
};

const move = (game: ChessInstance, moveStr: string) => {
  try {
    const moved = game.move(moveStr);
    if (moved === null) {
      throw new Error("Illegal move");
    }
    return moved;
  } catch (e) {
    const legalMoves = game.moves();
    const closestMove = getClosestMove(moveStr, legalMoves);
    const moved = game.move(closestMove);

    return moved;
  }
};

const traverseGame = (moves: string[]) => {
  // console.log(moves);
  const game = new Chess();

  moves.forEach((currMove) => {
    // console.log(move);
    move(game, currMove);
  });

  return game.pgn();
};

export default traverseGame;
