import thirdAnalysis from "./thirdAnalysis.json";

const numberOfiErrorGames = (is: number[]) => {
  let errors = new Array(is.length).fill(0);

  for (let game of thirdAnalysis.diffs) {
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

numberOfiErrorGames([0, 1]);
