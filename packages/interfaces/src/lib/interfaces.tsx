export interface ProcessedTokenData {
  name: string;
  image: string;
  coin: string;
  price: number;
  marketCap: number;
  volume: number;
  circulatingSupply: number;
  '1h': number;
  '24h': number;
  '7d': number;
}

export enum SortKey {
  NAME = 'name',
  IMAGE = 'image',
  COIN = 'coin',
  PRICE = 'price',
  MARKET_CAP = 'marketCap',
  VOLUME = 'volume',
  CIRCULATING_SUPPLY = 'circulatingSupply',
  ONE_HOUR = '1h',
  TWENTY_FOUR_HOURS = '24h',
  SEVEN_DAYS = '7d',
}

export type RedstoneObject = { [ticker: string]: unknown };
export type RemainingObject = {
  [index: string]: { symbol: string } & Record<string, unknown>;
};
