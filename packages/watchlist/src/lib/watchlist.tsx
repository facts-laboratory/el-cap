import { connect } from 'react-redux';
import styles from './watchlist.module.css';
import { mapStateToProps } from '@el-cap/store';

/* eslint-disable-next-line */
export interface WatchlistProps {}

export function Watchlist(props: WatchlistProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Watchlist!</h1>
    </div>
  );
}

export default Watchlist;

export const ConnectedWatchlist = connect(mapStateToProps, (dispatch) => ({
  goToCoin: (ticker: string, entity: any) =>
    dispatch({ type: 'COIN', payload: { ticker, entity } }),
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
}))(Watchlist);
