import { useEffect, useState } from 'react';
import styles from './token-table.module.css';
import BitcoinSVG from '../assets/svg/bitcoin.svg';
import { WatchlistIcon } from '../assets/icons';
import { ProcessedTokenData, TokenData } from '@el-cap/interfaces';

/* eslint-disable-next-line */
export interface TokenTableProps {}

export const orderByMarketCap = (data: ProcessedTokenData[]) => {
  return data.sort((a, b) => b.marketCap - a.marketCap);
};

export const getTokenData = (data: TokenData[]): ProcessedTokenData[] => {
  console.log('data', data);
  return data.map((token, index) => {
    const {
      symbol,
      value,
      name,
      image,
      price_change_percentage_1h_in_currency,
      price_change_percentage_24h_in_currency,
      price_change_percentage_7d_in_currency,
      current_price,
      market_cap,
      total_volume,
      circulating_supply,
      ...rest
    } = token;

    return {
      name: name || '',
      image: image || '',
      coin: symbol || '',
      price: current_price || 0,
      marketCap: market_cap || 0,
      volume: total_volume || 0,
      circulatingSupply: circulating_supply || 0,
      '1h': price_change_percentage_1h_in_currency || 0,
      '24h': price_change_percentage_24h_in_currency || 0,
      '7d': price_change_percentage_7d_in_currency || 0,
    };
  });
};

export function TokenTable(props: TokenTableProps) {
  const { data, goToCoin } = props;
  const [tokenData, setTokenData] = useState<ProcessedTokenData[]>([]);

  useEffect(() => {
    console.log('data', data);
    if (data) {
      setTokenData(orderByMarketCap(getTokenData(data)));
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
          {data?.map((val, key) => {
            return (
              <tr className="bg-gray-100 border-b font-bold" key={key}>
                <th scope="row" className="px-6 py-4">
                  <WatchlistIcon className="mr-1" width={24} height={24} />
                </th>
                <td className="px-6 py-4 flex items-center my-4">
                  <img className="w-6 mr-2" src={BitcoinSVG} alt="bitcoin" />
                  Bitcoin
                  <span className="text-gray-400 ml-2">{val.coin}</span>
                </td>
                <td className="px-6 py-4">{val.price.toLocaleString()}</td>
                <td className="px-6 py-4 text-green-500">{val['1h']}%</td>
                <td className="px-6 py-4 text-green-500">{val['24h']}%</td>
                <td className="px-6 py-4 text-green-500">{val['7d']}%</td>
                <td className="px-6 py-4">${val.marketCap.toLocaleString()}</td>
                <td className="px-6 py-4">${val.volume.toLocaleString()}</td>
                <td className="px-6 py-4">
                  ${val.circulatingSupply.toLocaleString()}
                </td>
                <td className="px-6 py-4 cursor-pointer">
                  <img
                    className="text-teal-400"
                    style={{
                      filter:
                        'hue-rotate(85deg) saturate(80%) brightness(0.85)',
                    }}
                    src={val.graphSrc}
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
