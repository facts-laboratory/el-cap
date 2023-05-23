import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps } from '@el-cap/store';
import { WidgetCoinCard } from '@el-cap/widget-coin-card';
import { TokenTable } from '@el-cap/token-table';
import TabComponent from './components/TabComponent';
import DropDownAllTypes from './components/DropDownAllTypes';

const data = [
  {
    title: 'Trending',
    type: 'trending',
    data: [
      { text: 'Shiba Inu', icon: 'SHIB', value: '-4.28' },
      { text: 'Shiba Inu', icon: 'SHIB', value: '4.28' },
      { text: 'Shiba Inu', icon: 'SHIB', value: '-4.28' },
    ],
  },
  {
    title: 'Biggest Gainer',
    type: 'price',
    data: [
      { text: 'Timeseries AI', icon: 'TIMESERIES', value: '0.000251' },
      { text: 'Timeseries AI', icon: 'TIMESERIES', value: '0.000251' },
      { text: 'Timeseries AI', icon: 'TIMESERIES', value: '0.000251' },
    ],
  },
  {
    title: 'Recently Updated Socials',
    type: 'price',
    data: [
      { text: 'Timeseries AI', icon: 'TIMESERIES', value: '0.000251' },
      { text: 'Shiba Inu', icon: 'SHIB', value: '0.000251' },
      { text: 'Timeseries AI', icon: 'TIMESERIES', value: '0.000251' },
    ],
  },
];

export interface FeedProps {
  goToCoin: (ticker: string) => void;
}

export function Feed(props: FeedProps) {
  const { goToCoin } = props;
  const [showCase, setShowCase] = useState<boolean>(true);

  return (
    <div className="min-h-[calc(100vh-217px)]">
      <div className="mx-auto p-4">
        <div className="mb-8 sm:flex justify-between items-center">
          <div>
            <p className="text-black font-bold text-3xl">
              Today's Cryptocurrency Prices by Market Cap
            </p>
            <p className="text-gray-500">
              The global market cap is{' '}
              <span className="text-green-500 font-bold">$1.18T,</span>a
              <span className="text-green-500 font-bold">+1.38%</span> increase
              over the last day.{' '}
              <span className="text-gray-400">Read More</span>
            </p>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-gray-900 mr-2 dark:text-gray-300">
              Showcase
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value=""
                checked={showCase}
                className="sr-only peer"
              />
              <div
                className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300  rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"
                onClick={() => setShowCase(!showCase)}
              ></div>
            </label>
          </div>
        </div>
        {showCase ? (
          <div className="flex flex-wrap gap-5 my-6">
            {data.map((val, key) => {
              return (
                <div className="flex-1" key={key}>
                  <WidgetCoinCard
                    title={val.title}
                    type={val.type}
                    data={val.data}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <div className="flex justify-between items-center">
          <TabComponent />
          <DropDownAllTypes />
        </div>
        <TokenTable />
      </div>
    </div>
  );
}

export default Feed;

export const ConnectedFeed = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string) => dispatch({ type: 'COIN', payload: { ticker } }),
}))(Feed);
