import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import redstone from 'redstone-api';

import { mapStateToProps } from '@el-cap/store';
import { WidgetCoinCard } from '@el-cap/widget-coin-card';
import { PriceData } from 'redstone-api/lib/types';

/* eslint-disable-next-line */
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
        console.log('PRICES', prices);
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    console.log(prices);
  }, [prices]);

  return (
    <div>
      <h1>Welcome to Feed!</h1>
      <div>
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
  );
}

export default Feed;

export const ConnectedFeed = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity?: PriceData) =>
    dispatch({ type: 'COIN', payload: { ticker, entity: entity } }),
}))(Feed);
