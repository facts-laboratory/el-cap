export interface CryptoData {
  id: string;
  symbol: string;
  provider: string;
  value: number;
  liteEvmSignature: string;
  permawebTx: string;
  version: string;
  source: {
    [key: string]: number;
  };
  timestamp: number;
  minutes: number;
  providerPublicKey: string;
}

export interface TokenData {
  symbol: string;
  value: number;
  name: string;
  image: string;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  '1h': number;
  '24h': number;
  '7d': number;
}

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
