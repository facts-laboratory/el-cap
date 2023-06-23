import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { connect } from 'react-redux';

import { RootState, mapStateToProps } from '@el-cap/store';
import { TopCoinsCard } from '@el-cap/top-coins-card';
import { TokenTable } from '@el-cap/token-table';
import TabComponent from './components/TabComponent';
import DropDownFeedOptions from './components/DropDownFeed';
import { SortKey } from '@el-cap/interfaces';

const TrendingdummyData = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    metric: -4.28,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    metric: 4000,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    metric: 2.12,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    metric: 0.24,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
  },
];

export interface FeedProps {
  goToCoin: (ticker: string) => void;
  goToFeed: (key: string) => void;
  feedPage: {
    entities: any;
    loadingStatus: string;
    fetchFeed: (key: string | undefined) => void;
  };
}

export function Feed(props: FeedProps) {
  const { fetchFeed, entities, loadingStatus, addToWatchlist } = props.feedPage;
  const { goToCoin, goToFeed } = props;
  console.log('props', props);
  const [showCase, setShowCase] = useState<boolean>(true);
  const [sortKey, setSortKey] = useState<string | undefined>();

  const path = useSelector((state: RootState) => state.location.pathname);
  useEffect(() => {
    const sortKeyMap: { [key: string]: SortKey } = {
      name: SortKey.NAME,
      image: SortKey.IMAGE,
      coin: SortKey.COIN,
      price: SortKey.PRICE,
      marketcap: SortKey.MARKET_CAP,
      volume: SortKey.VOLUME,
      circulatingsupply: SortKey.CIRCULATING_SUPPLY,
      '1h': SortKey.ONE_HOUR,
      '24h': SortKey.TWENTY_FOUR_HOURS,
      '7d': SortKey.SEVEN_DAYS,
    };

    const key = sortKeyMap[path.slice(1).toLowerCase()];
    setSortKey(key);

    if (loadingStatus !== 'loaded') {
      console.log('Path parameter: ', path);
      fetchFeed(key);
    }
  }, [fetchFeed, entities, loadingStatus, path, sortKey]);
  const feedOptions = [
    { title: 'All', key: 'feed0' },
    { title: 'Algorand Ecosystem', key: 'feed1' },
    { title: 'Pow', key: 'feed2' },
    { title: 'Pos', key: 'feed3' },
    { title: 'Ethereum Ecosystem', key: 'feed4' },
    { title: 'Layer 1', key: 'feed5' },
    { title: 'Layer 2', key: 'feed6' },
  ];

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
          {!sortKey && (
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
          )}
        </div>
        {showCase && !sortKey && (
          <div className="flex flex-wrap gap-5 my-6">
            <TopCoinsCard
              title="Trending Coins"
              type="Percentage"
              data={TrendingdummyData}
              goToCoin={goToCoin}
              goToFeed={goToFeed}
            />
            <TopCoinsCard
              title="Biggest Gainers"
              type="Price"
              data={TrendingdummyData}
              goToCoin={goToCoin}
              goToFeed={goToFeed}
            />
            <TopCoinsCard
              title="Recently Updated Socials"
              type="Price"
              data={TrendingdummyData}
              goToCoin={goToCoin}
              goToFeed={goToFeed}
            />
          </div>
        )}
        <div className="flex justify-between items-center">
          <TabComponent />
          <DropDownFeedOptions feedOptions={feedOptions} goToFeed={goToFeed} />
        </div>
        {entities && (
          <TokenTable
            data={entities}
            goToCoin={goToCoin}
            addToWatchlist={addToWatchlist}
          />
        )}
      </div>
    </div>
  );
}

export default Feed;

export const ConnectedFeed = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity: any) =>
    dispatch({ type: 'COIN', payload: { ticker, entity } }),
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
}))(Feed);
