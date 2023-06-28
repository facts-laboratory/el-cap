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

export interface ContractCoin {
  name: string;
  symbol: string;
}

export interface TopCoins {
  '7d': ProcessedTokenData[];
  '24h': ProcessedTokenData[];
  '1h': ProcessedTokenData[];
}
export type HistoricalDataPoint = {
  timestamp: number;
  value: number;
};

export type ChartHistoricalDataPoint = {
  time: number;
  value: number;
};

export enum SortKey {
  NAME = 'name',
  IMAGE = 'image',
  COIN = 'coin',
  PRICE = 'price',
  MARKET_CAP = 'marketCap',
  VOLUME = 'volume',
  CIRCULATING_SUPPLY = 'circulatingSupply',
  LOSERS = 'losers',
  ONE_HOUR = '1h',
  TWENTY_FOUR_HOURS = '24h',
  SEVEN_DAYS = '7d',
}

export interface ChartData {
  [timeRange: string]: HistoricalDataPoint[];
}

export enum LoadingStatus {
  LOADED = 'loaded',
  LOADING = 'loading',
  NOT_LOADED = 'not loaded',
}

export enum TimeRange {
  DAY_1 = '24h',
  DAY_7 = '7d',
  MONTH_1 = '1m',
  MONTH_3 = '3m',
  YEAR_1 = '1y',
}

export type RedstoneObject = { [ticker: string]: unknown };
export type RemainingObject = {
  [index: string]: { symbol: string } & Record<string, unknown>;
};
