import { useEffect, useState } from 'react';

import { mapStateToProps } from '@el-cap/store';
import { ChartWidget } from '@el-cap/chart-widget';
import { connect } from 'react-redux';
import { PriceData } from 'redstone-api/lib/types';
import { ArrowUpIcon, WatchlistIcon } from '../assets/icons';
import BitcoinSVG from '../assets/svg/bitcoin.svg';
import GrayButton from '../assets/component/GrayButton';
import { ProcessedTokenData, TokenData } from '@el-cap/interfaces';
import { ArrowDownIcon } from 'packages/widget-coin-card/src/icons';

interface CoinProps {
  goToFeed: () => void;
  entity?: ProcessedTokenData;
  ticker: string;
  coinPage: {
    coinChartProps: {
      fetch: (input: { symbol: string; interval: string }) => void;
      fetchRemaining: (input: { symbol: string; interval: string }) => void;
      chart24hourData: PriceData | undefined;
    };
  };
}

enum TimeRange {
  DAY_1 = '24h',
  DAY_7 = '7d',
  MONTH_1 = '1m',
  MONTH_3 = '3m',
  YEAR_1 = '1y',
}

enum LoadingStatus {
  LOADED = 'loaded',
  LOADING = 'loading',
  NOT_LOADED = 'not loaded',
}

export function Coin(props: CoinProps) {
  const { goToFeed, entity, ticker, coinPage } = props;
  const { coinChartProps } = coinPage;

  const [error, setError] = useState<string | undefined>();

  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex">
        <div className="text-gray-400 hover:text-gray-600 cursor-pointer font-medium text-sm py-2 inline-flex mr-2">
          Cryptocurrencies &gt;
        </div>
        <div className="text-gray-400 hover:text-gray-600 cursor-pointer font-medium text-sm py-2 inline-flex mr-2">
          Coins &gt;
        </div>
        <div className="text-black hover:text-gray-600 cursor-pointer font-medium text-sm py-2 inline-flex mr-2"></div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
        <div className="col-span-1">
          <div className="flex items-center my-4">
            <img
              className="w-10 mr-2"
              src={entity?.image || BitcoinSVG}
              alt="bitcoin"
            />
            <span className="font-bold text-lg mr-2">
              {entity?.name || 'Bitcoin'}
            </span>
            <GrayButton text="BTC" />
            <WatchlistIcon className="ml-2" width={18} height={18} />
          </div>
          <div className="flex flex-wrap gap-4">
            <GrayButton text="Rank #1" active={true} />
            <GrayButton text="Coin" />
            <GrayButton text="Been Favorited +4.2 Million Times" />
            <GrayButton text="Website" />
            <GrayButton text="Explorers" />
            <GrayButton text="White Paper" />
            <GrayButton text="Source Code" />
          </div>
          <p className="my-2">Tags</p>
          <div className="flex gap-4 flex-wrap">
            <GrayButton text="PoW" />
            <GrayButton text="SHA-256" />
            <GrayButton text="Store Of Value" />
            <GrayButton text="Mineable" />
            <span className="text-blue-500 hover:cursor-pointer">View All</span>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1">
          <div className="font-bold flex items-center mb-8">
            <span className="md:text-[60px] text-3xl mr-2 p-2">
              ${entity?.price || '28,013.46'}
            </span>
            {entity &&
              (entity['24h'] < 0 ? (
                <span className="p-2 text-white bg-red-500 rounded-2xl flex items-center md:text-2xl text-md">
                  <ArrowDownIcon
                    className="mt-2"
                    color="white"
                    width={15}
                    height={15}
                  />
                  {(entity && (entity['24h'] * -1).toFixed(4)) || '0.02%'}
                </span>
              ) : (
                <span className="p-2 text-white bg-green-500 rounded-2xl flex items-center md:text-2xl text-md">
                  <ArrowUpIcon
                    className="mt-2"
                    color="white"
                    width={15}
                    height={15}
                  />
                  {(entity && entity['24h'].toFixed(4)) || '0.02%'}
                </span>
              ))}
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
            <div className="flex-col">
              <span className="text-[#7D7D7D]">Market Cap</span>
              <br />
              <span className="font-bold">
                {entity?.marketCap || '$535,170,972,845'}
              </span>
              <span className="flex items-center text-green-500">
                <ArrowUpIcon
                  className="mt-2 mr-1"
                  color="green"
                  width={15}
                  height={15}
                />
                0.02%
              </span>
            </div>
            <div className="flex-col">
              <span className="text-[#7D7D7D]">Fully Diluted Market Cap</span>
              <br />
              <span className="font-bold">$535,170,972,845</span>
              <span className="flex items-center text-green-500">
                <ArrowUpIcon
                  className="mt-2 mr-1"
                  color="green"
                  width={15}
                  height={15}
                />
                0.02%
              </span>
            </div>
            <div className="flex-col">
              <span className="text-[#7D7D7D]">Volume</span>
              <br />
              <span className="font-bold">
                {entity?.volume || '$25,170,972,845'}
              </span>
              <span className="flex items-center text-green-500">
                <ArrowUpIcon
                  className="mt-2 mr-1"
                  color="green"
                  width={15}
                  height={15}
                />
                0.02%
              </span>
            </div>
            <div className="flex-col">
              <span className="text-[#7D7D7D]">Circulating Supply</span>
              <br />
              <div className="flex justify-between">
                <span className="font-bold">
                  {entity?.circulatingSupply || '19,327,200'}{' '}
                  {entity?.coin || 'BTC'}
                </span>
                <span className="font-bold">92%</span>
              </div>
              <span className="flex items-center text-green-500">
                <div className="w-full bg-gray-400 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-gray-700 h-2.5 rounded-full"
                    style={{ width: '92%' }}
                  ></div>
                </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ChartWidget {...coinChartProps} ticker={ticker} />
      </div>
    </div>
  );
}

export default Coin;
export const ConnectedCoin = connect(mapStateToProps, (dispatch) => ({
  /**
   * @see {@link https://github.com/permafacts/el-cap/tree/main/packages/store/src/lib/routes/pages.ts}
   * For possible routes types to disptach.
   */
  goToFeed: () => dispatch({ type: 'FEED' }),
}))(Coin);
