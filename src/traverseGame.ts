import { Chess, ChessInstance } from "chess.js";

const clone = <T>(orig: T): T =>
  Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);

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
    const newGame = clone(gameWithDistance.game);
    newGame.move(moveStr);
    const fullGame: GameWithDistance = {
      game: newGame,
      distance: gameWithDistance.distance,
    };
    return [fullGame];
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

    const closestDist = newPossibleGames.reduce(
      (acc, g) => (g.distance < acc ? g.distance : acc),
      100000
    );

    if (closestDist > 10) {
      return moves;
    }

    games = newPossibleGames.filter(
      (g) => g.distance < closestDist + THRESHOLD
    );
  }

  return games[0].game.history();
};

export default traverseGame;
