import { useEffect, useState } from 'react';
import styles from './token-table.module.css';
import BitcoinSVG from '../assets/svg/bitcoin.svg';
import { WatchlistIcon } from '../assets/icons';
import { TokenData } from '@el-cap/interfaces';

/* eslint-disable-next-line */
export interface TokenTableProps {}

const getDummyData = (index: number) => {
  console.log('getDummyData');
  const dummyIndex = index % dummyData.length;
  return dummyData[dummyIndex];
};

export const getTokenData = (data: TokenData[]) => {
  console.log('data', data);
  return data.map((token, index) => {
    const dummyToken = getDummyData(index);
    const {
      symbol,
      value,
      marketCap,
      volume,
      circulatingSupply,
      graphSrc,
      ...rest
    } = token;
    const {
      '1h': h1,
      '24h': h24,
      '7d': d7,
    } = Object.keys(rest).reduce((acc, key) => {
      if (['1h', '24h', '7d'].includes(key)) {
        acc[key] = token[key];
      }
      return acc;
    }, {});

    if (
      symbol &&
      value &&
      marketCap &&
      volume &&
      circulatingSupply &&
      graphSrc &&
      ['1h', '24h', '7d'].every((key) => key in token)
    ) {
      return token;
    } else {
      return {
        coin: symbol || dummyToken.coin,
        price: value || dummyToken.price,
        marketCap: marketCap || dummyToken.marketCap,
        volume: volume || dummyToken.volume,
        circulatingSupply: circulatingSupply || dummyToken.circulatingSupply,
        graphSrc: graphSrc || dummyToken.graphSrc,
        '1h': token['1h'] || dummyToken['1h'],
        '24h': token['24h'] || dummyToken['24h'],
        '7d': token['7d'] || dummyToken['7d'],
      };
    }
  });
};

const dummyData = [
  {
    coin: 'BTC',
    price: 2801346,
    '1h': 0.01,
    '24h': 0.02,
    '7d': 13.51,
    marketCap: 541335905352,
    volume: 36421460548,
    circulatingSupply: 19324137,
    graphSrc:
      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg',
  },
  {
    coin: 'ETH',
    price: 32145,
    '1h': 0.015,
    '24h': -0.025,
    '7d': 9.23,
    marketCap: 36422495153,
    volume: 2354346553,
    circulatingSupply: 214553124,
    graphSrc:
      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/1027/1.svg',
  },
  {
    coin: 'DOGE',
    price: 0.052,
    '1h': 0.02,
    '24h': -0.005,
    '7d': 11.46,
    marketCap: 123423551,
    volume: 142356545,
    circulatingSupply: 2364749810,
    graphSrc:
      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/74/1.svg',
  },
  {
    coin: 'ADA',
    price: 1.45,
    '1h': -0.01,
    '24h': 0.035,
    '7d': 6.14,
    marketCap: 46648597347,
    volume: 1161254368,
    circulatingSupply: 32862965419,
    graphSrc:
      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2010/1.svg',
  },
  {
    coin: 'XRP',
    price: 0.958,
    '1h': -0.02,
    '24h': 0.015,
    '7d': 3.27,
    marketCap: 43626864349,
    volume: 482365928,
    circulatingSupply: 45404028640,
    graphSrc:
      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/52/1.svg',
  },
  {
    coin: 'BNB',
    price: 356.53,
    '1h': 0.03,
    '24h': -0.025,
    '7d': 10.92,
    marketCap: 5489157234,
    volume: 235436766,
    circulatingSupply: 15434477,
    graphSrc:
      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/1839/1.svg',
  },
  {
    coin: 'SOL',
    price: 54.85,
    '1h': -0.02,
    '24h': 0.05,
    '7d': 23.67,
    marketCap: 1442535467,
    volume: 168435343,
    circulatingSupply: 26258344,
    graphSrc:
      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/5426/1.svg',
  },
];
export function TokenTable(props: TokenTableProps) {
  const { data, goToCoin } = props;
  const [tokenData, setTokenData] = useState<TokenData[]>([]);

  useEffect(() => {
    console.log('data', data);
    if (data) {
      setTokenData(getTokenData(data));
    }
  }, [data]);
  return (
    <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-gray-700 bg-white font-bold">
          <tr>
            <th scope="col" className="px-6 py-5"></th>
            <th scope="col" className="px-6 py-5">
              Coin
            </th>
            <th scope="col" className="px-6 py-5">
              Price
            </th>
            <th scope="col" className="px-6 py-5">
              1h%
            </th>
            <th scope="col" className="px-6 py-5">
              24h%
            </th>
            <th scope="col" className="px-6 py-5">
              7d%
            </th>
            <th scope="col" className="px-6 py-5">
              Market Cap
            </th>
            <th scope="col" className="px-6 py-5">
              Volume (24hr)
            </th>
            <th scope="col" className="px-6 py-5">
              Circulating Supply
            </th>
            <th scope="col" className="px-6 py-5 min-w-[200px]">
              Last 7 Days
            </th>
          </tr>
        </thead>
        <tbody>
          {tokenData && tokenData?.map((entity, key) => {
            return (
              <tr
                onClick={() => goToCoin(entity.coin, entity)}
                className="bg-gray-100 border-b font-bold"
                key={key}
              >
                <th scope="row" className="px-6 py-4">
                  <WatchlistIcon className="mr-1" width={24} height={24} />
                </th>
                <td className="px-6 py-4 flex items-center my-4">
                  <img
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/24029.png"
                    alt={entity.name}
                    className="w-8 h-8 mr-2"
                  />
                  {entity.coin.toLocaleString()}
                  <span className="text-gray-400 ml-2">{entity.coin}</span>
                </td>
                <td className="px-6 py-4">{entity.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-green-500">{entity['1h']}%</td>
                <td className="px-6 py-4 text-green-500">{entity['24h']}%</td>
                <td className="px-6 py-4 text-green-500">{entity['7d']}%</td>
                <td className="px-6 py-4">
                  ${entity.marketCap.toLocaleString()}
                </td>
                <td className="px-6 py-4">${entity.volume}</td>
                <td className="px-6 py-4">
                  ${entity.circulatingSupply.toLocaleString()}
                </td>
                <td className="px-6 py-4 cursor-pointer">
                  <img
                    className="text-teal-400"
                    style={{
                      filter:
                        'hue-rotate(85deg) saturate(80%) brightness(0.85)',
                    }}
                    src={
                      'https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/1.svg'
                    }
                    alt=""
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TokenTable;
