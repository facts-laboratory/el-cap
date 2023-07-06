import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { connect } from 'react-redux';

import { RootState, mapStateToProps } from '@el-cap/store';
import { TopCoinsCard } from '@el-cap/top-coins-card';
import { TokenTable } from '@el-cap/token-table';
import TabComponent from './components/TabComponent';
import DropDownFeedOptions from './components/DropDownFeed';
import { SortKey, TopCoins } from '@el-cap/interfaces';
import { ArAccount } from 'arweave-account';

export interface FeedProps {
  goToCoin: (ticker: string) => void;
  goToFeed: (key?: string) => void;
  feedPage: {
    entities: any;
    loadingStatus: string;
    fetchFeed: (key: string | undefined) => void;
    getTopCoins: () => void;
    topCoins: TopCoins;
    addToWatchlist: (coin: string) => void;
    checkCoinsOnWatchlist: () => void;
    user: ArAccount;
  };
}

export function Feed(props: FeedProps) {
  const {
    fetchFeed,
    entities,
    loadingStatus,
    getTopCoins,
    topCoins,
    addToWatchlist,
    user,
  } = props.feedPage;
  const { goToCoin, goToFeed } = props;
  const [showCase, setShowCase] = useState<boolean>(true);
  const [sortKey, setSortKey] = useState<string | undefined>();
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const fetchFeedRef = useRef(fetchFeed);
  fetchFeedRef.current = fetchFeed;

  const path = useSelector((state: RootState) => state.location.pathname);
  useEffect(() => {
    const sortKeyMap: { [key: string]: SortKey } = {
      name: SortKey.NAME,
      image: SortKey.IMAGE,
      coin: SortKey.COIN,
      price: SortKey.PRICE,
      marketcap: SortKey.MARKET_CAP,
      volume: SortKey.VOLUME,
      lossers: SortKey.LOSERS,
      circulatingsupply: SortKey.CIRCULATING_SUPPLY,
      trending: SortKey.SEVEN_DAYS,
      gainers: SortKey.SEVEN_DAYS,
      '1h': SortKey.ONE_HOUR,
      '24h': SortKey.TWENTY_FOUR_HOURS,
      '7d': SortKey.SEVEN_DAYS,
    };

    const key = sortKeyMap[path.slice(1).toLowerCase()];
    setSortKey(key);

    if (loadingStatus !== 'loaded' && loadingStatus !== 'loading') {
      console.log('running feed');
      fetchFeedRef.current(key);
    }
  }, [loadingStatus, path, sortKey, user]);

  useEffect(() => {
    fetchFeedRef.current();
  }, [user]);

  useEffect(() => {
    const sortKeyMap: { [key: string]: SortKey } = {
      name: SortKey.NAME,
      image: SortKey.IMAGE,
      coin: SortKey.COIN,
      price: SortKey.PRICE,
      marketcap: SortKey.MARKET_CAP,
      volume: SortKey.VOLUME,
      lossers: SortKey.LOSERS,
      circulatingsupply: SortKey.CIRCULATING_SUPPLY,
      trending: SortKey.SEVEN_DAYS,
      gainers: SortKey.SEVEN_DAYS,
      '1h': SortKey.ONE_HOUR,
      '24h': SortKey.TWENTY_FOUR_HOURS,
      '7d': SortKey.SEVEN_DAYS,
    };

    const key = sortKeyMap[path.slice(1).toLowerCase()];
    setSortKey(key);
    fetchFeedRef.current(key);
  }, [path]);
  const feedOptions = [
    { title: 'All', key: 'feed0' },
    { title: 'Algorand Ecosystem', key: 'feed1' },
    { title: 'Pow', key: 'feed2' },
    { title: 'Pos', key: 'feed3' },
    { title: 'Ethereum Ecosystem', key: 'feed4' },
    { title: 'Layer 1', key: 'feed5' },
    { title: 'Layer 2', key: 'feed6' },
  ];

  useEffect(() => {
    // TODO after we have top coins in slice add getTopCoins to dependency and !== 'loaded' for getTopCoins

    if (entities.length > 0) {
      console.log('loading extra data in feed');
      getTopCoins();
    }
  }, [entities]);

  return (
    <div>
      {loadingStatus === 'loading' ? (
        <div className="min-h-[calc(100vh-217px)] flex items-center justify-center">
          <iframe
            className="min-h-[calc(100vh-217px)]"
            src="https://arweave.net/IkMJRqi_0Xx_QhstK4WE3rsQqQxC07n84UagPgqGXfc"
            title="loading"
          />
        </div>
      ) : (
        <div>
          <div className="mx-auto p-4">
            <div className="mb-8 sm:flex justify-between items-center">
              <div>
                <p className="text-black font-bold text-3xl">
                  Today's Cryptocurrency Prices by Market Cap
                </p>
                <p className="text-gray-500">
                  The global market cap is{' '}
                  <span className="text-green-500 font-bold">$1.18T,</span>a
                  <span className="text-green-500 font-bold">+1.38%</span>{' '}
                  increase over the last day.{' '}
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
                {topCoins && topCoins['7d'] && topCoins['7d'].length > 0 && (
                  <TopCoinsCard
                    title="Biggest Gainers"
                    type="Percentage"
                    dataKey="7d"
                    data={topCoins['7d']}
                    goToCoin={goToCoin}
                    goToFeed={goToFeed}
                  />
                )}
                {topCoins && topCoins['24h'] && topCoins['24h'].length > 0 && (
                  <TopCoinsCard
                    title="Trending Coins"
                    key="trending"
                    type="Percentage"
                    dataKey="24h"
                    data={topCoins['24h']}
                    goToCoin={goToCoin}
                    goToFeed={goToFeed}
                  />
                )}
                {topCoins && topCoins['1h'] && topCoins['1h'].length > 0 && (
                  <TopCoinsCard
                    title="Moving"
                    type="Percentage"
                    dataKey="1h"
                    data={topCoins['1h']}
                    goToCoin={goToCoin}
                    goToFeed={goToFeed}
                  />
                )}
              </div>
            )}

            <div className="flex justify-between items-center">
              {!sortKey && (
                <TabComponent
                  fetchFeed={fetchFeed}
                  activeTabIndex={activeTabIndex}
                  setActiveTabIndex={setActiveTabIndex}
                />
              )}
              <DropDownFeedOptions
                feedOptions={feedOptions}
                goToFeed={goToFeed}
              />
            </div>
            {entities && (
              <TokenTable
                data={entities}
                goToCoin={goToCoin}
                addToWatchlist={(coin: string) => addToWatchlist(coin)}
                user={user}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;

export const ConnectedFeed = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity: any) =>
    dispatch({ type: 'COIN', payload: { ticker, entity } }),
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
}))(Feed);
