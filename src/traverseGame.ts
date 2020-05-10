import { Chess, ChessInstance } from "chess.js";
import { getClosestTarget } from "./getEditDistance";

/** Run only in case of an error. Get next 2 moves
 * (can be up to about 10000 elements in extremely rare cases) for higher fidelity results
 **/
const getLegalDoubleMovesFromPosition = (game: ChessInstance) => {
  const currMoves = game.moves();
  const doubleMoves: string[] = [];

  currMoves.forEach((currMove) => {
    game.move(currMove);
    const secondMoves = game.moves();
    const currDoubleMoves = secondMoves.map((sm) => `${currMove} ${sm}`);
    doubleMoves.push(...currDoubleMoves);
    game.undo();
  });

  return doubleMoves;
};

const move = (game: ChessInstance, doubleMoveStr: string) => {
  const singleMoves = doubleMoveStr.split(" ");
  try {
    // Play move 1
    const moved = game.move(singleMoves[0]);
    if (moved === null) {
      // Error correct both moves
      throw new Error("Illegal first move");
    }

    // Play move 2
    const secondMoved = game.move(singleMoves[1]);
    if (secondMoved === null) {
      // Error correct only move 2
      throw new Error("Illegal second move");
    }
    return game;
  } catch (e) {
    if (e.message === "Illegal first move") {
      const legalMoves = getLegalDoubleMovesFromPosition(game);
      const closestMoves = getClosestTarget(doubleMoveStr, legalMoves);
      const singleMoves = closestMoves.target.split(" ");
      console.log(`Swapping out ${doubleMoveStr} for ${closestMoves.target}`);
      game.move(singleMoves[0]);
      game.move(singleMoves[1]);
    } else if (e.message === "Illegal second move") {
      const legalMoves = game.moves();
      const closestMove = getClosestTarget(singleMoves[1], legalMoves);
      game.move(closestMove.target);
    }

    return game;
  }
};

const traverseGame = (moves: string[]) => {
  const game = new Chess();

  moves.forEach((currMove) => {
    move(game, currMove);
  });

  console.log(game.pgn());

  return game.pgn();
};

export default traverseGame;
