import { ContentContainer, Header, Footer } from '@el-cap/el-cap-layout';
import {
  fetchCoinChart,
  selectChartData,
  mapStateToProps,
  useAppDispatch,
  useAppSelector,
  selectAllFeed,
  selectFeedLoadingStatus,
  selectAllCoin,
  fetchFeed,
  fetchCoin,
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
    fetchFeed: () => dispatch(fetchFeed()),
  };
  const coinPage = {
    loadingStatus: useAppSelector(selectFeedLoadingStatus),
    fetchCoin: (input: string) => dispatch(fetchCoin(input)),
    fetchedEntity: useAppSelector(selectAllCoin),
    coinChartProps: {
      fetch: (input) => dispatch(fetchCoinChart(input)),
      chartData: useAppSelector(selectChartData),
      loadingStatus: useAppSelector((state) => state.coinChart.loadingStatus),
    },
  };
  const Page = components[(page as keyof ObjectKeys) || 'Feed'];
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ContentContainer
        children={<Page coinPage={coinPage} feedPage={feedPage} />}
      />
      <Footer />
    </div>
  );
}

export default App;

export const ConnectedApp = connect(mapStateToProps)(App);
