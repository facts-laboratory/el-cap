import { useCallback } from 'react';
import { goToPage, mapStateToProps } from '@el-cap/store';
import { connect } from 'react-redux';
import StatusBar from './statusBar';
import SearchBar from './searchBar';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {
  goToFeed: () => void;
  goToWatchlist: () => void;
}

export function Header(props: HeaderProps) {
  // const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const { goToFeed, goToWatchlist } = props;

  return (
    <div className="bg-white min-w-full">
      <StatusBar goToWatchlist={goToWatchlist} />
      <SearchBar goToFeed={goToFeed} />
    </div>
  );
}

export default Header;

export const ConnectedHeader = connect(mapStateToProps, (dispatch) => ({
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
  goToWatchlist: () => dispatch({ type: 'WATCHLIST' }),
}))(Header);
