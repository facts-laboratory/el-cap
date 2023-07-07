import { fetchData } from './fetch';

export async function fetchMarketData() {
  const url = `https://api.coingecko.com/api/v3/global`;

  try {
    const response = await fetchData(url);
    const data = await response.json();
    console.log('data', data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
}
