import Async from 'hyper-async';
const { fromPromise, of } = Async;
import { fetchHistoricalPrice } from './fetch-historical-data.js';

export async function get24hPrice(input) {
  console.log('fetching 24 hour price', input);
  return of(input)
    .chain((input) => {
      return fromPromise(fetchHistoricalPrice)(input);
    })

    .fork(console.error, (result) => {
      console.log('original call result', result);
      return result;
    });
}

export async function getRemainingPriceHistory(input) {
  console.log('getRemainingPriceHistory', input);
  return (
    of(input)
      .chain((input) => {
        console.log('getRemainingPriceHistory1', input);

        return fromPromise(fetchHistoricalPrice)({
          coinChart: input,
          symbol: input.symbol,
          interval: '7d',
        });
      })

      .chain((input) =>
        fromPromise(fetchHistoricalPrice)({
          coinChart: input,
          symbol: input.symbol,
          interval: '1m',
        })
      )
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
