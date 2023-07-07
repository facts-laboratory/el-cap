import {
  ContentContainer,
  ConnectedHeader,
  Footer,
} from '@el-cap/el-cap-layout';
import {
  fetchContractcoins,
  fetch24PriceData,
  getTopCoins,
  selectTopCoins,
  selectChartData,
  mapStateToProps,
  useAppDispatch,
  useAppSelector,
  selectAllFeed,
  selectFeedLoadingStatus,
  addToWatchlist,
  selectAllCoin,
  fetchFeed,
  fetchCoin,
  fetchRemainingPriceData,
  selectCoinLoadingStatus,
  selectAllContracts,
  selectContractsLoadingStatus,
  setUser,
  selectUser,
  unsetUser,
  fetchWatchlist,
  selectAllWatchlist,
  selectWatchlistLoadingStatus,
  fetchMarketData,
  selectMarketData,
} from '@el-cap/store';
import { connect } from 'react-redux';
import loadable from '@loadable/component';

import './global.css';

interface ObjectKeys {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

// these match whats in ./../pages.ts
const components: ObjectKeys = {
  Feed: loadable(() => import('@el-cap/feed'), {
    resolveComponent: (components) => components.ConnectedFeed,
  }),
  Coin: loadable(() => import('@el-cap/coin'), {
    resolveComponent: (components) => components.ConnectedCoin,
  }),
  Watchlist: loadable(() => import('@el-cap/watchlist'), {
    resolveComponent: (components) => components.ConnectedWatchlist,
  }),
};

export interface AppProps {
  page?: string;
}
export function App(props: AppProps) {
  const dispatch = useAppDispatch();
  const { page } = props;
  const header = {
    fetchContractcoins: () => dispatch(fetchContractcoins()),
    coins: useAppSelector(selectAllContracts),
    loadingStatus: useAppSelector(selectContractsLoadingStatus),
    setUser: () => dispatch(setUser()),
    user: useAppSelector(selectUser),
    unsetUser: () => dispatch(unsetUser()),
    fetchFeed: (key: string) => dispatch(fetchFeed(key)),
    feedLoadingStatus: useAppSelector(selectFeedLoadingStatus),
    fetchMarketData: () => dispatch(fetchMarketData()),
    marketData: useAppSelector(selectMarketData),
  };
  const feedPage = {
    entities: useAppSelector(selectAllFeed),
    loadingStatus: useAppSelector(selectFeedLoadingStatus),
    addToWatchlist: (input: string) => dispatch(addToWatchlist(input)),
    getTopCoins: () => dispatch(getTopCoins()),
    topCoins: useAppSelector(selectTopCoins),
    fetchFeed: (key: string) => dispatch(fetchFeed(key)),
    user: useAppSelector(selectUser),
  };
  const coinPage = {
    loadingStatus: useAppSelector(selectCoinLoadingStatus),
    fetchCoin: (input: { symbol: string; name: string }) =>
      dispatch(fetchCoin(input)),
    addToWatchlist: (input: string) => dispatch(addToWatchlist(input)),
    fetchedEntity: useAppSelector(selectAllCoin),
    user: useAppSelector(selectUser),
    coins: useAppSelector(selectAllContracts),
    coinChartProps: {
      fetch: (input: { symbol: string; interval: string }) =>
        dispatch(fetch24PriceData(input)),
      fetchRemaining: (input: { symbol: string; interval: string }) =>
        dispatch(fetchRemainingPriceData(input)),
      chartData: useAppSelector(selectChartData),
      loadingStatus: useAppSelector((state) => state.coinChart.loadingStatus),
      remainingLoadingStatus: useAppSelector(
        (state) => state.coinChart.remainingLoadingStatus
      ),
    },
  };
  const watchlistPage = {
    fetchWatchlist: () => dispatch(fetchWatchlist()),
    watchlist: useAppSelector(selectAllWatchlist),
    addToWatchlist: (input: string) => dispatch(addToWatchlist(input)),
    user: useAppSelector(selectUser),
    loadingStatus: useAppSelector(selectWatchlistLoadingStatus),
  };
  const Page = components[(page as keyof ObjectKeys) || 'Feed'];
  return (
    <div className="flex flex-col h-screen">
      <ConnectedHeader header={header} />
      <ContentContainer
        children={
          <Page
            coinPage={coinPage}
            feedPage={feedPage}
            watchlistPage={watchlistPage}
          />
        }
      />
      <Footer />
    </div>
  );
}

export default App;

export const ConnectedApp = connect(mapStateToProps)(App);
