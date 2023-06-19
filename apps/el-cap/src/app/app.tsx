import {
  ContentContainer,
  ConnectedHeader,
  Footer,
} from '@el-cap/el-cap-layout';
import {
  fetch24PriceData,
  selectChartData,
  mapStateToProps,
  useAppDispatch,
  useAppSelector,
  selectAllFeed,
  selectFeedLoadingStatus,
  selectAllCoin,
  fetchFeed,
  fetchCoin,
  fetchRemainingPriceData,
  selectCoinLoadingStatus,
} from '@el-cap/store';
import { connect } from 'react-redux';
import loadable from '@loadable/component';

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
};

export interface AppProps {
  page?: string;
}
export function App(props: AppProps) {
  const dispatch = useAppDispatch();
  const { page } = props;
  const feedPage = {
    entities: useAppSelector(selectAllFeed),
    loadingStatus: useAppSelector(selectFeedLoadingStatus),
    fetchFeed: (key: string) => dispatch(fetchFeed(key)),
  };
  const coinPage = {
    loadingStatus: useAppSelector(selectCoinLoadingStatus),
    fetchCoin: (input: { symbol: string; name: string }) =>
      dispatch(fetchCoin(input)),
    fetchedEntity: useAppSelector(selectAllCoin),
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
  const Page = components[(page as keyof ObjectKeys) || 'Feed'];
  return (
    <div className="flex flex-col h-screen">
      <ConnectedHeader />
      <ContentContainer
        children={<Page coinPage={coinPage} feedPage={feedPage} />}
      />
      <Footer />
    </div>
  );
}

export default App;

export const ConnectedApp = connect(mapStateToProps)(App);
