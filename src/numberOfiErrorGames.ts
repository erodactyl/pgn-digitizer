import thirdAnalysis from "./thirdAnalysis.json";

const numberOfiErrorGames = (is: number[], analysis?: number[]) => {
  let errors = new Array(is.length).fill(0);

  for (let game of analysis || thirdAnalysis.diffs) {
    for (let i of is) {
      if (game === i) {
        errors[i]++;
      }
    }
  }

  errors.forEach((err, idx) => {
    console.log(`Number of games with ${is[idx]} errors is ${err}`);
  });
};

// numberOfiErrorGames([0, 1]);

export default numberOfiErrorGames;
