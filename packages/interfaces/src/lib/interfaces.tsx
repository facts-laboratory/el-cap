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
  
