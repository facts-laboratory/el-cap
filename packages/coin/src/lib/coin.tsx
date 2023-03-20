import { useEffect, useState } from 'react';
import redstone from 'redstone-api';

import { mapStateToProps } from '@el-cap/store';
import { connect } from 'react-redux';
import { PriceData } from 'redstone-api/lib/types';

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
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Coin Page</h1>

        <button
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200 focus:outline-none mb-8"
          onClick={() => goToFeed()}
        >
          Go to Feed
        </button>

    {console.log(data)}
          
        {data && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">{data.symbol}</h2>
            <p className="text-lg mb-2">Current Price: {data.value} {data.currency}</p>
            <p className="text-lg mb-2">Timestamp: {new Date(data.timestamp).toLocaleString()}</p>
          </div>
        )}
        </div>
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
