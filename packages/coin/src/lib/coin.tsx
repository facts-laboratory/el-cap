import { useEffect, useState } from 'react';
import { getTokenData } from '@el-cap/token-table';
import { mapStateToProps } from '@el-cap/store';
import { ChartWidget } from '@el-cap/chart-widget';
import { connect } from 'react-redux';
import { TokenData } from '@el-cap/interfaces';
import { ArrowUpIcon, WatchlistIcon } from '../assets/icons';
import BitcoinSVG from '../assets/svg/bitcoin.svg';
import GrayButton from '../assets/component/GrayButton';

interface CoinProps {
  ticker: string;
  entity: TokenData;
  coinPage: {
    goToFeed: () => void;
    fetchCoin: (ticker: string) => void;
    loadingStatus: string;
    fetchedEntity: TokenData[]
  };
}

export function Coin(props: CoinProps) {
  const [localEntity, setLocalEntity] = useState<TokenData | undefined>(undefined)

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { ticker, entity, coinPage } = props;
  const { goToFeed, fetchCoin, fetchedEntity, loadingStatus } = props.coinPage;
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!entity || entity?.coin !== ticker) {
      fetchCoin(ticker);
    }
  }, []);

  useEffect(() => {
    if (entity || fetchedEntity) {
      setLocalEntity(entity || getTokenData(fetchedEntity)[0]);
    }
    // setLocalEntity(entity || getTokenData(fetchedEntity));
  }, [entity, fetchedEntity]);

  useEffect(() => {
    console.log('localEntity before', localEntity);
    if (localEntity !== undefined ) {
      console.log('set isLoaded to true');
      setIsLoaded(true);
    }
  }, [localEntity]);

  if (loadingStatus === 'loading') {
    return <div>Loading...YOOOO</div>; }


  if (isLoaded) {
  return (
    <div className="bg-gray-100 min-h-screen">
  {localEntity && (
        <>
          {console.log('localEntity here', localEntity, 'typeof', typeof localEntity)}
          {console.log('localEntity', localEntity)}
          {console.log('localEntity', localEntity)}
          <div className="flex">
            <div className="text-gray-400 hover:text-gray-600 cursor-pointer font-medium text-sm py-2 inline-flex mr-2">
              Cryptocurrencies &gt;
            </div>
            <div className="text-gray-400 hover:text-gray-600 cursor-pointer font-medium text-sm py-2 inline-flex mr-2">
              Coins &gt;
            </div>
            <div className="text-black hover:text-gray-600 cursor-pointer font-medium text-sm py-2 inline-flex mr-2">
              {localEntity?.coin}
            </div>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-8 gap-y-4">
            <div className="col-span-1">
              <div className="flex items-center my-4">
                <img
                  className="w-10 mr-2"
                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/24029.png"
                  alt="bitcoin"
                />
                <span className="font-bold text-lg mr-2">
                  {localEntity?.coin}
                </span>
                <GrayButton text={localEntity?.coin || 'coin'} />
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
              <p className="my-2">Tages</p>
              <div className="flex gap-4 flex-wrap">
                <GrayButton text="PoW" />
                <GrayButton text="SHA-256" />
                <GrayButton text="Store Of Value" />
                <GrayButton text="Mineable" />
                <span className="text-blue-500 hover:cursor-pointer">
                  View All
                </span>
              </div>
            </div>
            <div className="md:col-span-2 col-span-1">
              <div className="font-bold flex items-center mb-8">
                <span className="md:text-[60px] text-3xl mr-2 p-2">
                  {localEntity?.price}
                </span>
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
                  <span className="text-[#7D7D7D]">
                    Fully Diluted Market Cap
                  </span>
                  <br />
                  <span className="font-bold">
                    ${localEntity?.marketCap.toLocaleString()}
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
                    ${localEntity?.volume.toLocaleString()}
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
                      ${localEntity?.circulatingSupply.toLocaleString()}
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
          {console.log('localEntity', localEntity)}
          <ChartWidget entity={localEntity} />
        </>
      )}
    </div>
  );
};
}

export default Coin;
export const ConnectedCoin = connect(mapStateToProps, (dispatch) => ({
  /**
   * @see {@link https://github.com/permafacts/el-cap/tree/main/packages/store/src/lib/routes/pages.ts}
   * For possible routes types to disptach.
   */
  goToFeed: () => dispatch({ type: 'FEED' }),
}))(Coin);
