import coeffs from "./coefficients.json";

const getChanged = (char: string, i: number): number => {
  let count = 0;

  Object.keys(coeffs.changed).forEach((key) => {
    if (key.charAt(i) === char) {
      count += coeffs.changed[key];
    }
  });

  return count;
};

const getTotal = (key: string) => coeffs.total[key];
const getCorrect = (key: string) => coeffs.correct[key];
const getAdded = (key: string) => coeffs.added[key] || 0;
const getLost = (key: string) => coeffs.lost[key] || 0;
const getChangedFrom = (key: string) => getChanged(key, 0);
const getChangedTo = (key: string) => getChanged(key, 1);

const model = {
  correct: {},
  lost: {},
  added: {},
  changed: {},
};

// Object.keys(coeffs.correct).forEach((key) => {
//   const correct =
//   const correctCount = coeffs.correct[key];
//   const lostCount = coeffs.lost[key] || 0;
//   const addedCount = coeffs.added[key] || 0;
//   const changedCount = changedFrom(key);
//   const probability = (correctCount + lostCount) / coeffs.total[key];
//   model.correct[key] = probability;
// });

// const totalAdded = Object.values(coeffs.added).reduce(
//   (acc, curr) => acc + curr,
//   0
// );
// Object.keys(coeffs.added).forEach((key) => {
//   const probability =
// });

// console.log(model);

/** Check asserted relationship TOTAL = CORRECT + LOST + CHANGED_FROM */
Object.keys(coeffs.total).forEach((key) => {
  const total = getTotal(key);
  const correct = getCorrect(key);
  const lost = getLost(key);
  const changedFrom = getChangedFrom(key);

  const totalB = correct + lost + changedFrom;
  if (total !== totalB) {
    console.log(`Total for ${key} is ${total}, but estimated as ${totalB}`);
  }
});
