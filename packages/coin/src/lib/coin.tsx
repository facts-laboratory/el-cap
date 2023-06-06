import { useEffect, useState } from 'react';

import { mapStateToProps } from '@el-cap/store';
import { ChartWidget } from '@el-cap/chart-widget';
import { connect } from 'react-redux';
import { PriceData } from 'redstone-api/lib/types';
import { ArrowUpIcon, WatchlistIcon } from '../assets/icons';
import BitcoinSVG from '../assets/svg/bitcoin.svg';
import GrayButton from '../assets/component/GrayButton';

interface CoinProps {
  goToFeed: () => void;
  entity?: PriceData;
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

  const coinChart = {
    [TimeRange.DAY_1]: [
      { timestamp: 1653153600, value: 4500 },
      { timestamp: 1653164400, value: 4600 },
      { timestamp: 1653175200, value: 4700 },
      { timestamp: 1653186000, value: 4800 },
      { timestamp: 1653196800, value: 4900 },
      { timestamp: 1653207600, value: 5000 },
      { timestamp: 1653218400, value: 4900 },
      { timestamp: 1653229200, value: 4800 },
      { timestamp: 1653240000, value: 4700 },
      { timestamp: 1653250800, value: 4600 },
      { timestamp: 1653261600, value: 4500 },
    ],
    [TimeRange.DAY_7]: [
      { timestamp: 1652668800, value: 4000 },
      { timestamp: 1652755200, value: 4100 },
      { timestamp: 1652841600, value: 4200 },
      { timestamp: 1652928000, value: 4300 },
      { timestamp: 1653014400, value: 4400 },
      { timestamp: 1653100800, value: 4500 },
      { timestamp: 1653187200, value: 4600 },
    ],
    [TimeRange.MONTH_1]: [
      { timestamp: 1650739200, value: 3500 },
      { timestamp: 1650825600, value: 3600 },
      { timestamp: 1650912000, value: 3700 },
      { timestamp: 1650998400, value: 3800 },
      { timestamp: 1651084800, value: 3900 },
      { timestamp: 1651171200, value: 4000 },
      { timestamp: 1651257600, value: 4100 },
      { timestamp: 1651344000, value: 4200 },
      { timestamp: 1651430400, value: 4300 },
      { timestamp: 1651516800, value: 4400 },
      { timestamp: 1651603200, value: 4500 },
      { timestamp: 1651689600, value: 4600 },
    ],
    [TimeRange.MONTH_3]: [
      { timestamp: 1648416000, value: 3000 },
      { timestamp: 1648502400, value: 3100 },
      { timestamp: 1648588800, value: 3200 },
      { timestamp: 1648675200, value: 3300 },
      { timestamp: 1648761600, value: 3400 },
      { timestamp: 1648848000, value: 3500 },
      { timestamp: 1648934400, value: 3600 },
      { timestamp: 1649020800, value: 3700 },
      { timestamp: 1649107200, value: 3800 },
      { timestamp: 1649193600, value: 3900 },
      { timestamp: 1649280000, value: 4000 },
      { timestamp: 1649366400, value: 4100 },
    ],
    [TimeRange.YEAR_1]: [
      { timestamp: 1621699200, value: 2000 },
      { timestamp: 1621785600, value: 2100 },
      { timestamp: 1621872000, value: 2200 },
      { timestamp: 1621958400, value: 2300 },
      { timestamp: 1622044800, value: 2400 },
      { timestamp: 1622131200, value: 2500 },
      { timestamp: 1622217600, value: 2600 },
      { timestamp: 1622304000, value: 2700 },
      { timestamp: 1622390400, value: 2800 },
      { timestamp: 1622476800, value: 2900 },
      { timestamp: 1622563200, value: 3000 },
      { timestamp: 1622649600, value: 3100 },
      { timestamp: 1622736000, value: 3200 },
      { timestamp: 1622822400, value: 3300 },
      { timestamp: 1622908800, value: 3400 },
      { timestamp: 1622995200, value: 3500 },
      { timestamp: 1623081600, value: 3600 },
      { timestamp: 1623168000, value: 3700 },
      { timestamp: 1623254400, value: 3800 },
      { timestamp: 1623340800, value: 3900 },
      { timestamp: 1623427200, value: 4000 },
      { timestamp: 1623513600, value: 4100 },
      { timestamp: 1623600000, value: 4200 },
      { timestamp: 1623686400, value: 4300 },
      { timestamp: 1623772800, value: 4400 },
      { timestamp: 1623859200, value: 4500 },
      { timestamp: 1623945600, value: 4600 },
      { timestamp: 1624032000, value: 4700 },
      { timestamp: 1624118400, value: 4800 },
      { timestamp: 1624204800, value: 4900 },
      { timestamp: 1624291200, value: 5000 },
    ],
    // more time ranges...
  };

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
        <div className="text-black hover:text-gray-600 cursor-pointer font-medium text-sm py-2 inline-flex mr-2">
          Bitcoin
        </div>
      </div>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
        <div className="col-span-1">
          <div className="flex items-center my-4">
            <img className="w-10 mr-2" src={BitcoinSVG} alt="bitcoin" />
            <span className="font-bold text-lg mr-2">Bitcoin</span>
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
            <span className="md:text-[60px] text-3xl mr-2 p-2">$28,013.46</span>
            <span className="p-2 text-white bg-green-500 rounded-2xl flex items-center md:text-2xl text-md">
              <ArrowUpIcon
                className="mt-2"
                color="white"
                width={15}
                height={15}
              />
              0.02%
            </span>
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
            <div className="flex-col">
              <span className="text-[#7D7D7D]">Market Cap</span>
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
              <span className="font-bold">$25,170,972,845</span>
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
                <span className="font-bold">19,327,200 BTC</span>
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
