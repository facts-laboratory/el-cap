import { memo, useEffect, useState } from 'react';
import styles from './token-table.module.css';
import BitcoinSVG from '../assets/svg/bitcoin.svg';
import { WatchlistIcon } from '../assets/icons';
import { ProcessedTokenData } from '@el-cap/interfaces';

/* eslint-disable-next-line */
export interface TokenTableProps {
  data: ProcessedTokenData[];
  goToCoin: (coin: string, entity: ProcessedTokenData) => void;
  addToWatchlist: (coin: string) => void;
}

export const orderByMarketCap = (data: ProcessedTokenData[]) => {
  return data.sort((a, b) => b.marketCap - a.marketCap);
};

export const TokenTable = memo((props: TokenTableProps) => {
  const { data, goToCoin, addToWatchlist } = props;
  const [tokenData, setTokenData] = useState<ProcessedTokenData[]>([]);
  const [page, setPage] = useState(1);
  const [displayEntities, setDisplayEntities] = useState<ProcessedTokenData[]>(
    []
  );

  const [watchlist, setWatchlist] = useState<
    Record<string, boolean | undefined>
  >({});

  // Whenever data changes, update the watchlist state
  useEffect(() => {
    if (data) {
      setPage(1);
      setDisplayEntities(data.slice(0, 30));
      setTokenData(data);

      // Reset watchlist
      const newWatchlist: Record<string, boolean | undefined> = {};
      data.forEach((coin: ProcessedTokenData) => {
        // Use the watchlist property of each coin to set the watchlist state
        newWatchlist[coin.coin] = coin.watchlist;
      });
      setWatchlist(newWatchlist);
    }
  }, [data]);

  // Function to handle adding to watchlist
  const handleAddToWatchlist = (coin: string) => {
    setWatchlist({
      ...watchlist,
      [coin]: !watchlist[coin],
    });
    addToWatchlist(coin);
  };

  // Assumed existing state:
  // const [loadingStatus, setLoadingStatus] = useState('idle');

  useEffect(() => {
    const handleScroll = () => {
      const distanceFromBottom =
        document.body.scrollHeight - (window.innerHeight + window.pageYOffset);
      const isBottomReached =
        distanceFromBottom < document.body.scrollHeight * 0.2;

      if (isBottomReached) {
        // Start loading
        // setLoadingStatus('loading'); // This line can be uncommented if you have a loading status state.

        setTimeout(() => {
          // After a delay of 500ms (0.5 seconds), increment the page.
          // This will give a momentary effect of loading.
          setPage((prevPage) => prevPage + 1);
          // Stop loading
          // setLoadingStatus('idle'); // This line can be uncommented if you have a loading status state.
        }, 800);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (data) {
      const nextEntities = data.slice(page * 30, (page + 1) * 30);
      setDisplayEntities((prevEntities) => [...prevEntities, ...nextEntities]);
    }
  }, [page, data]);

  return (
    <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-gray-700 bg-white font-bold">
          <tr>
            <th scope="col" className="px-6 py-5"></th>
            <th scope="col" className="px-6 py-5">
              Rank
            </th>
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
          {displayEntities &&
            displayEntities.map((entity, key) => {
              return (
                <tr className="bg-gray-100 border-b font-bold" key={key}>
                  <th
                    onClick={() => handleAddToWatchlist(entity.coin)}
                    scope="row"
                    className="px-6 py-4"
                  >
                    <WatchlistIcon
                      isOnWatchlist={watchlist[entity.coin]}
                      className="mr-1"
                      width={24}
                      height={24}
                    />
                  </th>
                  <td className="px-6 py-4">{key + 1}</td>
                  <td
                    className="px-6 py-4 flex items-center my-4 cursor-pointer"
                    onClick={() => goToCoin(entity.coin, entity)}
                  >
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
});

export default TokenTable;
