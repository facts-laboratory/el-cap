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
  coin: string;
  price: number;
  marketCap: number;
  volume: number;
  circulatingSupply: number;
  graphSrc: string;
  '1h': number;
  '24h': number;
  '7d': number;
}
