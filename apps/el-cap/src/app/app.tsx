import { ContentContainer, Header, Footer } from '@el-cap/el-cap-layout';
import { mapStateToProps } from '@el-cap/store';
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
  const Component = components[(page as keyof ObjectKeys) || 'Feed'];
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ContentContainer children={<Component />} />
      <Footer />
    </div>
  );
}

export default App;

export const ConnectedApp = connect(mapStateToProps)(App);
