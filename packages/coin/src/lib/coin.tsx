import { useEffect, useState } from 'react';
import { WarpFactory } from 'warp-contracts';
import { mapStateToProps } from '@el-cap/store';
import { ChartWidget } from '@el-cap/chart-widget';
import { HistoricalPriceTable } from '@el-cap/historical-price-table';
import { connect } from 'react-redux';
import { PriceData } from 'redstone-api/lib/types';
import { ArrowUpIcon, WatchlistIcon } from '../assets/icons';
import {
  BitcoinSVG,
  SearchSVG,
  UserSVG,
  CodeSVG,
  PaperSVG,
  LinkSVG,
  RedditSVG,
  Broadcast,
} from '../assets/svg/index';
import Tag from '../assets/component/Tag';
import {
  ProcessedTokenData,
  ReadContractResult,
  ReadContractStateResult,
  State,
} from '@el-cap/interfaces';
import { ArrowDownIcon } from '@el-cap/top-coins-card';
import CoinAttributeLinkButton from '../assets/component/CoinAttributeLinkButton';
import ToggleComponent from '../assets/component/ToggleComponent';

interface CoinProps {
  goToFeed: () => void;
  entity?: ProcessedTokenData;
  ticker: string;
  coinPage: {
    fetchCoin: (input: { symbol: string; name: string }) => void;
    loadingStatus: string;
    fetchedEntity: ProcessedTokenData[];
    addToWatchlist: (coin: string) => void;
    checkCoinOnWatchlist: (coin: string) => void;
    coinChartProps: {
      fetchRemaining: (input: { symbol: string; interval: string }) => void;
      fetchCoin: (input: { symbol: string; name: string }) => void;
      chart24hourData: PriceData | undefined;
    };
  };
}

const coinAttributeButtonData = [
  {
    icon: LinkSVG,
    title: 'bitcoin.org',
    url: 'bitcoin.org',
    type: 'link',
  },
  {
    icon: SearchSVG,
    title: 'Explorer',
    url: 'bitcoin.org',
    type: 'dropdown',
    dropdownOptions: [
      {
        title: 'BTC on CMC Community',
        url: 'bitcoin.org',
        type: 'link',
        icon: Broadcast,
      },
      {
        title: 'BTC discussions',
        url: 'bitcoin.org',
        type: 'normal',
        icon: Broadcast,
      },
    ],
  },
  {
    icon: UserSVG,
    title: 'Community',
    url: '',
    type: 'dropdown',
    dropdownOptions: [
      {
        title: 'BTC on CMC Community',
        url: 'bitcoin.org',
        type: 'normal',
        icon: Broadcast,
      },
      {
        title: 'BTC discussions',
        url: 'bitcoin.org',
        type: 'normal',
        icon: Broadcast,
      },
      {
        title: 'bitcointalk.org',
        url: 'bitcointalk.org',
        type: 'link',
        icon: UserSVG,
      },
      {
        title: 'Reddit',
        url: 'bitcoin.org',
        type: 'link',
        icon: RedditSVG,
      },
    ],
  },
  {
    icon: CodeSVG,
    title: 'Source code',
    url: 'bitcoin.org',
    type: 'link',
  },
  {
    icon: PaperSVG,
    title: 'Whitepaper',
    url: 'bitcoin.org',
    type: 'link',
  },
];

export function Coin(props: CoinProps) {
  const { goToFeed, entity, ticker, coinPage } = props;
  const {
    coinChartProps,
    fetchCoin,
    loadingStatus,
    fetchedEntity,
    addToWatchlist,
    checkCoinOnWatchlist,
  } = coinPage;
  const [coins, setCoins] = useState<ProcessedTokenData[]>([]);
  const [shouldLoad, setShouldLoad] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [onWatchList, setOnWatchList] = useState(false);
  const [viewType, setViewType] = useState<string>('Chart');

  const setView = (view: string) => {
    console.log(view);
    setViewType(view);
  };

  const toggleView: string[] = ['Chart', 'Table'];

  const goToTag = (tagName: string) => {
    window.location.href = tagName.replace(/\s/g, '-');
  };

  const fetchState = async () => {
    const contractId = 'MH-w8Sq6uw3Jwc_stPqyJT8fEcIhx4VrrE10NFgv-KY';
    const warp = WarpFactory.forMainnet();
    const contract = warp.contract(contractId);
    const result: ReadContractResult = await contract.readState();
    const state = result.cachedValue.state as State;

    const coins = state.coins;
    console.log('state running here', state);
    setCoins(coins);
  };

  useEffect(() => {
    fetchState();
    const isCoinOnWatchlist = async () => {
      const watchlist = await checkCoinOnWatchlist(ticker);
      console.log('===isOnWatchlist==', watchlist);
      setOnWatchList(watchlist.payload);
    };
    isCoinOnWatchlist();
  }, []);
  function findNameByTicker(ticker: string, coins: ProcessedTokenData[]) {
    console.log('ticker', ticker, 'coins', coins);
    const coin = coins.find(
      (c) => c.symbol.toLowerCase() === ticker.toLowerCase()
    );
    return coin ? coin.name : 'Ticker not found';
  }

  useEffect(() => {
    if (
      shouldLoad &&
      loadingStatus !== 'loaded' &&
      ticker !== entity?.coin &&
      coins.length > 0
    ) {
      const name = findNameByTicker(ticker, coins);
      console.log('name', name);
      fetchCoin({ symbol: ticker, name });
      setShouldLoad(false);
    }
  }, [fetchCoin, loadingStatus, ticker, entity, coins]);

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
              src={
                (entity && entity.image) ||
                (fetchedEntity[0] && fetchedEntity[0].image) ||
                BitcoinSVG
              }
              alt="bitcoin"
            />
            <span className="font-bold text-lg mr-2">
              {(entity && entity.name) ||
                (fetchedEntity[0] && fetchedEntity[0].name) ||
                'Bitcoin'}
            </span>
            <Tag tagName="BTC" goToTag={goToTag} />
            <div
              onClick={() => {
                addToWatchlist(ticker);
                setOnWatchList(true);
              }}
            >
              <WatchlistIcon
                className="ml-2"
                width={18}
                height={18}
                isOnWatchlist={onWatchList}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {coinAttributeButtonData.map((item, key) => {
              return (
                <CoinAttributeLinkButton
                  key={key}
                  icon={item.icon}
                  title={item.title}
                  type={item.type === 'link' ? 'link' : 'dropdown'}
                  url={item.url}
                  dropdownOptions={
                    item.dropdownOptions ? item.dropdownOptions : []
                  }
                />
              );
            })}
          </div>
          <p className="my-2">Tags</p>
          <div className="flex gap-4 flex-wrap">
            <Tag tagName="PoW" goToTag={goToTag} />
            <Tag tagName="SHA-256" goToTag={goToTag} />
            <Tag tagName="Store Of Value" goToTag={goToTag} />
            <Tag tagName="Mineable" goToTag={goToTag} />
            <span className="text-blue-500 hover:cursor-pointer">View All</span>
          </div>
        </div>
        <div className="md:col-span-2 col-span-1">
          <div className="font-bold flex items-center mb-8">
            <span className="md:text-[60px] text-3xl mr-2 p-2">
              $
              {(entity && entity.price) ||
                (fetchedEntity[0] && fetchedEntity[0].price) ||
                '34,000'}
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
                  {(entity && (entity['24h'] * -1).toFixed(4)) ||
                    (fetchedEntity[0] && fetchedEntity[0]['24h'].toFixed(4)) ||
                    '0.02%'}
                </span>
              ) : (
                <span className="p-2 text-white bg-green-500 rounded-2xl flex items-center md:text-2xl text-md">
                  <ArrowUpIcon
                    className="mt-2"
                    color="white"
                    width={15}
                    height={15}
                  />
                  {(entity && entity['24h'].toFixed(4)) ||
                    (fetchedEntity[0] && fetchedEntity[0]['24h'].toFixed(4)) ||
                    '0.02%'}
                </span>
              ))}
          </div>
          <div className="grid lg:grid-cols-4 grid-cols-2 gap-2">
            <div className="flex-col">
              <span className="text-[#7D7D7D]">Market Cap</span>
              <br />
              <span className="font-bold">
                {(entity && entity.marketCap) ||
                  (fetchedEntity[0] && fetchedEntity[0].marketCap) ||
                  '$535,170,972,845'}
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
              <span className="font-bold">
                $
                {(entity && entity.marketCap) ||
                  (fetchedEntity[0] && fetchedEntity[0].marketCap) ||
                  '535,170,972,845'}
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
              <span className="text-[#7D7D7D]">Volume</span>
              <br />
              <span className="font-bold">
                {(entity && entity.volume) ||
                  (fetchedEntity[0] && fetchedEntity[0].volume) ||
                  '$535,170,972,845'}
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
                  {(entity && entity.circulatingSupply) ||
                    (fetchedEntity[0] && fetchedEntity[0].circulatingSupply) ||
                    '18,618,806.00'}
                  {(entity && entity.coin) ||
                    (fetchedEntity[0] && fetchedEntity[0].coin) ||
                    'BTC'}
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
      <div className="my-4">
        <ToggleComponent view={toggleView} setView={setView} />
        {viewType === 'Chart' ? (
          <ChartWidget {...coinChartProps} ticker={ticker} />
        ) : (
          <HistoricalPriceTable />
        )}
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
