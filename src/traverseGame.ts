import { Chess, ChessInstance } from "chess.js";

/** Expensive cloning function, call at your own risk */
const clone = (orig: ChessInstance): ChessInstance => {
  const clonedGame = new Chess();
  clonedGame.load_pgn(orig.pgn());
  return clonedGame;
};

const THRESHOLD = 0.01;

type GetClosestTargets = (
  source: string,
  targets: string[],
  threshold: number
) => {
  target: string;
  dist: number;
}[];

interface GameWithDistance {
  game: ChessInstance;
  distance: number;
}

const getPossibleGames = (
  gameWithDistance: GameWithDistance,
  moveStr: string,
  getClosestTargets: GetClosestTargets
): GameWithDistance[] => {
  const legalMoves = gameWithDistance.game.moves();
  if (legalMoves.includes(moveStr)) {
    gameWithDistance.game.move(moveStr);
    return [gameWithDistance];
  } else {
    const closest = getClosestTargets(moveStr, legalMoves, THRESHOLD);
    return closest.map((m) => {
      const newGame = clone(gameWithDistance.game);
      newGame.move(m.target);
      const fullGame = {
        game: newGame,
        distance: gameWithDistance.distance + m.dist,
      };
      return fullGame;
    });
  }
};

const getClosestGame = (games: GameWithDistance[]): GameWithDistance => {
  if (games.length === 0) throw new Error("Empty");
  return games.reduce(
    (acc, g) => (g.distance < acc.distance ? g : acc),
    games[0]
  );
};

const traverseGame = (
  moves: string[],
  getClosestTargets: GetClosestTargets
) => {
  let games: GameWithDistance[] = [{ game: new Chess(), distance: 0 }];

  for (const currMove of moves) {
    const newPossibleGames: GameWithDistance[] = [];
    games.forEach((game) => {
      const possibleGames = getPossibleGames(game, currMove, getClosestTargets);
      newPossibleGames.push(...possibleGames);
    });

    const closestGame = getClosestGame(newPossibleGames);

    if (closestGame.distance > 10) {
      return moves;
    }

    games = newPossibleGames.filter(
      (g) => g.distance < closestGame.distance + THRESHOLD
    );
  }

  const closestGame = getClosestGame(games).game;

  return closestGame.history();
};

export default traverseGame;
