import akopianGames from "./akopianGames.json";

const getGameById = (id: string) => {
  return akopianGames[id];
};

export default getGameById;
