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

export function TokenTable(props: TokenTableProps) {
  const { data, goToCoin } = props;
  const [tokenData, setTokenData] = useState<ProcessedTokenData[]>([]);

  useEffect(() => {
    console.log('data', data);
    if (data) {
      setTokenData(data);
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
          {tokenData &&
            tokenData?.map((entity, key) => {
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
                      src={entity.image}
                      alt={entity.name}
                      className="w-8 h-8 mr-2"
                    />
                    {entity.name}
                    <span className="text-gray-400 ml-2">{entity.coin}</span>
                  </td>
                  <td className="px-6 py-4">{entity.price.toLocaleString()}</td>
                  <td
                    className={`px-6 py-4 ${
                      entity['1h'] < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {entity['1h'].toFixed(4)}%
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      entity['24h'] < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {entity['24h'].toFixed(4)}%
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      entity['7d'] < 0 ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {entity['7d'].toFixed(4)}%
                  </td>

                  <td className="px-6 py-4">
                    ${entity.marketCap.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    ${entity.volume.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {entity.circulatingSupply.toLocaleString()}
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
