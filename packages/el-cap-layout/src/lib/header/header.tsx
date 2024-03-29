import { goToCoin, mapStateToProps } from '@el-cap/store';
import { connect } from 'react-redux';
import StatusBar from './statusBar';
import SearchBar from './searchBar';
import { ProcessedMarketData, ProcessedTokenData } from '@el-cap/interfaces';
import { useEffect } from 'react';
import { ArAccount } from 'arweave-account';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {
  goToFeed: () => void;
  goToWatchlist: () => void;
  goToCoin: (ticker: string) => void;
  header: {
    fetchContractcoins: () => void;
    coins: ProcessedTokenData[];
    loadingStatus: string;
    setUser: (input: { address: string; strategy: string | false }) => void;
    user: ArAccount;
    unsetUser: () => void;
    feedLoadingStatus: string;
    fetchFeed: () => void;
    fetchMarketData: () => void;
    marketData: ProcessedMarketData;
  };
}

export function Header(props: HeaderProps) {
  // const ref: React.RefObject<HTMLDivElement> = useRef(null);

  const { header, goToFeed, goToWatchlist, goToCoin } = props;
  const {
    fetchContractcoins,
    coins,
    loadingStatus,
    setUser,
    user,
    unsetUser,
    fetchMarketData,
    marketData,
  } = header;

  useEffect(() => {
    if (loadingStatus === 'not loaded') {
      fetchContractcoins();
    }
  }, [fetchContractcoins, loadingStatus]);

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div className="bg-white min-w-full">
      <StatusBar
        goToWatchlist={goToWatchlist}
        setUser={setUser}
        user={user}
        unsetUser={unsetUser}
        marketData={marketData}
      />
      <SearchBar
        goToFeed={() => goToFeed()}
        goToCoin={(ticker: string) => goToCoin(ticker)}
        coins={coins}
        loadingStatus={loadingStatus}
      />
    </div>
  );
}

export default Header;

export const ConnectedHeader = connect(mapStateToProps, (dispatch) => ({
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
  goToWatchlist: () => dispatch({ type: 'WATCHLIST' }),
  goToCoin: (ticker: string, entity: any) => {
    dispatch({ type: 'COIN', payload: { ticker, entity } });
  },
}))(Header);
