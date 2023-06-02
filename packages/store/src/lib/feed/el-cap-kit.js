// FILE NEEDS TO BE REMOVED AND REPLACED WITH KIT FUNCTION
import Async from 'hyper-async';
const { fromPromise, of } = Async;
import { fetchRedstonePrices, fetchRemainingData } from './fetch-prices.js';

export async function getPrices() {
  return of()
    .chain((input) => fromPromise(fetchRedstonePrices)(input))
    .chain((input) => fromPromise(fetchRemainingData)(input))
    .fork(console.error, (combinedResult) => {
      return combinedResult;
    });
}
