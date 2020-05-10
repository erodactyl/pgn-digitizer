import * as d3 from "d3";

/**
 * Compute basic summary statistics.
 * @param arr
 */
const summary = (arr: number[]) => {
  arr.sort((a, b) => a - b);
  const mean = d3.mean(arr);
  const firstQuartile = d3.quantile(arr, 0.25);
  const median = d3.median(arr);
  const thirdQuartile = d3.quantile(arr, 0.75);
  const [min, max] = d3.extent(arr);
  const sum = d3.sum(arr);

  return {
    mean,
    firstQuartile,
    median,
    thirdQuartile,
    min,
    max,
    sum,
  };
};

export default summary;
