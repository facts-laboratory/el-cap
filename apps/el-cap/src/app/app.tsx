import { ContentContainer, Header, Footer } from '@el-cap/el-cap-layout';
import {
  fetchCoinChart,
  selectChartData,
  mapStateToProps,
  useAppDispatch,
  useAppSelector,
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
  const coinPage = {
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
      <ContentContainer children={<Page coinPage={coinPage} />} />
      <Footer />
    </div>
  );
}

export default App;

export const ConnectedApp = connect(mapStateToProps)(App);
