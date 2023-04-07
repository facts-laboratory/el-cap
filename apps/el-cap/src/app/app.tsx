import {
  ContentContainer,
  Content,
  Header,
  Footer,
} from '@el-cap/el-cap-layout';
import {
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
  const { page } = props;
  const dispatch = useAppDispatch();
  const feedPage = {
    entities: useAppSelector(selectAllFeed),
    loadingStatus: useAppSelector(selectFeedLoadingStatus),
    fetchFeed: () => dispatch(fetchFeed()),
  };

  const coinPage = {
    loadingStatus: useAppSelector(selectFeedLoadingStatus),
    fetchCoin: (input: string) => dispatch(fetchCoin(input)),
    fetchedEntity: useAppSelector(selectAllCoin),
  };

  const Component = components[(page as keyof ObjectKeys) || 'Feed'];
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ContentContainer
        children={<Component feedPage={feedPage} coinPage={coinPage} />}
      />
      <Footer />
    </div>
  );
}

export default App;

export const ConnectedApp = connect(mapStateToProps)(App);
