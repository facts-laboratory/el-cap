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

export type SearchCoin = {
  name: string;
  symbol: string;
  ranking: number;
  image: string;
};
export interface TopCoins {
  '7d': ProcessedTokenData[];
  '24h': ProcessedTokenData[];
  '1h': ProcessedTokenData[];
}

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

export type RedstoneObject = { [ticker: string]: unknown };
export type RemainingObject = {
  [index: string]: { symbol: string } & Record<string, unknown>;
};
