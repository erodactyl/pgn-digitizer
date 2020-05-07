import scanImage from "./scanImage";
import splitMoves from "./splitMoves";
import traverseGame from "./traverseGame";

const main = async () => {
  const pgn = await scanImage(5);
  const moves = splitMoves(pgn);
  traverseGame(moves);
};

main();
