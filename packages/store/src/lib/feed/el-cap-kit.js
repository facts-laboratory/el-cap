// FILE NEEDS TO BE REMOVED AND REPLACED WITH KIT FUNCTION
import Async from 'hyper-async';
const { fromPromise, of } = Async;
import {
  fetchRedstonePrice,
  fetchRedstonePrices,
  fetchRemainingPrice,
  fetchRemainingPrices,
} from './fetch-prices.js';
import { fetchHistoricalPrice } from '../coin-chart/fetch-historical-data.js';
import { fetchMarketData } from './fetch-market-data.js';

export async function getPrices(input) {
  return of(input)
    .chain((input) => fromPromise(fetchRedstonePrices)(input))
    .chain((input) => fromPromise(fetchRemainingPrices)(input))
    .fork(console.error, (combinedResult) => {
      return combinedResult;
    });
}

export async function getCoin(input) {
  return of(input)
    .chain((input) => fromPromise(fetchRedstonePrice)(input))
    .chain((input) => fromPromise(fetchRemainingPrice)(input))
    .fork(console.error, (combinedResult) => {
      return combinedResult;
    });
}
export async function get24hPrice(input) {
  return of(input)
    .chain((input) => {
      return fromPromise(fetchHistoricalPrice)(input);
    })

    .fork(console.error, (result) => {
      return result;
    });
}

export async function getRemainingPriceHistory(input) {
  return (
    of(input)
      .chain((input) => {
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

export async function getMarketData() {
  return of()
    .chain(() => fromPromise(fetchMarketData)())
    .fork(console.error, (result) => {
      return result;
    });
}
