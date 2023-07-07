import { connect } from 'react-redux';
import { fetchWatchlist, mapStateToProps } from '@el-cap/store';
import { TokenTable } from '@el-cap/token-table';
import { useEffect } from 'react';
import { ProcessedTokenData } from '@el-cap/interfaces';
import { ArAccount } from 'arweave-account';

/* eslint-disable-next-line */
export interface WatchlistProps {
  watchlistPage: {
    fetchWatchlist: () => void;
    watchlist: ProcessedTokenData[];
    addToWatchlist: (coin: string) => void;
    user: ArAccount;
  };
}

export function Watchlist(props: WatchlistProps) {
  const { watchlistPage, user } = props;
  const { fetchWatchlist, watchlist, addToWatchlist } = watchlistPage;

  const onWatchlist = () => {
    alert('coming soon');
  };

  const onPortfolio = () => {
    alert('coming soon');
  };

  const onAddCoins = () => {
    alert('coming soon');
  };

  const onCustomize = () => {
    alert('coming soon');
  };

  const onSubscribe = () => {
    alert('coming soon');
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div className="py-2">
      <div className="grid xl:grid-cols-5">
        <div className="my-2 col-span-2">
          <span className="bg-blue-600 text-white font-semibold px-1 rounded-md text-sm">
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
        <div className="my-2 col-span-3">
          <div className="bg-white rounded-2xl p-6">
            <p className="font-bold text-xl my-1">
              You can keep the Watchlist, but first…
              <span role="img" aria-label="star">
                🤭
              </span>
            </p>
            <div className="grid sm:grid-cols-4 grid-col-1 gap-2">
              <div className="col-span-3 text-gray-700">
                Sign up for a El Capitan account in a few clicks and discover
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
      <div className="py-4">
        <div className="flex justify-between">
          <div className="flex">
            <button
              className="text-blue-700 font-semibold text-xs bg-gray-200 px-2 py-1 rounded-lg mr-2 flex items-center"
              onClick={onWatchlist}
            >
              <svg
                fill="#A6B0C3"
                height="24px"
                width="24px"
                viewBox="0 0 24 24"
                className="w-[1.3em] -mt-[2px] mr-1"
              >
                <path d="M21.288 8.9542L15.3871 8.05451L12.7512 2.44829C12.6745 2.31177 12.5653 2.19861 12.4342 2.11998C12.3031 2.04136 12.1547 2 12.0037 2C11.8527 2 11.7043 2.04136 11.5732 2.11998C11.442 2.19861 11.3328 2.31177 11.2561 2.44829L8.61526 8.05451L2.7143 8.9542C2.56041 8.9775 2.41581 9.04551 2.29684 9.15053C2.17786 9.25555 2.08927 9.3934 2.04106 9.54849C1.99286 9.70358 1.98697 9.86973 2.02406 10.0281C2.06115 10.1866 2.13975 10.3309 2.25095 10.4449L6.52188 14.8113L5.51436 20.978C5.4881 21.1388 5.50524 21.3041 5.56384 21.4552C5.62244 21.6063 5.72017 21.7372 5.84597 21.8331C5.97177 21.9289 6.12063 21.986 6.27571 21.9977C6.4308 22.0095 6.58592 21.9755 6.72355 21.8996L12.0012 18.9889L17.2788 21.8996C17.4164 21.9755 17.5715 22.0095 17.7266 21.9977C17.8817 21.986 18.0305 21.9289 18.1563 21.8331C18.2822 21.7372 18.3799 21.6063 18.4385 21.4552C18.4971 21.3041 18.5142 21.1388 18.488 20.978L17.4804 14.8113L21.7514 10.4449C21.8625 10.331 21.9412 10.1868 21.9783 10.0285C22.0155 9.87024 22.0098 9.7042 21.9617 9.54915C21.9137 9.39411 21.8254 9.25624 21.7066 9.1511C21.5878 9.04597 21.4434 8.97777 21.2897 8.9542H21.288Z"></path>
              </svg>
              Watchlist
            </button>
            <button
              className="font-semibold text-xs bg-gray-300 px-2 py-1 rounded-lg flex items-center"
              onClick={onPortfolio}
            >
              <svg
                className="mr-1"
                height="24px"
                width="24px"
                viewBox="0 0 24 24"
                fill="#a6b0c3"
                style={{ width: '1.3em' }}
              >
                <path
                  d="M13.8182 2H13V11H22V10.1818C22 5.68182 18.3182 2 13.8182 2Z"
                  fill="#a6b0c3"
                ></path>
                <path
                  d="M11.35 5H10.5C5.825 5 2 8.825 2 13.5C2 18.175 5.825 22 10.5 22C15.175 22 19 18.175 19 13.5V12.65H11.35V5Z"
                  fill="#a6b0c3"
                ></path>
              </svg>
              Portfolio
            </button>
          </div>
          <div className="flex">
            <button
              className="font-semibold text-xs bg-gray-200 px-2 py-1 rounded-lg mr-2 flex items-center"
              onClick={onAddCoins}
            >
              Add coins
            </button>
            <button
              className="font-semibold text-xs bg-gray-200 px-2 py-1 rounded-lg mr-2 flex items-center"
              onClick={onCustomize}
            >
              Customize
            </button>
          </div>
        </div>
        <TokenTable
          data={watchlist}
          // goToCoin={goToCoin}
          addToWatchlist={(coin: string) => addToWatchlist(coin)}
          user={user}
        />
      </div>
      <div className="grid xl:grid-cols-3">
        <div className="col-span-2">
          <p className="text-3xl">
            Be the first to know about{' '}
            <span className="font-bold">crypto news every day</span>
          </p>
          <p className="text-gray-700 text-lg">
            Get crypto analysis, news and updates right to your inbox! Sign up
            here so you don't miss a single newsletter.
          </p>
          <button
            onClick={() => onSubscribe()}
            className="bg-blue-700 text-white font-semibold p-4 rounded-xl my-14"
          >
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
