import Async from 'hyper-async';
const { fromPromise, of } = Async;
import { fetchHistoricalPrice } from './fetch-historical-data.js';

export async function get24hPrice(input) {
  return of(input)
    .chain((input) => {
      return fromPromise(fetchHistoricalPrice)(input);
    })
    .map((result) => {
      input.coinChart = result;
      return input;
    })
    .fork(console.error, (result) => {
      return result;
    });
}

export async function getRemainingPriceHistory(input) {
  return (
    of(input)
      .chain((input) => fromPromise(fetchHistoricalPrice)(input))
      .map((result) => {
        input.coinChart = result;
        return input;
      })
      .chain((input) => fromPromise(fetchHistoricalPrice)(input))
      .map((result) => {
        return result;
      })
      // .chain((input) => fromPromise(fetchHistoricalPrice)(input))
      // .map((result) => {
      //   input.coinChart = result;
      //   return input;
      // })
      // .chain((input) => fromPromise(fetchHistoricalPrice)(input))
      // .map((result) => {
      //   input.coinChart = result;
      //   return input;
      // })
      .fork(console.error, (result) => result)
  );
}
