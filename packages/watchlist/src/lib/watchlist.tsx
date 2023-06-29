import { connect } from 'react-redux';
import { mapStateToProps } from '@el-cap/store';

/* eslint-disable-next-line */
export interface WatchlistProps {}

export function Watchlist(props: WatchlistProps) {
  return (
    <div className="py-2">
      <div className="grid md:grid-cols-2">
        <div className="my-2">
          <span className="bg-blue-600 text-white font-semibold px-1 rounded-lg text-sm">
            Main
          </span>
          <p className="text-2xl font-bold mt-2">Main Watchlist</p>
          <p className="text-gray-700">
            <span role="img" aria-label="star">
              ⭐️
            </span>{' '}
            Register to keep your watchlist
          </p>
        </div>
        <div className="my-2">
          <div className="bg-white rounded-2xl p-6">
            <p className="font-bold text-xl my-1">
              You can keep the Watchlist, but first…
            </p>
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-3 text-gray-700">
                Sign up for a CoinMarketCap account in a few clicks and discover
                the rapidly growing cryptocurrency space on our world-class
                price-tracking platform!
              </div>
              <div className="col-span-1">
                <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl">
                  Create an account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 h-80">
        <p className="text-3xl">Table</p>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <p className="text-3xl">
            Be the first to know about{' '}
            <span className="font-bold">crypto news every day</span>
          </p>
          <p className="text-gray-700 text-lg">
            Get crypto analysis, news and updates right to your inbox! Sign up
            here so you don't miss a single newsletter.
          </p>
          <button className="bg-blue-700 text-white font-semibold p-4 rounded-xl my-14">
            Subscribe now
          </button>
        </div>
        <div className="col-span-1">
          <img
            src="https://s2.coinmarketcap.com/static/cloud/img/newsletter_bg_light.svg?_=0f1b097"
            loading="lazy"
            alt="img"
          />
        </div>
      </div>
    </div>
  );
}

export default Watchlist;

export const ConnectedWatchlist = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity: any) =>
    dispatch({ type: 'COIN', payload: { ticker, entity } }),
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
}))(Watchlist);
