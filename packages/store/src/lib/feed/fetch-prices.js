// FILE NEEDS TO BE REMOVED AND REPLACED WITH KIT FUNCTION
import { fetchData } from './fetch.js';

export async function fetchRedstonePrices(input = {}) {
  const { symbols = [], names = [] } = input;
  const symbolsQuery =
    symbols.length > 0 ? `symbols=${symbols.join(',')}&` : '';
  const url = `https://api.redstone.finance/prices?${symbolsQuery}provider=redstone`;

  try {
    const response = await fetchData(url);
    console.log('response', response);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return { prices: data, symbols, names };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchRemainingPrices(input = {}) {
  const { prices = {}, names = ['bitcoin, ethereum, tether'] } = input;
  const namesQuery =
    names.length > 0 ? `ids=${names.join(',').replace(/\s/g, '')}&` : '';
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&${namesQuery}order=market_cap_desc&page=4&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`;

  try {
    const response = await fetchData(url);
    const data = await response.json();
    const combinedResult = {
      redstone: prices,
      remaining: data,
    };
    return combinedResult;
  } catch (error) {
    console.error(error);
    return { redstone: prices, remaining: {} }; // if fetch fails, return the data from fetchRedstonePrices
  }
}
export async function fetchRedstonePrice(input) {
  const { symbol, name } = input;
  const url = `https://api.redstone.finance/prices?symbol=${symbol.toUpperCase()}&provider=redstone&limit=1`;
  try {
    const response = await fetchData(url);
    if (!response.ok) {
      return null;
    }

    const redstone = await response.json();

    return { redstone, symbol, name };
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function fetchRemainingPrice({ symbol, name, redstone }) {
  const url = `https://api.coingecko.com/api/v3/coins/${name.toLowerCase()}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

  try {
    const response = await fetchData(url);
    const data = await response.json();
    const combinedResult = {
      redstone: redstone[0],
      remaining: data,
    };
    return combinedResult;
  } catch (error) {
    return { redstone, remaining: {} }; // if fetch fails, return the data from fetchRedstonePrices
  }
}
