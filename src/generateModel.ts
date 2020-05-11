interface Coefficients {
  correct: Record<string, number>;
  lost: Record<string, number>;
  added: Record<string, number>;
  changed: Record<string, number>;
  total: Record<string, number>;
}

function generateModel(coeffs: Coefficients) {
  const getChanged = (char: string, i: number): number => {
    let count = 0;

    Object.keys(coeffs.changed).forEach((key) => {
      if (key.charAt(i) === char) {
        count += coeffs.changed[key];
      }
    });

    return count;
  };

  const getTotal = (key: string) => coeffs.total[key] || 0;
  const getCorrect = (key: string) => coeffs.correct[key] || 0;
  const getAdded = (key: string) => coeffs.added[key] || 0;
  const getLost = (key: string) => coeffs.lost[key] || 0;
  const getChangedFrom = (key: string) => getChanged(key, 0);
  const getChangedTo = (key: string) => getChanged(key, 1);
  const getChangedFull = (from: string, to: string) =>
    coeffs.changed[`${from}${to}`] || 0;

  const model = {
    correct: {},
    lost: {},
    added: {},
    changed: {},
  };

  Object.keys(coeffs.correct).forEach((key) => {
    const correct = getCorrect(key);
    const added = getAdded(key);
    const changedTo = getChangedTo(key);
    const probability = correct / (correct + added + changedTo);
    model.correct[key] = probability;
  });

  Object.keys(coeffs.lost).forEach((key) => {
    const lost = getLost(key);
    const total = getTotal(key);
    const probability = lost / total;
    model.lost[key] = probability;
  });

  Object.keys(coeffs.added).forEach((key) => {
    const correct = getCorrect(key);
    const added = getAdded(key);
    const changedTo = getChangedTo(key);
    const probability = added / (correct + added + changedTo);
    model.added[key] = probability;
  });

  Object.keys(coeffs.changed).forEach((key) => {
    const from = key.charAt(0);
    const to = key.charAt(1);
    const changedFromTo = getChangedFull(from, to);
    const correct = getCorrect(to);
    const added = getAdded(to);
    const changedTo = getChangedTo(to);
    const probability = changedFromTo / (correct + added + changedTo);
    model.changed[key] = probability;
  });

  return model;

  /** Check asserted relationship TOTAL = CORRECT + LOST + CHANGED_FROM */
  // Object.keys(coeffs.total).forEach((key) => {
  //   const total = getTotal(key);
  //   const correct = getCorrect(key);
  //   const lost = getLost(key);
  //   const changedFrom = getChangedFrom(key);

  //   const totalB = correct + lost + changedFrom;
  //   if (total !== totalB) {
  //     console.log(`Total for ${key} is ${total}, but estimated as ${totalB}`);
  //   }
  // });
}

export default generateModel;
