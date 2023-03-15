import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import redstone from 'redstone-api';

import { mapStateToProps } from '@el-cap/store';
import { WidgetCoinCard } from '@el-cap/widget-coin-card';
import { PriceData } from 'redstone-api/lib/types';

export interface FeedProps {
  goToCoin: (ticker: string, entity?: PriceData) => void;
}

export function Feed(props: FeedProps) {
  const { goToCoin } = props;

  const [prices, setPrices] = useState<any>();

  useEffect(() => {
    redstone
      .getPrice(['BTC', 'ETH', 'AR', 'ECT', 'XRP'])
      .then((O: any) => {
        const arr = Object.entries(O).map((item) => {
          return item[1];
        });
        setPrices(arr);
      })
      .catch(console.log);
  }, []);

  return (

  <div className="bg-gray-100 min-h-[calc(100vh-160px)]">
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Feed!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {prices &&
      prices?.map((item: PriceData) => {
        return (
          <WidgetCoinCard
            key={item.id}
            entity={item}
            goToCoin={() => goToCoin(item.symbol.toLowerCase(), item)}
          />
          );
      })}
    </div>
  </div>
</div>
  );
}

export default Feed;

export const ConnectedFeed = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity?: PriceData) =>
  dispatch({ type: 'COIN', payload: { ticker, entity: entity } }),
}))(Feed);
