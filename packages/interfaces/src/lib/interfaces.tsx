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
  watchlist?: boolean;
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

export interface CrewMember {
  watchlist: string[];
}

export interface CrewState {
  cachedValue: {
    state: {
      crew: CrewMember;
    };
  };
}
export interface User {
  contract_id: string;
  email: string;
  email_verified: string;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  nickname: string;
  picture: string;
  sub: string;
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

export interface CachedValue {
  state: unknown;
}

export interface ReadContractResult {
  cachedValue: CachedValue;
}

export interface ReadContractStateResult {
  readContract: ReadContractResult;
  result: {
    status: number;
    statusText: string;
  };
}

export interface State {
  coins: ProcessedTokenData[];
  watchlist: any;
}

export interface ProcessedMarketData {
  marketCapInUSD: number;
  volumeInUSD: number;
  marketCapChangePercentage: number;
  marketCapBtcPercentage: number;
  marketCapEthPercentage: number;
}

export interface MarketData {
  active_cryptocurrencies?: number;
  ended_icos?: number;
  market_cap_change_percentage_24h_usd?: number;
  market_cap_percentage?: MarketCapPercentage;
  markets?: number;
  ongoing_icos?: number;
  total_market_cap?: MarketCap;
  total_volume?: MarketCap;
}

interface MarketCapPercentage {
  ada?: number;
  bnb?: number;
  btc?: number;
  doge?: number;
  eth?: number;
  sol?: number;
  steth?: number;
  usdc?: number;
  usdt?: number;
  xrp?: number;
}

interface MarketCap {
  aed?: number;
  usd?: number;
  btc?: number;
  eth?: number;
}
