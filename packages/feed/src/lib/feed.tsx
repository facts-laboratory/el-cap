import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { mapStateToProps } from '@el-cap/store';
import { PriceData } from 'redstone-api/lib/types';

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
  goToCoin: (ticker: string, entity?: PriceData) => void;
}

export function Feed(props: FeedProps) {
  const { goToCoin } = props;

  return (
    <div className="bg-gray-100 min-h-[calc(100vh-160px)]">
      <div className="container mx-auto px-4 py-10">
        <div className="mb-8">
          <p className="text-black font-bold text-3xl">
            Today's Cryptocurrency Prices by Market Cap
          </p>
          <p className="text-gray-500">
            The global market cap is{' '}
            <span className="text-green-500 font-bold">$1.18T,</span>a
            <span className="text-green-500 font-bold">+1.38%</span> increase
            over the last day. <span className="text-gray-400">Read More</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Feed;

export const ConnectedFeed = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity?: PriceData) =>
    dispatch({ type: 'COIN', payload: { ticker, entity: entity } }),
}))(Feed);
