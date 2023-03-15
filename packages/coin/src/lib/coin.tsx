import { useEffect, useState } from 'react';
import redstone from 'redstone-api';

import { mapStateToProps } from '@el-cap/store';
import { connect } from 'react-redux';
import { PriceData } from 'redstone-api/lib/types';

/* eslint-disable-next-line */
interface CoinProps {
  goToFeed: () => void;
  entity?: PriceData;
  ticker: string;
}

export function Coin(props: CoinProps) {
  const { goToFeed, entity, ticker } = props;
  const [data, setData] = useState<PriceData | undefined>();
  const [error, setError] = useState<string | undefined>();
  useEffect(() => {
    if (entity) {
      setData(entity);
      return;
    }
    redstone
      .getPrice([ticker.toUpperCase()])
      .then((item: { [token: string]: PriceData }) => {
        setData(item[ticker.toUpperCase()]);
      })
      .catch((e) => {
        console.log(e);
        setError(`Sorry, we couldn't find that coin.`);
      });
  }, [entity, ticker]);

  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1>Coin Page</h1>

      <button className="underline" onClick={() => goToFeed()}>
        Go to Feed
      </button>

      <p className="break-all">{JSON.stringify(data)}</p>
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
