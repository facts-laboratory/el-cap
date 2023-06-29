import { mapStateToProps } from '@el-cap/store';
import { connect } from 'react-redux';
import StatusBar from './statusBar';
import SearchBar from './searchBar';
import { SearchCoin, User } from '@el-cap/interfaces';
import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface HeaderProps {
  goToFeed: () => void;
  header: {
    fetchContractcoins: () => void;
    coins: SearchCoin[];
    loadingStatus: string;
    fetchUser: () => void;
    user: User;
    unsetUser: () => void;
  };
}

export function Header(props: HeaderProps) {
  // const ref: React.RefObject<HTMLDivElement> = useRef(null);
  const { header, goToFeed } = props;
  const {
    fetchContractcoins,
    coins,
    loadingStatus,
    fetchUser,
    user,
    unsetUser,
  } = header;

  useEffect(() => {
    if (loadingStatus === 'not loaded') {
      fetchContractcoins();
    }
  }, [fetchContractcoins, loadingStatus]);

  return (
    <div className="bg-white min-w-full">
      <StatusBar fetchUser={fetchUser} user={user} unsetUser={unsetUser} />
      <SearchBar
        goToFeed={() => goToFeed()}
        coins={coins}
        loadingStatus={loadingStatus}
      />
    </div>
  );
}

export default Header;

export const ConnectedHeader = connect(mapStateToProps, (dispatch) => ({
  goToFeed: (key: string) => dispatch({ type: 'FEED', payload: { key } }),
}))(Header);
